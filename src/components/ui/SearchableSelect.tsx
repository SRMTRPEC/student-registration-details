import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check } from 'lucide-react';

export interface SearchableSelectProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const SearchableSelect = React.forwardRef<HTMLInputElement, SearchableSelectProps>(
  ({ label, error, helperText, options, className = '', id, value, required, ...props }, ref) => {
    const selectId = id || label.replace(/\s+/g, '-').toLowerCase();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [internalValue, setInternalValue] = useState(value as string || '');
    
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Sync external value with internal value
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string);
      }
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt => 
      opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const selectedOption = options.find(opt => opt.value === internalValue);

    const handleSelect = (val: string) => {
      setInternalValue(val);
      if (props.onChange) {
        const event = {
          target: { value: val, name: props.name },
          type: 'change'
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(event);
      }
      setIsOpen(false);
      setSearch('');
    };

    return (
      <div className={`flex flex-col w-full ${className}`} ref={wrapperRef}>
        <label htmlFor={selectId} className="mb-2 text-sm font-medium text-text-secondary">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          {/* Hidden input to hold the actual value for form submission/validation if using ref */}
          <input
            type="text"
            id={selectId}
            ref={ref}
            value={internalValue}
            className="hidden"
            readOnly
            {...props}
          />
          
          {/* Custom Select Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-full flex items-center justify-between bg-background/50 border rounded-lg px-4 py-3 text-left
              transition-all duration-200 focus:outline-none focus:ring-2
              ${error 
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
                : 'border-white/10 focus:ring-primary/50 focus:border-primary'}
              ${!selectedOption ? 'text-text-secondary' : 'text-text'}
            `}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : 'Select an option'}
            </span>
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-full mt-2 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
              >
                <div className="p-2 border-b border-white/10 flex items-center bg-gray-900/50">
                  <Search className="w-4 h-4 text-text-secondary ml-2 mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent text-sm text-text focus:outline-none py-1"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelect(opt.value)}
                        className={`
                          w-full flex items-center justify-between px-4 py-2 text-sm text-left
                          hover:bg-primary/20 transition-colors
                          ${internalValue === opt.value ? 'bg-primary/10 text-primary' : 'text-text'}
                        `}
                      >
                        <span className="truncate pr-4">{opt.label}</span>
                        {internalValue === opt.value && <Check className="w-4 h-4 flex-shrink-0" />}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-text-secondary text-center">
                      No options found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
        
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

SearchableSelect.displayName = 'SearchableSelect';
