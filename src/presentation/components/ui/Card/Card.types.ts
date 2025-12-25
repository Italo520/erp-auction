import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  noPadding?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  action?: ReactNode;
  icon?: ReactNode;
  iconColor?: string; // Tailwind text color class
  iconBgColor?: string; // Tailwind bg color class
}