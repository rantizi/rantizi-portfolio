import { motion } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Reveal-on-scroll wrapper. Replaces the old IntersectionObserver + .reveal CSS. */
export default function Reveal({ children, delay = 0, y = 28, className = "", ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
