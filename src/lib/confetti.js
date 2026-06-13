const COLORS = ["#7FA37A", "#6F9FC4", "#F2BE93", "#D9C3A8", "#F7E0DA", "#41382C"];

/** Imperative confetti burst. Cheap, dependency-free, removes itself. */
export default function confetti(amount = 90) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < amount; i++) {
    const bit = document.createElement("span");
    bit.className = "confetti-bit";
    bit.style.left = Math.random() * 100 + "vw";
    bit.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    bit.style.width = 6 + Math.random() * 8 + "px";
    bit.style.height = 8 + Math.random() * 10 + "px";
    bit.style.borderRadius = Math.random() > 0.5 ? "50%" : "3px";
    bit.style.animationDuration = 2.2 + Math.random() * 2 + "s";
    bit.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 5200);
  }
}
