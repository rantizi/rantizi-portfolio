import Reveal from "./Reveal";

/** Eyebrow pill + display title (+ optional subtitle), revealed with a stagger. */
export default function SectionHeading({ eyebrow, title, sub }) {
  return (
    <>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mb-3.5 mt-[18px] font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-extrabold leading-[1.12]">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.15}>
          <p className="mb-11 max-w-[560px] text-ink-soft">{sub}</p>
        </Reveal>
      )}
    </>
  );
}
