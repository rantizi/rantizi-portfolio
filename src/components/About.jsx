import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { FACTS, PROFILE } from "../data/content";

function ProfilePhoto({ src }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className="mx-auto mb-[22px] flex h-40 w-40 items-center justify-center overflow-hidden rounded-[40px] border-[1.5px] border-latte bg-sky-soft text-[4.4rem] md:h-44 md:w-44">
      {showImage ? (
        <img
          src={src}
          alt="Portrait of Abdul Aziz Rantizi"
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">🧑‍💻</span>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="pb-[30px] pt-20 lg:pt-[110px]">
      <div className="container-app">
        <SectionHeading
          eyebrow="🌱 About me"
          title={
            <>
              Nice to meet you — here's the <span className="hl hl-sage">short version</span>
            </>
          }
        />
        <div className="mt-8 grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ID-style card with washi tape */}
          <Reveal>
            <motion.div
              initial={{ rotate: -1.5 }}
              whileHover={{ rotate: 0, y: -4 }}
              data-cursor
              className="relative rounded-[28px] border-[1.5px] border-latte bg-paper px-[30px] pb-[30px] pt-9 shadow-card"
            >
              <span className="tape" aria-hidden="true" />
              <ProfilePhoto src={PROFILE.image} />
              <h3 className="font-display text-[1.3rem] font-extrabold">Abdul Aziz Rantizi</h3>
              <p className="text-[0.9rem] text-ink-soft">
                Computer Science student · Data analysis, software development &amp; general IT
              </p>
              <span className="hand mt-3.5 block">
                "If the dataset is messy, that's just a puzzle with extra steps."
              </span>
            </motion.div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-4 text-ink-soft">
                I'm a CS student who genuinely enjoys the{" "}
                <strong className="text-espresso">unglamorous parts of data work</strong> — cleaning weird
                spreadsheets, fixing broken column names, and chasing down why the totals don't add up. Once
                the data behaves, I love turning it into{" "}
                <strong className="text-espresso">dashboards and visuals</strong> that people actually
                understand at a glance.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-4 text-ink-soft">
                On the software side, I build with{" "}
                <strong className="text-espresso">
                  Python, SQL, C++, JavaScript, TypeScript, and Java
                </strong>
                , and I'm comfortable being the person who keeps a group project organized: tasks,
                timelines, documentation, and making sure nobody pushes to main at 2 AM untested.
                (Mostly.)
              </p>
            </Reveal>
            <div className="mt-6 grid auto-rows-fr items-stretch gap-3.5 sm:grid-cols-2">
              {FACTS.map((fact, i) => (
                <Reveal key={fact.title} delay={0.15 + i * 0.05} className="h-full">
                  <motion.div
                    whileHover={{ y: -4, rotate: -1 }}
                    data-cursor
                    className="flex h-full flex-col justify-center rounded-[18px] border-[1.5px] border-latte bg-paper px-[18px] py-4 transition-colors hover:border-sage"
                  >
                    <b className="mb-0.5 block text-[0.95rem]">
                      {fact.icon} {fact.title}
                    </b>
                    <span className="text-[0.84rem] text-ink-soft">{fact.text}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
