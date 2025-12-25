import { useState, useEffect } from 'react';
import { ActivityItem } from '@/presentation/components/features/dashboard/dashboard.types';

export function useDashboardViewModel() {
    const [stats, setStats] = useState({
        totalAuctions: '0',
        totalVehicles: '0',
        totalRevenue: 'R$ 0,00',
        activeBidders: '0'
    });

    const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating API call
        const loadDashboardData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            setStats({
                totalAuctions: '12',
                totalVehicles: '45',
                totalRevenue: 'R$ 1.2M',
                activeBidders: '128'
            });

            setRecentActivity([
                {
                    id: '1',
                    title: 'Novo lance no Lote #233',
                    description: 'Toyota Corolla 2021 recebeu um lance de R$ 85.000',
                    time: 'Há 5 minutos',
                    type: 'bid'
                },
                {
                    id: '2',
                    title: 'Leilão #45 Encerrado',
                    description: 'Todos os lotes foram vendidos com sucesso',
                    time: 'Há 2 horas',
                    type: 'auction'
                },
                {
                    id: '3',
                    title: 'Novo Usuário Cadastrado',
                    description: 'Roberto Silva completou o cadastro',
                    time: 'Há 4 horas',
                    type: 'user'
                },
                {
                    id: '4',
                    title: 'Veículo Adicionado',
                    description: 'Honda Civic 2022 foi adicionado ao pátio',
                    time: 'Há 1 dia',
                    type: 'system'
                }
            ]);

            setIsLoading(false);
        };

        loadDashboardData();
    }, []);

    return {
        stats,
        recentActivity,
        isLoading
    };
}
