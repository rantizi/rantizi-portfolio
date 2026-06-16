import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { GhostButton } from "./ui/Buttons";
import { PROJECTS } from "../data/content";

const isPublicUrl = (url) => /^https?:\/\//i.test(url || "");

function useBodyScrollLock(locked) {
  const originalStylesRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!locked || typeof window === "undefined") return undefined;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    scrollYRef.current = window.scrollY;
    originalStylesRef.current = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      const original = originalStylesRef.current;
      if (!original) return;

      body.style.overflow = original.bodyOverflow;
      documentElement.style.overflow = original.htmlOverflow;
      body.style.position = original.bodyPosition;
      body.style.top = original.bodyTop;
      body.style.width = original.bodyWidth;
      body.style.paddingRight = original.bodyPaddingRight;

      window.scrollTo(0, scrollYRef.current);
      originalStylesRef.current = null;
    };
  }, [locked]);
}

function useCustomCursorDisabled(disabled) {
  useEffect(() => {
    if (!disabled || typeof document === "undefined") return undefined;

    const className = "custom-cursor-disabled";
    const { body, documentElement } = document;

    body.classList.add(className);
    documentElement.classList.add(className);

    return () => {
      body.classList.remove(className);
      documentElement.classList.remove(className);
    };
  }, [disabled]);
}

/** 3D tilt that follows the cursor - springs instead of raw mousemove math. */
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

