import React from 'react';
import { cn } from '@/shared/utils/cn';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    fullWidth = false,
    ...props
  }, ref) => {

    const variants = {
      primary: "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 border-transparent",
      secondary: "bg-white dark:bg-[#111722] border-slate-200 dark:border-[#324467] text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#232f48]",
      outline: "bg-transparent border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
      ghost: "bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
      danger: "bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-12 md:h-14 px-6 text-sm md:text-base",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-bold leading-normal tracking-[0.015em] transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 dark:focus:ring-offset-[#101622]",
          "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
          "border",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {!isLoading && leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";