import { motion, useScroll, useSpring } from "framer-motion";

/** Top-of-page reading progress bar driven by useScroll + a spring. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[300] h-[5px] origin-left rounded-r-md bg-linear-to-r from-sage via-sky to-peach"
    />
  );
}
