'use client';

import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/core/entities/Vehicle';
import { Button } from '@/presentation/components/ui/Button/Button';
import { Spinner } from '@/presentation/components/ui/Spinner/Spinner';
import { Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AuctionVehicleListProps {
    auctionId: string;
    refreshKey?: number;
    onVehiclesChange?: (vehicles: Vehicle[]) => void;
}

export const AuctionVehicleList: React.FC<AuctionVehicleListProps> = ({
    auctionId,
    refreshKey = 0,
    onVehiclesChange,
}) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [removingId, setRemovingId] = useState<string | null>(null);

    // Carregar veículos do leilão
    useEffect(() => {
        fetchAuctionVehicles();
    }, [auctionId, refreshKey]);

    const fetchAuctionVehicles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/vehicles?auctionId=${auctionId}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar veículos do leilão');
            }

            const result = await response.json();
            const vehicleList = result.data?.items || [];
            setVehicles(vehicleList);
            onVehiclesChange?.(vehicleList);
        } catch (error) {
            console.error('Error fetching auction vehicles:', error);
            toast.error('Erro ao carregar veículos do leilão');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveVehicle = async (vehicleId: string) => {
        if (!confirm('Tem certeza que deseja remover este veículo do leilão?')) {
            return;
        }

        try {
            setRemovingId(vehicleId);

            const response = await fetch(`/api/auctions/${auctionId}/vehicles/${vehicleId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Erro ao remover veículo');
            }

            toast.success('Veículo removido com sucesso!');

            // Atualizar lista
            await fetchAuctionVehicles();
        } catch (error) {
            console.error('Error removing vehicle:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro ao remover veículo';
            toast.error(errorMessage);
        } finally {
            setRemovingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Spinner size="lg" />
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="text-center p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                <AlertCircle size={48} className="mx-auto mb-2 text-slate-400" />
                <p className="text-slate-600 dark:text-slate-400">
                    Nenhum veículo associado a este leilão
                </p>
                <p className="text-sm text-slate-500 mt-1">
                    Use o seletor acima para adicionar veículos
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Veículos do Leilão ({vehicles.length})
                </h3>
            </div>

            {/* Tabela de veículos */}
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Lote
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Veículo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Ano
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Chassi
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Lance Inicial
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#111722] divide-y divide-slate-200 dark:divide-slate-700">
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {vehicle.lotNumber || '-'}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        {vehicle.images && vehicle.images.length > 0 && (
                                            <img
                                                src={vehicle.images[0].url}
                                                alt={`${vehicle.make} ${vehicle.model}`}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                {vehicle.make} {vehicle.model}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {vehicle.version}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        {vehicle.yearManufacture}/{vehicle.yearModel}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-xs text-slate-500 font-mono">
                                        {vehicle.chassisNumber}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                        R$ {vehicle.initialBid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveVehicle(vehicle.id)}
                                        disabled={removingId === vehicle.id}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
