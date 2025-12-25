import { useState, useEffect, useCallback, useMemo } from 'react';
import { useWebSocket } from './useWebSocket';
import { BiddingState, BiddingEvent } from '../components/features/bidding/bidding.types';
import { GetLiveBiddingUseCase } from '../../core/usecases/bidding/GetLiveBiddingUseCase';
import { PlaceBidUseCase } from '../../core/usecases/bidding/PlaceBidUseCase';

export function useBidding(auctionId: string) {
    const [biddingState, setBiddingState] = useState<BiddingState | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'CONNECTING' | 'CONNECTED' | 'DISCONNECTED'>('CONNECTING');

    const getLiveUseCase = useMemo(() => new GetLiveBiddingUseCase(), []);
    const placeBidUseCase = useMemo(() => new PlaceBidUseCase(), []);

    // Load initial state
    useEffect(() => {
        getLiveUseCase.execute(auctionId).then(initialState => {
            setBiddingState(initialState);
            setConnectionStatus('CONNECTED');
        });
    }, [auctionId, getLiveUseCase]);

    const handleEvent = useCallback((event: BiddingEvent) => {
        if (event.type === 'BID_PLACED') {
            setBiddingState(prev => {
                if (!prev) return null;
                // Atualiza estado com novo lance
                return {
                    ...prev,
                    currentBid: event.payload.amount,
                    nextMinimumBid: event.payload.amount + (prev.minimumIncrement || 100), // Usando incremento fixo ou do estado se tivesse
                    lastBidderId: event.payload.userId,
                    lastBidderName: event.payload.userName,
                    bids: [event.payload, ...prev.bids]
                };
            });
        } else if (event.type === 'STATE_UPDATE') {
            setBiddingState(prev => prev ? ({ ...prev, ...event.payload }) : null);
        }
    }, []);

    const ws = useWebSocket(auctionId, handleEvent);

    const placeBid = useCallback(async (amount: number) => {
        // Optimistic update could happen here
        if (ws) {
            ws.placeBid(amount);
        } else {
            await placeBidUseCase.execute(auctionId, amount);
        }
    }, [auctionId, placeBidUseCase, ws]);

    return {
        state: biddingState,
        connectionStatus,
        placeBid
    };
}