function ProjectCover({ project }) {
  const [failed, setFailed] = useState(false);
  const hasImage = project.coverImage && !failed;

  return (
    <div className="mb-5 overflow-hidden rounded-[22px] border-[1.5px] border-latte bg-cream">
      {hasImage ? (
        <img
          src={project.coverImage}
          alt={`${project.title} project screenshot`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-linear-to-br from-sage-soft via-sky-soft to-peach-soft px-6 text-center">
          <div>
            <span className="mb-2 block text-[2rem]">{project.icon}</span>
            <p className="font-display text-[1.05rem] font-extrabold text-espresso">
              Screenshot coming soon
            </p>
            <p className="mt-1 text-[0.8rem] font-semibold text-cocoa">
              The layout stays tidy while the image shelf is being filled.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProofImage({ src, alt, icon, label, className = "", imageClassName = "aspect-[16/10] w-full object-cover" }) {
  const [failed, setFailed] = useState(false);
  const hasImage = src && !failed;

  return (
    <div className={`overflow-hidden rounded-[18px] border-[1.5px] border-latte bg-cream ${className}`}>
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={imageClassName}
        />
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-linear-to-br from-sage-soft via-sky-soft to-peach-soft px-6 text-center">
          <div>
            <span className="mb-2 block text-[2rem]">{icon}</span>
            <p className="font-display text-[1rem] font-extrabold text-espresso">{label}</p>
            <p className="mt-1 text-[0.78rem] font-semibold text-cocoa">
              The proof shelf stays tidy while this image is missing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenshotLightbox({ project, images, index, onSelect, onClose }) {
  const [failed, setFailed] = useState(false);
  const selectedImage = images[index];
  const total = images.length;
  const hasImage = selectedImage && !failed;

  useEffect(() => {
    setFailed(false);
  }, [selectedImage]);

  const goPrevious = () => onSelect((index - 1 + total) % total);
  const goNext = () => onSelect((index + 1) % total);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex min-h-dvh w-screen items-center justify-center overflow-hidden bg-espresso/70 px-4 py-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        event.stopPropagation();
        onClose();
      }}
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} fullscreen screenshot viewer`}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border-[1.5px] border-latte bg-paper p-4 shadow-pop md:p-5"
      >
        <span className="tape tape-sky" aria-hidden="true" />
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.76rem] font-extrabold uppercase tracking-[0.1em] text-cocoa">
              Screenshot {index + 1} / {total}
            </p>
            <h4 className="font-display text-[1.05rem] font-extrabold">{project.title}</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close fullscreen screenshot viewer"
            data-cursor
            className="rounded-full border-[1.5px] border-latte-deep bg-cream px-3.5 py-1.5 text-[0.82rem] font-extrabold text-cocoa shadow-card transition-colors hover:border-sky hover:bg-sky-soft"
          >
            Close
          </button>
        </div>

        <div className="relative flex max-h-[78dvh] min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[22px] border-[1.5px] border-latte bg-cream">
          {hasImage ? (
            <img
              src={selectedImage}
              alt={`${project.title} screenshot ${index + 1}`}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="max-h-[76dvh] w-full object-contain"
            />
          ) : (
            <div className="flex min-h-[58dvh] w-full items-center justify-center bg-linear-to-br from-sage-soft via-sky-soft to-peach-soft px-6 text-center">
              <div>
                <span className="mb-2 block text-[2.4rem]">{project.icon}</span>
                <p className="font-display text-[1.1rem] font-extrabold text-espresso">
                  Screenshot unavailable
                </p>
                <p className="mt-1 text-[0.84rem] font-semibold text-cocoa">
                  The viewer stays calm while this image is missing.
                </p>
              </div>
            </div>
          )}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous screenshot"
                data-cursor
                className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-latte-deep bg-paper/90 text-[1.4rem] font-extrabold text-espresso shadow-card backdrop-blur transition-colors hover:border-sage hover:bg-sage-soft"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next screenshot"
                data-cursor
                className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-latte-deep bg-paper/90 text-[1.4rem] font-extrabold text-espresso shadow-card backdrop-blur transition-colors hover:border-sage hover:bg-sage-soft"
              >
                →
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ProjectProofModal({ project, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const screenshots = project.images || [];
  const isLightboxOpen = lightboxIndex !== null && screenshots.length > 0;

  const closeLightbox = () => setLightboxIndex(null);
  const selectLightboxImage = (index) => setLightboxIndex(index);
  const closeProofModal = () => {
    setLightboxIndex(null);
    onClose();
  };

  useBodyScrollLock(true);
  useCustomCursorDisabled(true);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isLightboxOpen) {
          closeLightbox();
          return;
        }

        closeProofModal();
      }

      if (!isLightboxOpen) return;

      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current - 1 + screenshots.length) % screenshots.length);
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % screenshots.length);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen, screenshots.length]);

  const hasDemo = isPublicUrl(project.demoUrl);
  const hasGithub = isPublicUrl(project.githubUrl);
  const description = project.fullDesc || project.desc;

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[500] overflow-y-auto bg-espresso/45 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={closeProofModal}
      role="presentation"
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-proof-title"
        initial={{ opacity: 0, y: 24, scale: 0.97, rotate: -0.4 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
        className="relative mx-auto max-w-[960px] rounded-[30px] border-[1.5px] border-latte bg-paper px-5 pb-7 pt-9 shadow-pop md:px-8"
      >
        <span className={project.tape} aria-hidden="true" />
        <button
          type="button"
          onClick={closeProofModal}
          autoFocus
          aria-label={`Close ${project.title} screenshot gallery`}
          data-cursor
          className="absolute right-4 top-4 rounded-full border-[1.5px] border-latte-deep bg-cream px-3 py-1.5 text-[0.82rem] font-extrabold text-cocoa shadow-card transition-colors hover:border-sky hover:bg-sky-soft"
        >
          Close
        </button>

        <div className="mb-5 pr-20">
          <span className="text-[0.76rem] font-extrabold uppercase tracking-[0.1em] text-cocoa">
            {project.year} · {project.role}
          </span>
          <h3 id="project-proof-title" className="mt-1 font-display text-[clamp(1.55rem,3vw,2.2rem)] font-extrabold">
            {project.title}
          </h3>
          <p className="mt-1 text-[0.88rem] font-bold text-cocoa">{project.category}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {screenshots.length > 0 && (
              <span className="rounded-full border-[1.5px] border-sage bg-sage-soft px-3 py-1 text-[0.74rem] font-extrabold text-espresso">
                Screenshot proof available
              </span>
            )}
            {!hasDemo && (
              <span className="rounded-full border-[1.5px] border-peach bg-peach-soft px-3 py-1 text-[0.74rem] font-extrabold text-espresso">
                Private/internal project
              </span>
            )}
          </div>
        </div>

        <ProofImage
          src={project.coverImage}
          alt={`${project.title} cover image`}
          icon={project.icon}
          label="Cover image coming soon"
          className="mb-6"
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h4 className="mb-3 font-display text-[1.1rem] font-extrabold">Proof screenshots</h4>
            {screenshots.length > 0 ? (
              <div className="grid gap-3">
                {screenshots.map((image, index) => (
                  <motion.button
                    key={image}
                    type="button"
                    onClick={() => selectLightboxImage(index)}
                    aria-label={`Open ${project.title} screenshot ${index + 1} fullscreen`}
                    whileHover={{ y: -3, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
                    whileTap={{ scale: 0.98 }}
                    className="block rounded-[18px] text-left"
                  >
                    <ProofImage
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      icon={project.icon}
                      label={`Screenshot ${index + 1} coming soon`}
                    />
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="rounded-[18px] border-[1.5px] border-dashed border-latte-deep bg-cream px-5 py-6 text-center">
                <span className="mb-2 block text-[2rem]">{project.icon}</span>
                <p className="font-display text-[1rem] font-extrabold">Screenshots are still being prepared</p>
                <p className="mt-1 text-[0.82rem] text-ink-soft">
                  The project card will keep using its soft placeholder until the proof images arrive.
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="mb-4 text-[0.92rem] text-ink-soft">{description}</p>
            <div className="mb-4 rounded-[18px] bg-cream px-4 py-3 text-[0.86rem] text-ink-soft">
              <span className="font-bold text-espresso">My part: </span>
              {project.did}
            </div>
            {project.proud && (
              <div className="mb-4 rounded-[18px] bg-sage-soft px-4 py-3 text-[0.86rem] text-ink-soft">
                <span className="font-bold text-espresso">Tiny proud detail: </span>
                {project.proud}
              </div>
            )}

            <h4 className="mb-3 font-display text-[1.1rem] font-extrabold">Tech stack</h4>
            <div className="mb-5 flex flex-wrap gap-2">
              {(project.tech || project.tags).map((item) => (
                <span
                  key={item}
                  className="rounded-full border-[1.5px] border-latte-deep bg-cream px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.04em]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {hasDemo && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, rotate: -1 }}
                  className="rounded-full bg-espresso px-4 py-2 text-[0.82rem] font-extrabold text-cream"
                >
                  View demo
                </motion.a>
              )}
              {hasGithub && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, rotate: 1 }}
                  className="rounded-full border-2 border-latte-deep bg-cream px-4 py-2 text-[0.82rem] font-extrabold transition-colors hover:border-sky hover:bg-sky-soft"
                >
                  GitHub
                </motion.a>
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isLightboxOpen && (
            <ScreenshotLightbox
              project={project}
              images={screenshots}
              index={lightboxIndex}
              onSelect={setLightboxIndex}
              onClose={closeLightbox}
            />
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>,
    document.body
  );
}

export function ProjectCard({ project, expanded = false }) {
  const [proofOpen, setProofOpen] = useState(false);
  const hasScreenshots = (project.images || []).length > 0;

  return (
    <>
      <TiltCard className="group relative h-full rounded-[28px] border-[1.5px] border-latte bg-paper px-7 pb-6 pt-10 shadow-card transition-shadow duration-300 hover:shadow-pop">
        <span className={project.tape} aria-hidden="true" />
        <ProjectCover project={project} />
        <div
          className={`mb-[18px] flex size-16 items-center justify-center rounded-[20px] text-[1.9rem] transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-110 ${project.iconBg}`}
        >
          {project.icon}
        </div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className="font-display text-[1.22rem] font-extrabold">{project.title}</h3>
          <span className="rounded-full border-[1.5px] border-latte-deep bg-cream px-2.5 py-0.5 text-[0.7rem] font-extrabold text-cocoa">
            {project.year}
          </span>
        </div>
        <p className="mb-2 text-[0.82rem] font-bold text-cocoa">{project.role}</p>
        <p className="mb-4 text-[0.92rem] text-ink-soft">{expanded ? project.fullDesc : project.desc}</p>
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
          <span className="hand mr-1.5 text-[1.15rem]">my part &rarr;</span>
          {project.did}
        </div>
        {expanded && (
          <div className="mt-4 rounded-[18px] bg-cream px-4 py-3 text-[0.84rem] text-ink-soft">
            <span className="font-bold text-espresso">Tiny proud detail: </span>
            {project.proud}
          </div>
        )}
        {(hasScreenshots || isPublicUrl(project.demoUrl) || isPublicUrl(project.githubUrl)) && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {hasScreenshots && (
              <motion.button
                type="button"
                onClick={() => setProofOpen(true)}
                whileHover={{ y: -2, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-espresso px-4 py-2 text-[0.78rem] font-extrabold text-cream"
              >
                View proof
              </motion.button>
            )}
            {isPublicUrl(project.demoUrl) && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, rotate: -1 }}
                className="rounded-full border-2 border-latte-deep bg-cream px-4 py-2 text-[0.78rem] font-extrabold transition-colors hover:border-sage hover:bg-sage-soft"
              >
                View demo
              </motion.a>
            )}
            {isPublicUrl(project.githubUrl) && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, rotate: 1 }}
                className="rounded-full border-2 border-latte-deep bg-cream px-4 py-2 text-[0.78rem] font-extrabold transition-colors hover:border-sky hover:bg-sky-soft"
              >
                GitHub
              </motion.a>
            )}
          </div>
        )}
      </TiltCard>
      <AnimatePresence>
        {proofOpen && <ProjectProofModal project={project} onClose={() => setProofOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const featuredProjects = PROJECTS.filter((project) => project.featured);

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
          sub="A focused shelf of web apps, dashboards, and data projects where the messy parts turned into useful little systems. Tilt the cards - they're friendly."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18}>
          <div className="mt-8 rounded-[28px] border-[1.5px] border-latte bg-paper px-7 py-6 shadow-card">
            <p className="hand text-[1.45rem]">Want to peek at the rest of the build shelf?</p>
            <p className="mb-5 mt-1 max-w-[650px] text-[0.93rem] text-ink-soft">
              I keep the extra projects here - some are dashboards, some are coursework gems, and
              some are tiny experiments that taught me a lot.
            </p>
            <GhostButton href="/projects">View all projects &rarr;</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
