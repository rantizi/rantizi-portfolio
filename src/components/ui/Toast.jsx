import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext(() => {});

/** `const toast = useToast(); toast("message")` — one toast at a time. */
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timer = useRef(null);

  const show = useCallback((msg) => {
    setMessage(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2800);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            key="toast"
            initial={{ y: 90, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 90, x: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="fixed bottom-7 left-1/2 z-[9000] max-w-[90vw] rounded-full bg-espresso px-6 py-3.5 text-center text-[0.92rem] font-bold text-cream shadow-pop"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
