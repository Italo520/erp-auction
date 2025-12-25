import { useState, useCallback, useMemo } from 'react';
import { Auction, AuctionStatus } from '@/core/entities/Auction';
import { ListAuctionsUseCase } from '@/core/usecases/auctions/ListAuctionsUseCase';
import { GetAuctionUseCase } from '@/core/usecases/auctions/GetAuctionUseCase';
import { CreateAuctionUseCase } from '@/core/usecases/auctions/CreateAuctionUseCase';
import { AuctionFilterParams } from '@/core/repositories/IAuctionRepository';
import { PaginatedResult } from '@/shared/types/domain.types';
import { useRepositories } from '@/core/contexts/RepositoryContext';

export function useAuctions() {
    const [auctions, setAuctions] = useState<PaginatedResult<Auction> | null>(null);
    const [currentAuction, setCurrentAuction] = useState<Auction | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { auctionRepo } = useRepositories();

    const listUseCase = useMemo(() => new ListAuctionsUseCase(auctionRepo), [auctionRepo]);
    const getUseCase = useMemo(() => new GetAuctionUseCase(auctionRepo), [auctionRepo]);
    const createUseCase = useMemo(() => new CreateAuctionUseCase(auctionRepo), [auctionRepo]);

    const fetchAuctions = useCallback(async (params: AuctionFilterParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await listUseCase.execute(params);
            setAuctions(result);
        } catch (err) {
            setError('Erro ao carregar leilões');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [listUseCase]);

    const getAuction = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const auction = await getUseCase.execute(id);
            setCurrentAuction(auction);
            return auction;
        } catch (err) {
            setError('Erro ao buscar leilão');
            console.error(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [getUseCase]);

    const createAuction = useCallback(async (data: Omit<Auction, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsLoading(true);
        setError(null);
        try {
            const newAuction = await createUseCase.execute(data);
            // Refresh list if needed or return new item
            return newAuction;
        } catch (err) {
            setError('Erro ao criar leilão');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [createUseCase]);

    return {
        auctions,
        currentAuction,
        isLoading,
        error,
        fetchAuctions,
        getAuction,
        createAuction
    };
}
