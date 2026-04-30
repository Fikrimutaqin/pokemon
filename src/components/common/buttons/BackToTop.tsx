'use client';

// Core React
import { useState, useEffect } from 'react';
// Animation
import { motion, AnimatePresence } from 'framer-motion';
// Icons
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 lg:right-10 z-60 p-3 rounded-full bg-primary text-black shadow-lg shadow-primary/30 cursor-pointer border-2 border-white/20 flex items-center justify-center transition-colors hover:bg-white"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 stroke-3" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
