'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/presentation/components/layout/Sidebar/Sidebar';
import { Header } from '@/presentation/components/layout/Header/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen bg-slate-50 dark:bg-[#0d121c] flex overflow-hidden">
            {/* Sidebar Component - Fixed position, handles its own visibility/transitions */}
            <Sidebar
                className="w-64"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Spacer for Desktop - Pushes content to the right */}
            <div className="hidden lg:block w-64 flex-shrink-0" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header Global */}
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
