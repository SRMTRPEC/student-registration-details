import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, fullWidth, className = '', disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]",
      secondary: "bg-card hover:bg-white/10 text-text border border-white/10",
      outline: "border-2 border-primary text-primary hover:bg-primary/10",
      ghost: "text-text-secondary hover:text-text hover:bg-white/5",
    };

    const sizing = "py-3 px-6";
    const width = fullWidth ? "w-full" : "";

    return (
      <motion.button
        type={props.type || 'button'}
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizing} ${width} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
