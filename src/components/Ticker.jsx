import { TICKER_ITEMS } from '../data/content';

export default function Ticker() {
  // Duplicate items so the seamless infinite-scroll loop has content on both ends
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span className="ticker-item" key={i}>
            <strong>{item.strong}</strong> {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
