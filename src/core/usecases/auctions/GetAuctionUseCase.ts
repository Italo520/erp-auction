import { Auction } from '@/core/entities/Auction';
import { IAuctionRepository } from '@/core/repositories/IAuctionRepository';

export class GetAuctionUseCase {
    constructor(private auctionRepository: IAuctionRepository) { }

    async execute(id: string): Promise<Auction | null> {
        if (!id) throw new Error('Auction ID is required');
        return this.auctionRepository.findById(id);
    }
}
