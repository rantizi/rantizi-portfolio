import { useEffect } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/** Fires `onUnlock` when the Konami code is typed. Pass a stable callback. */
export default function useKonami(onUnlock) {
  useEffect(() => {
    let idx = 0;
    const onKey = (e) => {
      idx = e.key === SEQUENCE[idx] ? idx + 1 : e.key === SEQUENCE[0] ? 1 : 0;
      if (idx === SEQUENCE.length) {
        idx = 0;
        onUnlock();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}
