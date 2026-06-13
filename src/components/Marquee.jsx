import { MARQUEE_ITEMS } from "../data/content";

/**
 * Skills tape. The track holds two identical halves and slides -50%,
 * so the loop is seamless. Hovering pauses it (CSS).
 */
export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="group-marquee my-8 -rotate-[1.2deg] scale-[1.02] overflow-hidden bg-espresso py-4 text-cream"
    >
      <div className="anim-marquee flex w-max">
        {[0, 1].map((half) => (
          <div
            key={half}
            className="flex items-center font-display font-bold tracking-[0.06em] whitespace-nowrap"
          >
            {MARQUEE_ITEMS.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-6">{item}</span>
                <span className="px-6 not-italic text-peach">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
