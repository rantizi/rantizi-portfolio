import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { HERO_STICKERS, ROTATOR_WORDS } from "../data/content";
import { PrimaryButton, GhostButton } from "./ui/Buttons";
import { EASE_OUT } from "./ui/Reveal";
import { useToast } from "./ui/Toast";
import confetti from "../lib/confetti";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const FACES = ["🙂", "😄", "😆", "🤪", "😵‍💫"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATOR_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={ROTATOR_WORDS[index]}
        initial={{ opacity: 0, y: 12, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="inline-block border-b-[3px] border-dotted border-latte-deep pb-0.5 text-sage"
      >
        {ROTATOR_WORDS[index]}
      </motion.span>
    </AnimatePresence>
  );
}

function Avatar() {
  const toast = useToast();
  const controls = useAnimationControls();
  const boops = useRef(0);
  const [face, setFace] = useState(FACES[0]);

  /* Easter egg: boop the avatar — it spins, gets dizzy at 5, resets at 10 */
  const onBoop = () => {
    boops.current += 1;
    const n = boops.current;
    setFace(FACES[Math.min(n - 1, FACES.length - 1)]);
    controls.start({
      rotate: [0, 360],
      transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] },
    });
    if (n === 5) {
      confetti(60);
      toast("Okay okay, I'm dizzy! 🥴 You found a secret.");
    }
    if (n === 10) {
      toast("Achievement unlocked: Certified Booper 🏅");
      boops.current = 0;
      setFace(FACES[0]);
    }
  };

  return (
    <motion.div
      animate={controls}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onBoop}
      data-cursor
      title="boop!"
      className="anim-blob relative flex aspect-square w-[min(320px,80%)] cursor-pointer select-none items-center justify-center border-[3px] border-paper bg-linear-to-br from-sage-soft to-sky-soft shadow-pop"
    >
      <span className="anim-float-rev text-[5.4rem]">{face}</span>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <header id="home" className="relative flex min-h-screen items-center pb-[60px] pt-[140px]">
      <div className="container-app grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left column: staggered entrance */}
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <motion.div variants={itemVariants}>
            <span className="hand inline-block -rotate-2 rounded-full border-[1.5px] border-dashed border-peach bg-peach-soft px-[18px] py-1.5 text-[1.5rem] font-bold">
              Hi there, I'm 👋
            </span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="mb-5 mt-5 font-display text-[clamp(2.6rem,6.5vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-0.01em]"
          >
            Abdul Aziz <span className="hl">Rantizi</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mb-3.5 max-w-[480px] text-[1.08rem] text-ink-soft">
            A Computer Science student who turns <strong className="text-espresso">messy data</strong> into
            friendly, readable insights — and writes code that's tidy enough to match.
          </motion.p>
          <motion.p variants={itemVariants} className="mb-8 text-[1.05rem] font-extrabold">
            Currently into → <RotatingWord />
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3.5">
            <PrimaryButton href="#projects">See my projects ✨</PrimaryButton>
            <GhostButton href="#contact">Say hello ☕</GhostButton>
          </motion.div>
        </motion.div>

        {/* Right column: avatar + floating stickers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
          className="relative flex justify-center max-lg:order-first"
        >
          <Avatar />
          {HERO_STICKERS.map((sticker) => (
            <motion.span
              key={sticker.label}
              style={{ rotate: sticker.rotate, animationDelay: `${sticker.delay}s` }}
              whileHover={{ scale: 1.12, rotate: 0 }}
              data-cursor
              className={`anim-float absolute whitespace-nowrap rounded-full border-2 bg-paper px-4 py-2 text-[0.85rem] font-extrabold shadow-card ${sticker.className}`}
            >
              {sticker.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-cocoa md:flex"
      >
        <div className="mouse-wheel relative h-[38px] w-6 rounded-[14px] border-[2.5px] border-cocoa" />
        scroll
      </motion.div>
    </header>
  );
}
