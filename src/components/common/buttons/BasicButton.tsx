// Core React
import React from 'react';
// Framer Motion
import { motion } from 'framer-motion';
// Types
import { BasicButtonProps } from '@/types/BasicButtonType';

export default function BasicButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: BasicButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-white text-black hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    secondary: "bg-[#1E1F22] text-white hover:bg-[#2A2B2F] border border-white/5",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
