import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
        
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-500
                  ${isCompleted || isCurrent 
                    ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                    : 'bg-card border-white/10 text-text-secondary'}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
              </motion.div>
              <div className={`absolute top-14 text-xs font-medium whitespace-nowrap text-center w-24 -ml-12 left-1/2 transition-colors duration-500
                ${isCurrent ? 'text-text' : 'text-text-secondary'}
              `}>
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
