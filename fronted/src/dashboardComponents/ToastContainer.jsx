import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The Global Function
export const Toast = (message, type = "i", duration = 3000, role) => {
  const event = new CustomEvent("show-toast", {
    detail: { message, type, duration, role },
  });
  window.dispatchEvent(event);
};

const ToastContainer = ({ setrole }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const id = Date.now();
      const { message, type, duration, role } = e.detail;

      setToasts((prev) => [...prev, { id, message, type }]);
      if (!!role) {
        setrole(role);
      }

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  const getStyles = (type) => {
    switch (type) {
      case "d":
        return "bg-red-500/50 border-red-600"; // Danger
      case "w":
        return "bg-orange-500/60 border-orange-600"; // Warning
      case "s":
        return "bg-green-500/60 border-green-600"; // Success
      case "i":
        return "bg-blue-500/60 border-blue-600"; // Info
      default:
        return "bg-gray-800/60 border-gray-900";
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`px-6 py-3 rounded-xl shadow-2xl text-white border-b-4 font-medium min-w-[250px] ${getStyles(toast.type)}`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
