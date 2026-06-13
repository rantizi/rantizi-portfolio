import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS } from "../data/content";
import useActiveSection from "../hooks/useActiveSection";
import { useToast } from "./ui/Toast";
import { EASE_OUT } from "./ui/Reveal";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const toast = useToast();
  const logoClicks = useRef(0);
  const isProjectsPage = window.location.pathname.replace(/\/$/, "") === "/projects";

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  /* Easter egg: 3 logo clicks shift the whole palette for a moment */
  const onLogoClick = () => {
    logoClicks.current += 1;
    if (logoClicks.current === 3) {
      logoClicks.current = 0;
      document.body.style.transition = "filter .6s ease";
      document.body.style.filter = "hue-rotate(25deg)";
      setTimeout(() => (document.body.style.filter = ""), 1500);
      toast("Whoa, alternate color universe 🌈 (3 logo clicks)");
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={`fixed left-1/2 top-4 z-[200] flex w-[min(1060px,calc(100%-32px))] items-center justify-between rounded-full border-[1.5px] border-latte bg-paper/80 py-2.5 pl-5 pr-3.5 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-pop" : "shadow-card"
      }`}
    >
      <button
        type="button"
        onClick={onLogoClick}
        data-cursor
        title="Click me a few times 👀"
        className="group flex items-center gap-2 font-display text-xl font-extrabold"
      >
        <span className="inline-block size-3 rounded-full bg-sage transition-transform duration-300 group-hover:scale-150" />
        rantizi.dev
      </button>

      {/* Desktop links */}
      <div className="hidden items-center gap-1 lg:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={isProjectsPage ? `/#${link.id}` : `#${link.id}`}
            className={`rounded-full px-3.5 py-2 text-[0.86rem] font-semibold transition-colors duration-200 ${
              !isProjectsPage && active === link.id
                ? "bg-espresso text-cream"
                : "text-ink-soft hover:bg-sage-soft hover:text-espresso"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <motion.a
        href="#contact"
        whileHover={{ y: -2, rotate: -1 }}
        className="hidden rounded-full bg-sage px-[18px] py-2.5 text-[0.86rem] font-bold text-white transition-colors hover:bg-[#6E9069] lg:inline-block"
      >
        Say hello 👋
      </motion.a>

      {/* Mobile burger */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="px-2.5 py-1 text-2xl lg:hidden"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="absolute left-0 right-0 top-[calc(100%+10px)] flex flex-col gap-1 rounded-3xl border-[1.5px] border-latte bg-paper p-3.5 shadow-pop lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={isProjectsPage ? `/#${link.id}` : `#${link.id}`}
                onClick={() => setOpen(false)}
                className="rounded-full px-3.5 py-2.5 text-center text-[0.92rem] font-semibold text-ink-soft hover:bg-sage-soft hover:text-espresso"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-sage px-3.5 py-2.5 text-center text-[0.92rem] font-bold text-white"
            >
              Say hello 👋
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
