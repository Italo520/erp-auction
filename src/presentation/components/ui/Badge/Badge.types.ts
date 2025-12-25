import { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
  icon?: string; // Material Symbol name
  pulse?: boolean;
}