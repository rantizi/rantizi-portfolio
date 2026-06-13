import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { PROJECTS } from "../data/content";

/** 3D tilt that follows the cursor — springs instead of raw mousemove math. */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 220, damping: 20 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -4 }}
      data-cursor
      className={className}
    >
      {children}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pb-[30px] pt-20 lg:pt-[110px]">
      <div className="container-app">
        <SectionHeading
          eyebrow="🚀 Projects"
          title={
            <>
              Things I've <span className="hl">actually built</span>
            </>
          }
          sub="A mix of data work and software projects from coursework, competitions, and curiosity. Tilt the cards — they're friendly."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 0.1}>
              <TiltCard className="group relative h-full rounded-[28px] border-[1.5px] border-latte bg-paper px-7 pb-6 pt-10 shadow-card transition-shadow duration-300 hover:shadow-pop">
                <span className={project.tape} aria-hidden="true" />
                <div
                  className={`mb-[18px] flex size-16 items-center justify-center rounded-[20px] text-[1.9rem] transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-110 ${project.iconBg}`}
                >
                  {project.icon}
                </div>
                <h3 className="mb-2 font-display text-[1.22rem] font-extrabold">{project.title}</h3>
                <p className="mb-4 text-[0.92rem] text-ink-soft">{project.desc}</p>
                <div className="mb-3.5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border-[1.5px] border-latte-deep bg-cream px-3 py-1 text-[0.74rem] font-extrabold tracking-[0.04em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="border-t-[1.5px] border-dashed border-latte-deep pt-3 text-[0.84rem] font-semibold text-cocoa">
                  <span className="hand mr-1.5 text-[1.15rem]">my part →</span>
                  {project.did}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
