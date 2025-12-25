import React from 'react';
import { cn } from '../../../../shared/utils/cn';
import { CardHeaderProps, CardProps } from './Card.types';

export const Card = ({ className, children, noPadding = false, ...props }: CardProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden",
        !noPadding && "p-5",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  className, 
  title, 
  action, 
  icon, 
  iconColor = "text-primary", 
  iconBgColor = "bg-primary/10",
  ...props 
}: CardHeaderProps) => {
  return (
    <div 
      className={cn(
        "flex justify-between items-start mb-2", 
        className
      )} 
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cn("p-2 rounded-lg flex items-center justify-center", iconBgColor, iconColor)}>
            {icon}
          </div>
        )}
        <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">{title}</p>
      </div>
      {action}
    </div>
  );
};