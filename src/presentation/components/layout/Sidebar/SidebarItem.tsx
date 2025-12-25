'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../../../shared/utils/cn';
import { SidebarItemProps } from './Sidebar.types';

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                "text-sm font-medium",
                isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
            )}
        >
            <span className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-500 dark:text-slate-400")}>
                {icon}
            </span>
            {label}
        </Link>
    );
};
