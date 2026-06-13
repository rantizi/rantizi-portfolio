import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import Reveal, { EASE_OUT } from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { BADGES, STATS } from "../data/content";

/** Counts from 0 to `to` once the element scrolls into view. */
function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}

export default function Achievements() {
  return (
    <section id="achievements" className="pb-[30px] pt-20 lg:pt-[110px]">
      <div className="container-app">
        <SectionHeading
          eyebrow="🏆 Achievements"
          title={
            <>
              Small wins, <span className="hl hl-sky">proudly counted</span>
            </>
          }
        />
        <div className="mb-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, rotate: -1 }}
                data-cursor
                className="rounded-[18px] border-[1.5px] border-latte bg-paper px-4 py-6 text-center shadow-card transition-colors hover:border-sage"
              >
                <span className="font-display text-[1.7rem] font-extrabold leading-none md:text-[2.2rem]">
                  {stat.infinity ? "∞" : (
                    <>
                      <Counter to={stat.value} />
                      <small className="text-[1.2rem]">{stat.suffix}</small>
                    </>
                  )}
                </span>
                <span className="mt-1.5 block text-[0.82rem] font-semibold text-ink-soft">{stat.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {BADGES.map((badge, i) => (
            <Reveal key={badge.title} delay={i * 0.1}>
              <motion.div
                whileHover="hover"
                variants={{ hover: { y: -5, rotate: 1 } }}
                data-cursor
                className="h-full rounded-[18px] border-[1.5px] border-latte bg-paper px-[22px] pb-[22px] pt-[30px] shadow-card"
              >
                <motion.span
                  variants={{ hover: { rotate: [0, -14, 14, 0] } }}
                  transition={{ duration: 0.5 }}
                  className="mb-2.5 inline-block text-[1.9rem]"
                >
                  {badge.medal}
                </motion.span>
                <h3 className="mb-1.5 font-display text-[1.05rem] font-extrabold">{badge.title}</h3>
                <p className="text-[0.85rem] text-ink-soft">{badge.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
