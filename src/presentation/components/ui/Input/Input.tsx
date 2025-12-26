import React from 'react';
import { cn } from '@/shared/utils/cn';
import { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, rightElement, containerClassName, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={cn("flex flex-col gap-2", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[#111418] dark:text-white text-sm font-medium leading-normal"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92a4c9] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "flex w-full min-w-0 resize-none overflow-hidden rounded-lg",
              "bg-white dark:bg-[#111722]",
              "border border-[#d1d5db] dark:border-[#324467]",
              "text-[#111418] dark:text-white placeholder:text-[#92a4c9] text-base font-normal leading-normal",
              "focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary",
              "transition-all duration-200",
              "h-12 md:h-14",
              leftIcon ? "pl-12" : "pl-4",
              rightIcon || rightElement ? "pr-12" : "pr-4",
              error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : "",
              className
            )}
            {...props}
          />

          {(rightIcon || rightElement) && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92a4c9] flex items-center justify-center">
              {rightElement || rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-xs mt-1 animate-pulse">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";