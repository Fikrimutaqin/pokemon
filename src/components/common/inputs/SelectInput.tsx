// Core React
import { useState, useRef, useEffect } from 'react';
// Animation
import { motion, AnimatePresence } from 'framer-motion';
// Types
import { SelectInputProps } from '@/types/SelectInputType';

export const SelectInput = ({ label, options, value, onChange, error, requiredIndicator, className = '' }: SelectInputProps) => {
  // State for open value dropdown
  const [isOpen, setIsOpen] = useState(false);
  // Ref for container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find selected option
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <div className="flex justify-between items-end">
        <label className="text-white/70 text-[11px] font-bold tracking-widest uppercase">
          {label}
        </label>
        {requiredIndicator && (
          <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase">
            Required
          </span>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-[#0B0C10] border rounded-xl pl-5 pr-12 py-4 text-left text-white focus:outline-none focus:ring-1 transition-all cursor-pointer ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-white/5 focus:border-primary focus:ring-primary'
            } ${className}`}
        >
          {selectedOption ? selectedOption.label : 'Select an option'}
          <div
            className="absolute right-5 top-1/2 pointer-events-none text-white/30 text-xs transition-transform duration-300 ease-in-out"
            style={{ transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)' }}
          >
            ▼
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 bg-[#15171A] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
            >
              <ul className="max-h-60 overflow-y-auto">
                {options.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`px-5 py-4 cursor-pointer transition-colors ${value === opt.value ? 'bg-primary/20 text-primary font-bold' : 'text-white hover:bg-white/5'
                      }`}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
};
