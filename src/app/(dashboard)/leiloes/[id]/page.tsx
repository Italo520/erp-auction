'use client';

import React, { use, useState } from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { Card } from '@/presentation/components/ui/Card/Card';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import { VehicleSelector } from '@/presentation/components/features/auctions/VehicleSelector';
import { AuctionVehicleList } from '@/presentation/components/features/auctions/AuctionVehicleList';

interface AuctionDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function AuctionDetailPage({ params }: AuctionDetailPageProps) {
    const router = useRouter();
    const { id } = use(params);

    const [showVehicleSelector, setShowVehicleSelector] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleVehiclesAdded = () => {
        // Atualizar a lista de veículos
        setRefreshKey(prev => prev + 1);
        // Fechar o seletor
        setShowVehicleSelector(false);
    };

    return (
        <Container>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" className="p-2" onClick={() => router.back()}>
                    <ArrowLeft size={20} />
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gerenciar Leilão</h1>
                    <p className="text-slate-500 dark:text-slate-400">Configure os veículos e detalhes do leilão</p>
                </div>
            </div>

            {/* Seção: Veículos do Leilão */}
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    Veículos do Leilão
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Adicione e gerencie os veículos que farão parte deste leilão
                                </p>
                            </div>

                            {!showVehicleSelector && (
                                <Button onClick={() => setShowVehicleSelector(true)}>
                                    <Plus size={18} className="mr-2" />
                                    Adicionar Veículos
                                </Button>
                            )}
                        </div>

                        {/* Seletor de Veículos (quando aberto) */}
                        {showVehicleSelector && (
                            <div className="mb-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                                        Selecionar Veículos
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowVehicleSelector(false)}
                                    >
                                        Fechar
                                    </Button>
                                </div>

                                <VehicleSelector
                                    auctionId={id}
                                    onSuccess={handleVehiclesAdded}
                                />
                            </div>
                        )}

                        {/* Lista de Veículos Associados */}
                        <AuctionVehicleList
                            auctionId={id}
                            refreshKey={refreshKey}
                            onVehiclesChange={(vehicles) => {
                                // Callback opcional para quando a lista mudar
                                console.log(`Leilão tem ${vehicles.length} veículos`);
                            }}
                        />
                    </div>
                </Card>

                {/* Outras seções podem ser adicionadas aqui */}
                {/* Por exemplo: Configurações do Leilão, Data/Hora, etc. */}

                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            Configurações do Leilão
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300">
                            Outras configurações do leilão serão implementadas aqui.
                        </p>
                    </div>
                </Card>
            </div>
        </Container>
    );
}
