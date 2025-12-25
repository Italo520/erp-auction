'use client';

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { HeaderProps } from './Header.types';
import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';

export const Header: React.FC<HeaderProps> = ({ title, actions }) => {
    return (
        <header className="h-16 bg-white dark:bg-[#111722] border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                    <Menu size={20} />
                </button>
                {title && (
                    <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {title}
                    </h1>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block w-64">
                    {/* Simplificado search input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full h-9 pl-9 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                        />
                    </div>
                </div>

                <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#111722]"></span>
                </button>

                {actions}
            </div>
        </header>
    );
};
