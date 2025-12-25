'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Gavel, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '../../../../shared/utils/cn';
import { SidebarItem } from './SidebarItem';
import { SidebarUser } from './SidebarUser';
import { SidebarProps } from './Sidebar.types';

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const menuItems = [
        { icon: <Home />, label: 'Dashboard', href: '/dashboard' },
        { icon: <Gavel />, label: 'Leilões', href: '/leiloes' },
        { icon: <Users />, label: 'Usuários', href: '/usuarios' },
        { icon: <Settings />, label: 'Configurações', href: '/configuracoes' },
    ];

    return (
        <aside
            className={cn(
                "flex flex-col h-screen w-64 bg-white dark:bg-[#111722] border-r border-slate-200 dark:border-slate-800 fixed left-0 top-0 z-40 transition-transform",
                className
            )}
        >
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Gavel size={18} />
                    </div>
                    ERP Auction
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        {...item}
                    />
                ))}
            </nav>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut size={20} />
                    Sair
                </button>
            </div>

            <SidebarUser
                name="Admin User"
                email="admin@example.com"
            />
        </aside>
    );
};
