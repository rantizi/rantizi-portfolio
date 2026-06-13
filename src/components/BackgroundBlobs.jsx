import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxBlob({ factor, className, blobClass }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * factor);
  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <div className={`h-full w-full rounded-full opacity-55 blur-[60px] ${blobClass}`} />
    </motion.div>
  );
}

/** Soft ambient blobs: CSS drift for atmosphere, Framer Motion for scroll parallax. */
export default function BackgroundBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <ParallaxBlob
        factor={0.06}
        className="-left-[120px] -top-[120px] h-[480px] w-[480px]"
        blobClass="bg-sage-soft anim-drift"
      />
      <ParallaxBlob
        factor={-0.05}
        className="-right-[160px] top-[30%] h-[420px] w-[420px]"
        blobClass="bg-sky-soft anim-drift-rev"
      />
      <ParallaxBlob
        factor={0.04}
        className="-bottom-[100px] left-[22%] h-[380px] w-[380px]"
        blobClass="bg-peach-soft anim-drift-slow"
      />
    </div>
  );
}
