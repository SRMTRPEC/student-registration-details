import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, glass = true, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`${glass ? 'glass-card' : 'bg-card border border-white/10 rounded-2xl shadow-xl'} p-6 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
