'use client';

import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/core/entities/Vehicle';
import { Button } from '@/presentation/components/ui/Button/Button';
import { Spinner } from '@/presentation/components/ui/Spinner/Spinner';
import { Search, Plus, Car } from 'lucide-react';
import { toast } from 'sonner';

interface VehicleSelectorProps {
    auctionId: string;
    onSuccess?: () => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({ auctionId, onSuccess }) => {
    const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Carregar veículos disponíveis
    useEffect(() => {
        fetchAvailableVehicles();
    }, []);

    const fetchAvailableVehicles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/vehicles/available');

            if (!response.ok) {
                throw new Error('Erro ao buscar veículos disponíveis');
            }

            const result = await response.json();
            setAvailableVehicles(result.data || []);
        } catch (error) {
            console.error('Error fetching available vehicles:', error);
            toast.error('Erro ao carregar veículos disponíveis');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleVehicle = (vehicleId: string) => {
        setSelectedIds(prev =>
            prev.includes(vehicleId)
                ? prev.filter(id => id !== vehicleId)
                : [...prev, vehicleId]
        );
    };

    const handleAddVehicles = async () => {
        if (selectedIds.length === 0) {
            toast.warning('Selecione pelo menos um veículo');
            return;
        }

        try {
            setIsAdding(true);

            const response = await fetch(`/api/auctions/${auctionId}/vehicles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vehicleIds: selectedIds,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Erro ao adicionar veículos');
            }

            toast.success(`${selectedIds.length} veículo(s) adicionado(s) com sucesso!`);

            // Limpar seleção
            setSelectedIds([]);

            // Recarregar lista
            await fetchAvailableVehicles();

            // Notificar sucesso
            onSuccess?.();
        } catch (error) {
            console.error('Error adding vehicles:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro ao adicionar veículos';
            toast.error(errorMessage);
        } finally {
            setIsAdding(false);
        }
    };

    // Filtrar veículos por busca
    const filteredVehicles = availableVehicles.filter(vehicle => {
        const searchLower = searchTerm.toLowerCase();
        return (
            vehicle.make.toLowerCase().includes(searchLower) ||
            vehicle.model.toLowerCase().includes(searchLower) ||
            vehicle.chassisNumber.toLowerCase().includes(searchLower) ||
            vehicle.plateEnd?.toLowerCase().includes(searchLower)
        );
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Campo de busca */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por marca, modelo, chassi ou placa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#111722] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Lista de veículos */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg divide-y divide-slate-200 dark:divide-slate-700 max-h-96 overflow-y-auto">
                {filteredVehicles.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        <Car size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Nenhum veículo disponível encontrado</p>
                    </div>
                ) : (
                    filteredVehicles.map((vehicle) => (
                        <label
                            key={vehicle.id}
                            className="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(vehicle.id)}
                                onChange={() => handleToggleVehicle(vehicle.id)}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />

                            <div className="ml-3 flex-1">
                                <div className="flex items-center gap-2">
                                    {vehicle.images && vehicle.images.length > 0 && (
                                        <img
                                            src={vehicle.images[0].url}
                                            alt={`${vehicle.make} ${vehicle.model}`}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {vehicle.make} {vehicle.model} {vehicle.version}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {vehicle.yearManufacture}/{vehicle.yearModel} • {vehicle.color}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Chassi: {vehicle.chassisNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </label>
                    ))
                )}
            </div>

            {/* Ações */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedIds.length} veículo(s) selecionado(s)
                </p>

                <Button
                    onClick={handleAddVehicles}
                    disabled={selectedIds.length === 0 || isAdding}
                >
                    <Plus size={18} className="mr-2" />
                    {isAdding ? 'Adicionando...' : 'Adicionar ao Leilão'}
                </Button>
            </div>
        </div>
    );
};
