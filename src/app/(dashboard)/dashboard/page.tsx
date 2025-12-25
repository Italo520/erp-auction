'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { StatsCard } from '@/presentation/components/features/dashboard/StatsCard';
import { RecentActivity } from '@/presentation/components/features/dashboard/RecentActivity';
import { QuickActions } from '@/presentation/components/features/dashboard/QuickActions';
import { useDashboardViewModel } from '@/presentation/viewmodels/DashboardViewModel';
import { Gavel, Car, DollarSign, Users, Plus, FileText, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { stats, recentActivity, isLoading } = useDashboardViewModel();
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const quickActions = [
        {
            label: 'Novo Leilão',
            icon: <Gavel size={18} />,
            onClick: () => router.push('/leiloes/novo'),
            variant: 'outline' as const
        },
        {
            label: 'Cadastrar Veículo',
            icon: <Car size={18} />,
            onClick: () => router.push('/veiculos/novo'),
            variant: 'outline' as const
        },
        {
            label: 'Relatórios',
            icon: <FileText size={18} />,
            onClick: () => router.push('/relatorios'),
            variant: 'outline' as const
        },
        {
            label: 'Configurações',
            icon: <Settings size={18} />,
            onClick: () => router.push('/configuracoes'),
            variant: 'outline' as const
        }
    ];

    return (
        <Container>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Visão Geral</h1>
                <p className="text-slate-500 dark:text-slate-400">Bem-vindo ao painel administrativo do ERP Auction.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard
                    title="Leilões Ativos"
                    value={stats.totalAuctions}
                    icon={<Gavel size={20} />}
                    change="+12%"
                    trend="up"
                    description="Em relação ao mês anterior"
                />
                <StatsCard
                    title="Veículos em Pátio"
                    value={stats.totalVehicles}
                    icon={<Car size={20} />}
                    change="-5%"
                    trend="down"
                />
                <StatsCard
                    title="Faturamento Total"
                    value={stats.totalRevenue}
                    icon={<DollarSign size={20} />}
                    change="+24%"
                    trend="up"
                />
                <StatsCard
                    title="Licitantes Ativos"
                    value={stats.activeBidders}
                    icon={<Users size={20} />}
                    change="+8%"
                    trend="up"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Gráfico poderia vir aqui futuramente */}
                    <RecentActivity activities={recentActivity} />
                </div>
                <div className="space-y-8">
                    <QuickActions actions={quickActions} />

                    {/* Card secundário ou outra informação relevante */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Dica do Sistema</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            Lembre-se de verificar a documentação dos novos veículos cadastrados antes de publicá-los em leilão.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
}
