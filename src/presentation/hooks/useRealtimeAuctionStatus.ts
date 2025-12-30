'use client';

import { useEffect, useState } from 'react';
import { realtimeService } from '@/infrastructure/realtime/SupabaseRealtimeService';
import { AuctionStatus } from '@/core/entities/Auction';

export function useRealtimeAuctionStatus(auctionId: string, initialStatus?: AuctionStatus) {
    const [status, setStatus] = useState<AuctionStatus | undefined>(initialStatus);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!auctionId) return;

        // Conectar ao canal
        realtimeService.subscribeToAuctionStatus(auctionId, (newStatus) => {
            console.log(`Status alterado: ${status} → ${newStatus}`);
            setStatus(newStatus as AuctionStatus);
        });

        // Monitorar status da conexão
        const checkConnection = setInterval(() => {
            const channelStatus = realtimeService.getChannelStatus(`auction-status-${auctionId}`);
            setIsConnected(channelStatus === 'joined');
        }, 1000);

        // Cleanup ao desmontar
        return () => {
            clearInterval(checkConnection);
            realtimeService.unsubscribe(`auction-status-${auctionId}`);
            setIsConnected(false);
        };
    }, [auctionId, status]);

    const isActive = status === 'ACTIVE';
    const isPaused = status === 'PAUSED';
    const isFinished = status === 'FINISHED';

    return {
        status,
        isActive,
        isPaused,
        isFinished,
        isConnected
    };
}
