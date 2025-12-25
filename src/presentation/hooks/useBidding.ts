import { useState, useEffect, useCallback, useMemo } from 'react';
import { BiddingState } from '@/presentation/components/features/bidding/bidding.types';
import { GetLiveBiddingUseCase } from '@/core/usecases/bidding/GetLiveBiddingUseCase';
import { PlaceBidUseCase } from '@/core/usecases/bidding/PlaceBidUseCase';
import { useRepositories } from '@/core/contexts/RepositoryContext';
import { useAuth } from '@/presentation/hooks/useAuth';

export function useBidding(auctionId: string) {
    const { bidRepo } = useRepositories();
    const { user } = useAuth();

    const [biddingState, setBiddingState] = useState<BiddingState | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'CONNECTING' | 'CONNECTED' | 'DISCONNECTED'>('CONNECTING');

    const getLiveUseCase = useMemo(() => new GetLiveBiddingUseCase(), []);
    const placeBidUseCase = useMemo(() => new PlaceBidUseCase(bidRepo), [bidRepo]);

    // Load initial state
    useEffect(() => {
        getLiveUseCase.execute(auctionId).then(initialState => {
            setBiddingState(initialState);
            setConnectionStatus('CONNECTED');
        });
    }, [auctionId, getLiveUseCase]);

    // Subscribe to Realtime Updates via Repository
    useEffect(() => {
        const unsubscribe = bidRepo.subscribeToAuctionBids(auctionId, (newBid) => {
            setBiddingState(prev => {
                if (!prev) return null;
                // Check if bid is already there to avoid duplicates if any
                if (prev.bids.some(b => b.id === newBid.id)) return prev;

                return {
                    ...prev,
                    currentBid: newBid.amount > prev.currentBid ? newBid.amount : prev.currentBid,
                    nextMinimumBid: (newBid.amount > prev.currentBid ? newBid.amount : prev.currentBid) + 100, // Ajuste lógico simples
                    lastBidderId: newBid.userId,
                    lastBidderName: `User ${newBid.userId.slice(0, 4)}`, // Mock name logic if not in bid
                    bids: [newBid, ...prev.bids]
                };
            });
        });

        return () => {
            unsubscribe();
        };
    }, [auctionId, bidRepo]);

    const placeBid = useCallback(async (amount: number) => {
        try {
            // Pass current user ID if available, otherwise 'anon' or throw error
            if (!user) {
                alert("Você precisa estar logado para dar lances.");
                return;
            }
            await placeBidUseCase.execute(auctionId, amount, user.id);
        } catch (error) {
            console.error("Failed to place bid:", error);
        }
    }, [auctionId, placeBidUseCase, user]);

    return {
        state: biddingState,
        connectionStatus, // Com Supabase, assumimos conectado se montado, ou poderíamos monitorar status do canal
        placeBid
    };
}
