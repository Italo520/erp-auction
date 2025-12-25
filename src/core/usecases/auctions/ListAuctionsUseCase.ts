import { Auction } from '@/core/entities/Auction';
import { IAuctionRepository, AuctionFilterParams } from '@/core/repositories/IAuctionRepository';
import { PaginatedResult } from '@/shared/types/domain.types';

export class ListAuctionsUseCase {
    constructor(private auctionRepository: IAuctionRepository) { }

    async execute(params: AuctionFilterParams): Promise<PaginatedResult<Auction>> {
        return this.auctionRepository.findAll(params);
    }
}
