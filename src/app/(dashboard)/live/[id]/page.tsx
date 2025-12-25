'use client';

import React, { use } from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { useBidding } from '@/presentation/hooks/useBidding';
import { BidPanel } from '@/presentation/components/features/bidding/BidPanel';
import { BidHistory } from '@/presentation/components/features/bidding/BidHistory';
import { VehicleGallery } from '@/presentation/components/features/vehicles/VehicleGallery';
import { VehicleInfo } from '@/presentation/components/features/vehicles/VehicleInfo';
import { VehicleSpecs } from '@/presentation/components/features/vehicles/VehicleSpecs';
import { useVehicles } from '@/presentation/hooks/useVehicles'; // Reusar para dados estáticos do veículo
import { Button } from '@/presentation/components/ui/Button/Button';
import { Spinner } from '@/presentation/components/ui/Spinner/Spinner';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LivePageProps {
    params: Promise<{
        id: string; // Auction ID or Vehicle ID? Assuming AuctionID contains Vehicle info normally. But let's assume params.id is auctionId.
    }>;
}

export default function LiveBiddingPage({ params }: LivePageProps) {
    const router = useRouter();
    const { id } = use(params);
    const { state: biddingState, connectionStatus, placeBid } = useBidding(id);

    // Como não temos endpoint real que cruza vehicle-auction ainda, vou usar um mock de vehicleId ou buscar o veículo
    // que o leilão se refere. Para simplificar o mock, vou pegar um veículo fixo ou buscar se tivesse ID.
    // Vou usar o hook useVehicles só para mostrar algo, assumindo que conseguimos o ID do carro.
    // Num cenário real, GetLiveBiddingUseCase retornaria detalhes do item leiloado também.

    const { currentVehicle, getVehicle } = useVehicles();

    React.useEffect(() => {
        // Mock: buscando um veículo qualquer para ilustrar, ja que o bidding state só tem números
        getVehicle('mock-vehicle-id');
    }, [getVehicle]);

    if (!biddingState) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0d121c]">
                <div className="text-center">
                    <Spinner size="lg" className="mx-auto mb-4" />
                    <p className="text-slate-500">Conectando ao leilão ao vivo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0d121c]">
            {/* Header simplificado para foco */}
            <header className="bg-white dark:bg-[#111722] border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-30">
                <Container className="py-0 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft size={20} className="mr-2" />
                        Sair do Leilão
                    </Button>
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold animate-pulse">
                        AO VIVO
                    </div>
                </Container>
            </header>

            <Container fluid className="max-w-[1600px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
                    {/* Coluna Esquerda: Mídia e Detalhes do Carro */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Video Stream Placeholder (Gallery por enquanto) */}
                        <div className="bg-black aspect-video rounded-xl overflow-hidden relative group">
                            {/* Se tivesse vídeo real: <video ... /> */}
                            <div className="absolute inset-0 flex items-center justify-center text-white/50">
                                <p>Transmissão de Vídeo Simulada</p>
                            </div>
                            {/* Overlay de imagem do carro se não houver video */}
                            {currentVehicle?.images?.[0] && (
                                <img
                                    src={currentVehicle.images[0].url}
                                    className="w-full h-full object-cover opacity-50"
                                    alt="Live feed background"
                                />
                            )}
                        </div>
                    </div>

                    {/* Coluna Direita: Painel de Lances e Histórico */}
                    <div className="lg:col-span-4 flex flex-col gap-4 h-[calc(100vh-140px)] sticky top-24">
                        <BidPanel
                            state={biddingState}
                            connectionStatus={connectionStatus}
                            onPlaceBid={placeBid}
                        />

                        <BidHistory bids={biddingState.bids} />
                    </div>

                    {/* Linha abaixo: Detalhes completos do veículo */}
                    <div className="lg:col-span-8 space-y-6">
                        {currentVehicle && <VehicleInfo vehicle={currentVehicle} />}
                        {currentVehicle && <VehicleSpecs vehicle={currentVehicle} />}
                    </div>
                </div>
            </Container>
        </div>
    );
}
