import { motion } from "framer-motion";

const base =
  "inline-flex items-center gap-2.5 rounded-full px-[26px] py-3.5 text-[0.95rem] font-bold";

export function PrimaryButton({ href, children }) {
  return (
    <motion.a
      href={href}
      data-cursor
      whileHover={{ y: -3, rotate: -1 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} bg-espresso text-cream shadow-[0_8px_20px_rgba(65,56,44,0.22)]`}
    >
      {children}
    </motion.a>
  );
}

export function GhostButton({ href, children }) {
  return (
    <motion.a
      href={href}
      data-cursor
      whileHover={{ y: -3, rotate: 1 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} border-2 border-latte-deep bg-paper text-espresso transition-colors hover:border-sage hover:bg-sage-soft`}
    >
      {children}
    </motion.a>
  );
}
