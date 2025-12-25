import React from 'react';
import { cn } from '../../../../shared/utils/cn';
import { BadgeProps } from './Badge.types';

export const Badge = ({ 
  className, 
  variant = 'neutral', 
  children, 
  icon, 
  pulse = false,
  ...props 
}: BadgeProps) => {
  
  const variants = {
    success: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 ring-yellow-500/20",
    error: "bg-red-500/10 text-red-500 ring-red-500/20",
    info: "bg-blue-500/10 text-blue-500 ring-blue-500/20",
    neutral: "bg-slate-500/10 text-slate-500 ring-slate-500/20",
    primary: "bg-primary/10 text-primary ring-primary/20",
  };

  const pulseColors = {
    success: "bg-emerald-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    neutral: "bg-slate-500",
    primary: "bg-primary",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ring-1 ring-inset",
        variants[variant],
        className
      )} 
      {...props}
    >
      {pulse && (
        <span className={cn("flex h-1.5 w-1.5 rounded-full mr-0.5 animate-pulse", pulseColors[variant])}></span>
      )}
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </span>
  );
};