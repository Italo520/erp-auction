import { useState, useEffect, useCallback } from 'react';
import { BiddingState } from '@/presentation/components/features/bidding/bidding.types';
import { useRepositories } from '@/core/contexts/RepositoryContext';
import { useAuth } from '@/presentation/hooks/useAuth';
import { toast } from 'sonner';

export function useBidding(auctionId: string) {
    const { bidRepo } = useRepositories();
    const { user } = useAuth();

    const [biddingState, setBiddingState] = useState<BiddingState | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'CONNECTING' | 'CONNECTED' | 'DISCONNECTED'>('CONNECTING');
    const [isPlacingBid, setIsPlacingBid] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Busca os lances do leilão via API
     */
    const fetchBids = useCallback(async () => {
        try {
            setError(null);
            const response = await fetch(`/api/bids/${auctionId}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar lances');
            }

            const result = await response.json();

            if (result.success && result.data) {
                const { bids } = result.data;

                // Construir o estado de bidding
                const currentBid = bids.length > 0 ? bids[0].amount : 0;
                const nextMinimumBid = currentBid + 100; // Incremento mínimo

                const newState: BiddingState = {
                    auctionId,
                    currentBid,
                    nextMinimumBid,
                    lastBidderId: bids.length > 0 ? bids[0].userId : null,
                    lastBidderName: bids.length > 0 ? `User ${bids[0].userId.slice(0, 4)}` : null,
                    status: 'LIVE',
                    endTime: new Date(Date.now() + 3600000), // 1 hora
                    bids: bids.map((bid: any) => ({
                        ...bid,
                        userName: `User ${bid.userId.slice(0, 4)}`,
                    })),
                };

                setBiddingState(newState);
                setConnectionStatus('CONNECTED');
            }
        } catch (err) {
            console.error('Error fetching bids:', err);
            setError('Erro ao carregar lances');
            setConnectionStatus('DISCONNECTED');
        }
    }, [auctionId]);

    // Load initial state
    useEffect(() => {
        if (auctionId) {
            fetchBids();
        }
    }, [auctionId, fetchBids]);

    // Subscribe to Realtime Updates via Repository
    useEffect(() => {
        const unsubscribe = bidRepo.subscribeToAuctionBids(auctionId, (newBid) => {
            setBiddingState(prev => {
                if (!prev) return null;

                // Check if bid is already there to avoid duplicates
                if (prev.bids.some(b => b.id === newBid.id)) return prev;

                return {
                    ...prev,
                    currentBid: newBid.amount > prev.currentBid ? newBid.amount : prev.currentBid,
                    nextMinimumBid: (newBid.amount > prev.currentBid ? newBid.amount : prev.currentBid) + 100,
                    lastBidderId: newBid.userId,
                    lastBidderName: `User ${newBid.userId.slice(0, 4)}`,
                    bids: [{ ...newBid, userName: `User ${newBid.userId.slice(0, 4)}` }, ...prev.bids]
                };
            });
        });

        return () => {
            unsubscribe();
        };
    }, [auctionId, bidRepo]);

    /**
     * Dá um lance via API
     */
    const placeBid = useCallback(async (amount: number) => {
        try {
            setIsPlacingBid(true);
            setError(null);

            // Validação local
            if (!user) {
                toast.error('Você precisa estar logado para dar lances');
                return;
            }

            if (!biddingState) {
                toast.error('Aguarde o carregamento dos dados do leilão');
                return;
            }

            if (amount < biddingState.nextMinimumBid) {
                toast.error(`O lance mínimo é R$ ${biddingState.nextMinimumBid.toFixed(2)}`);
                return;
            }

            // Chamar API
            const response = await fetch('/api/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auctionId,
                    amount,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Erro ao processar lance');
            }

            toast.success('Lance realizado com sucesso!');

            // Atualizar estado localmente (o realtime também vai atualizar)
            // Mas fazemos aqui para feedback imediato
            await fetchBids();

        } catch (err) {
            console.error('Failed to place bid:', err);
            const errorMessage = err instanceof Error ? err.message : 'Erro ao dar lance';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsPlacingBid(false);
        }
    }, [auctionId, user, biddingState, fetchBids]);

    return {
        state: biddingState,
        connectionStatus,
        placeBid,
        isPlacingBid,
        error,
        refetch: fetchBids,
    };
}
