'use client';

import { useEffect, useState } from 'react';
import { realtimeService } from '@/infrastructure/realtime/SupabaseRealtimeService';
import { Bid } from '@/core/entities/Bid';

export function useRealtimeBids(auctionId: string, initialBids: Bid[] = []) {
    const [bids, setBids] = useState<Bid[]>(initialBids);
    const [isConnected, setIsConnected] = useState(false);

    // Mantém o lance mais recente acessível rapidamente
    const latestBid = bids.length > 0 ? bids[0] : null;

    useEffect(() => {
        if (!auctionId) return;

        // Conectar ao canal
        const channel = realtimeService.subscribeToAuctionBids(auctionId, (newBid) => {
            setBids((prev) => {
                // Evitar duplicados
                if (prev.some(b => b.id === newBid.id)) {
                    return prev;
                }

                // Adiciona no topo da lista (mais recente primeiro)
                const updatedBids = [newBid, ...prev];

                // Opcional: Tocar um som de notificação
                try {
                    const audio = new Audio('/sounds/bid-notification.mp3');
                    audio.volume = 0.3;
                    audio.play().catch(() => { }); // Ignora erro se não tiver permissão
                } catch (error) {
                    // Som não disponível, ignorar
                }

                return updatedBids;
            });
        });

        // Monitorar status da conexão
        const checkConnection = setInterval(() => {
            const status = realtimeService.getChannelStatus(`auction-bids-${auctionId}`);
            setIsConnected(status === 'joined');
        }, 1000);

        // Cleanup ao desmontar o componente
        return () => {
            clearInterval(checkConnection);
            realtimeService.unsubscribe(`auction-bids-${auctionId}`);
            setIsConnected(false);
        };
    }, [auctionId]);

    return { bids, latestBid, isConnected, setBids };
}
