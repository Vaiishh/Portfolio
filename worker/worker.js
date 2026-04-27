/**
 * Cloudflare Worker: Viggy chat proxy
 * --------------------------------------
 * Holds the Groq API key server-side, validates origin, rate-limits per IP,
 * and forwards chat requests to Groq's OpenAI-compatible endpoint.
 *
 * Deploy: see /worker/README.md
 */

// Edit this list to match your real domains
const ALLOWED_ORIGINS = [
  'https://vaiishh.github.io',          // GitHub Pages production
  'http://localhost:5173',              // Vite dev
  'http://localhost:4173',              // Vite preview
];

// Per-IP rate limit (in addition to Groq's own 30 RPM cap)
const RATE_LIMIT_PER_MINUTE = 8;
const RATE_LIMIT_PER_DAY = 60;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const isAllowed = ALLOWED_ORIGINS.includes(origin);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, isAllowed) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin, isAllowed);
    }
    if (!isAllowed) {
      return json({ error: 'Origin not allowed' }, 403, origin, isAllowed);
    }

    // Rate limit by client IP using Cloudflare KV
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (env.RATE_KV) {
      const overLimit = await checkRateLimit(env.RATE_KV, ip);
      if (overLimit) {
        return json({ error: overLimit }, 429, origin, isAllowed);
      }
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, origin, isAllowed);
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return json({ error: 'messages[] required' }, 400, origin, isAllowed);
    }

    // Cap message size — defends against abusive payloads
    const totalChars = body.messages.reduce((n, m) => n + (m.content?.length || 0), 0);
    if (totalChars > 12000) {
      return json({ error: 'Message too long' }, 413, origin, isAllowed);
    }

    // Forward to Groq
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: body.messages,
          temperature: 0.6,
          max_tokens: 350,
          top_p: 0.9,
        }),
      });

      const data = await groqRes.json();
      if (!groqRes.ok) {
        const msg = data?.error?.message || 'Upstream error';
        return json({ error: msg }, groqRes.status, origin, isAllowed);
      }
      const reply = data?.choices?.[0]?.message?.content?.trim() || '';
      return json({ reply }, 200, origin, isAllowed);
    } catch (err) {
      return json({ error: 'Network error', detail: String(err) }, 502, origin, isAllowed);
    }
  },
};

function corsHeaders(origin, isAllowed) {
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(payload, status, origin, isAllowed) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin, isAllowed),
    },
  });
}

async function checkRateLimit(kv, ip) {
  const now = Date.now();
  const minuteKey = `m:${ip}:${Math.floor(now / 60000)}`;
  const dayKey = `d:${ip}:${Math.floor(now / 86400000)}`;

  const [minuteStr, dayStr] = await Promise.all([kv.get(minuteKey), kv.get(dayKey)]);
  const minuteCount = parseInt(minuteStr || '0', 10);
  const dayCount = parseInt(dayStr || '0', 10);

  if (minuteCount >= RATE_LIMIT_PER_MINUTE) {
    return 'You\'re sending messages too fast. Please wait a moment.';
  }
  if (dayCount >= RATE_LIMIT_PER_DAY) {
    return 'Daily message limit reached. Please try again tomorrow.';
  }

  await Promise.all([
    kv.put(minuteKey, String(minuteCount + 1), { expirationTtl: 120 }),
    kv.put(dayKey, String(dayCount + 1), { expirationTtl: 90000 }),
  ]);
  return null;
}
