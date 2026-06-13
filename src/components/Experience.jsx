import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { TIMELINE } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="pb-[30px] pt-20 lg:pt-[110px]">
      <div className="container-app">
        <SectionHeading
          eyebrow="🧭 Experience"
          title={
            <>
              Where I've <span className="hl hl-sage">learned by building</span>
            </>
          }
          sub="A mix of real client work, internship projects, data analysis training, and cloud learning - the places where the messy parts turned into actual skills."
        />
        <div className="relative ml-2.5 pl-9">
          {/* The gradient spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute bottom-2 left-0 top-2 w-[3px] origin-top rounded bg-linear-to-b from-sage via-sky to-peach"
          />
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="group relative pb-9 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[43px] top-1.5 size-[17px] rounded-full border-4 bg-paper transition-transform duration-300 group-hover:scale-[1.35] ${item.dot}`}
              />
              <motion.div
                whileHover={{ x: 8, rotate: 0.4 }}
                data-cursor
                className="max-w-[720px] rounded-[18px] border-[1.5px] border-latte bg-paper px-6 py-5 shadow-card"
              >
                <span className="text-[0.76rem] font-extrabold uppercase tracking-[0.1em] text-cocoa">
                  {item.when} · {item.type}
                </span>
                <h3 className="mb-1.5 mt-1 font-display text-[1.12rem] font-extrabold">
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </h3>
                <p className="mb-3 text-[0.9rem] text-ink-soft">{item.desc}</p>
                <ul className="mb-4 space-y-2 text-[0.84rem] text-ink-soft">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border-[1.5px] border-latte-deep bg-cream px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.04em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
