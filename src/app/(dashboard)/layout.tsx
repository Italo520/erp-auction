import React from 'react';
import { Sidebar } from '@/presentation/components/layout/Sidebar/Sidebar';
import { Header } from '@/presentation/components/layout/Header/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0d121c] flex">
            {/* Sidebar - Fixa em telas grandes, escondida em pequenas (responsividade a ajustar no componente se precisar) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <Sidebar className="w-64" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header Global (Opcional aqui, ou por página. Deixando aqui para estrutura completa) */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
