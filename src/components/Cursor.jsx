import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: an instant dot + a lazy spring ring.
 * Renders nothing on touch devices or when reduced motion is preferred.
 * The ring grows over links, buttons, and anything marked with [data-cursor].
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e) => {
      setHovering(!!e.target.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-2 rounded-full bg-sage"
        style={{ x: "-50%", y: "-50%", left: x, top: y }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-cocoa"
        style={{ x: "-50%", y: "-50%", left: ringX, top: ringY }}
        animate={{
          width: hovering ? 54 : 34,
          height: hovering ? 54 : 34,
          opacity: hovering ? 0.9 : 0.45,
          backgroundColor: hovering ? "rgba(127,163,122,0.14)" : "rgba(127,163,122,0)",
          borderColor: hovering ? "#7FA37A" : "#8A6F58",
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
