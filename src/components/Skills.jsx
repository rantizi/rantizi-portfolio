import { motion } from "framer-motion";
import Reveal, { EASE_OUT } from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { SKILL_BARS, SKILL_CHIPS } from "../data/content";

function SkillBar({ skill, index }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex justify-between text-[0.92rem] font-bold">
        <span>{skill.name}</span>
        <span className="hand text-[1.1rem]">{skill.note}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border-[1.5px] border-latte bg-cream">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.fill}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: EASE_OUT }}
          className={`block h-full rounded-full bg-linear-to-r ${skill.gradient}`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="pb-[30px] pt-20 lg:pt-[110px]">
      <div className="container-app">
        <SectionHeading
          eyebrow="🧰 Skills"
          title={
            <>
              My toolkit, <span className="hl hl-sky">honestly rated</span>
            </>
          }
          sub="No &quot;expert in everything&quot; claims here — just the tools I use most and how comfortable I really am with them."
        />
        <div className="grid items-start gap-7 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative rounded-[28px] border-[1.5px] border-latte bg-paper px-8 pb-[30px] pt-[38px] shadow-card">
              <span className="tape tape-sky" aria-hidden="true" />
              <h3 className="mb-1 font-display text-[1.25rem] font-extrabold">📊 Data toolkit</h3>
              <p className="mb-6 text-[0.86rem] text-ink-soft">
                The bars only fill up when you scroll here. Honest loading, just like real queries.
              </p>
              {SKILL_BARS.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative rounded-[28px] border-[1.5px] border-latte bg-paper px-8 pb-[30px] pt-[38px] shadow-card">
              <span className="tape tape-peach" aria-hidden="true" />
              <h3 className="mb-1 font-display text-[1.25rem] font-extrabold">💻 Code &amp; coordination</h3>
              <p className="mb-6 text-[0.86rem] text-ink-soft">
                Languages, tools, and the people skills that keep team projects alive.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SKILL_CHIPS.map((chip, i) => (
                  <motion.span
                    key={chip}
                    data-cursor
                    whileHover={{
                      y: -4,
                      rotate: i % 2 === 0 ? -2 : 2,
                      backgroundColor: i % 2 === 0 ? "#DDE8D6" : "#DDEAF3",
                      borderColor: i % 2 === 0 ? "#7FA37A" : "#6F9FC4",
                    }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-latte-deep bg-cream px-[18px] py-2 text-[0.88rem] font-bold"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
              <span className="hand mt-6 block">
                → favorite role in a team: the one who keeps the to-do list honest 📌
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
