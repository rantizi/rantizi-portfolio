import { useEffect, useRef, useState } from "react";
import { MARQUEE_ITEMS } from "../data/content";

const SPEED = 96;
const COPIES = 5;

export default function Marquee() {
  const [direction, setDirection] = useState(-1);

  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const directionRef = useRef(-1);
  const loopWidthRef = useRef(0);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const setTrackX = (x) => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }
    };

    const measure = () => {
      const width = groupRef.current?.scrollWidth ?? 0;

      if (width > 0) {
        loopWidthRef.current = width;

        positionRef.current = 0;
        lastTimeRef.current = null;
        setTrackX(0);
      }
    };

    const animate = (time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = Math.min(time - lastTimeRef.current, 64);
      lastTimeRef.current = time;

      const width = loopWidthRef.current;

      if (width > 0 && trackRef.current) {
        let nextX =
          positionRef.current +
          directionRef.current * SPEED * (delta / 1000);

        if (nextX < -width) {
          nextX += width;
        } else if (nextX > 0) {
          nextX -= width;
        }

        positionRef.current = nextX;
        setTrackX(nextX);
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    measure();
    window.addEventListener("resize", measure);

    let observer;

    if (groupRef.current && "ResizeObserver" in window) {
      observer = new ResizeObserver(measure);
      observer.observe(groupRef.current);
    }

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const buttonBase =
    "rounded-full border-[1.5px] px-3.5 py-1.5 text-[0.76rem] font-extrabold shadow-card transition-colors";

  return (
    <section className="my-6 overflow-hidden py-8" aria-label="Technology ticker">
      <div className="container-app mb-3 flex origin-center -rotate-[1.2deg] scale-[1.02] justify-end gap-2 max-sm:justify-center">
        <button
          type="button"
          onClick={() => setDirection(-1)}
          aria-pressed={direction === -1}
          data-cursor
          className={`${buttonBase} ${
            direction === -1
              ? "border-sage bg-sage-soft text-espresso"
              : "border-latte-deep bg-paper text-cocoa hover:border-sky hover:bg-sky-soft"
          }`}
        >
          ← Move left
        </button>

        <button
          type="button"
          onClick={() => setDirection(1)}
          aria-pressed={direction === 1}
          data-cursor
          className={`${buttonBase} ${
            direction === 1
              ? "border-sage bg-sage-soft text-espresso"
              : "border-latte-deep bg-paper text-cocoa hover:border-sky hover:bg-sky-soft"
          }`}
        >
          Move right →
        </button>
      </div>

      <div className="origin-center -rotate-[1.2deg] scale-[1.02] overflow-hidden bg-espresso py-5 text-cream">
        <div
          ref={trackRef}
          className="flex w-max items-center whitespace-nowrap font-display text-[1rem] font-bold leading-none tracking-[0.06em] will-change-transform"
          aria-hidden="true"
        >
          {Array.from({ length: COPIES }).map((_, copyIndex) => (
            <div
              key={copyIndex}
              ref={copyIndex === 0 ? groupRef : null}
              className="flex shrink-0 items-center whitespace-nowrap"
            >
              {MARQUEE_ITEMS.map((item) => (
                <span key={`${copyIndex}-${item}`} className="flex items-center">
                  <span className="px-6">{item}</span>
                  <span className="px-6 text-peach">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}