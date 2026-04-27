import { useEffect, useRef, useState } from 'react';

// Adds .visible class once an element with .reveal scrolls into view.
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Tracks which section is currently in view; returns id string.
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] || 'top');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: [0.35] }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sectionIds]);
  return active;
}

// Renders the neural network particle canvas. Lives behind everything else.
export function useNeuralCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, particles, raf;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const count = Math.min(80, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.6,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.35;
            ctx.strokeStyle = `rgba(108, 212, 212, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // Nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const glow = Math.sin(p.pulse) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 122, 69, ${glow * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255, 122, 69, ${glow * 0.15})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

// Spawns falling AI tokens for atmosphere.
export function useTokenRain(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tokens = [
      '[BOS]', 'attn', 'qkv', 'embed', 'softmax', 'llm', 'agent',
      'tok_0', 'tok_1', 'tok_2', 'eos', 'kv_cache', 'logit', 'sample',
      'rag', 'faiss', 'dqn', 'reward', 'graph', 'dense', 'bm25',
      'Q @ K.T', 'd_model', 'n_heads', 'π(a|s)', 'cos_sim', 'top_k',
      '→ embed', '0.42', '0.87', '0.19', '-0.33', 'temp=0.7',
    ];

    function spawn() {
      if (!container.isConnected) return;
      const el = document.createElement('span');
      el.textContent = tokens[Math.floor(Math.random() * tokens.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDuration = (12 + Math.random() * 18) + 's';
      el.style.animationDelay = Math.random() * 2 + 's';
      el.style.fontSize = (9 + Math.random() * 3) + 'px';
      if (Math.random() > 0.7) el.style.color = 'var(--ember)';
      if (Math.random() > 0.9) el.style.color = 'var(--paper)';
      container.appendChild(el);
      setTimeout(() => el.remove(), 35000);
    }

    let spawned = 0;
    const initial = setInterval(() => {
      spawn();
      spawned++;
      if (spawned > 14) clearInterval(initial);
    }, 800);
    const recurring = setInterval(spawn, 2500);

    return () => {
      clearInterval(initial);
      clearInterval(recurring);
    };
  }, [containerRef]);
}
