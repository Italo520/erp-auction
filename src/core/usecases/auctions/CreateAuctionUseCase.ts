import { Auction } from '../../entities/Auction';
import { IAuctionRepository } from '../../repositories/IAuctionRepository';

export class CreateAuctionUseCase {
    constructor(private auctionRepository: IAuctionRepository) { }

    async execute(data: Omit<Auction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Auction> {
        // Validações de negócio aqui (ex: data inicio < fim)
        if (data.startDateTime >= data.endDateTime) {
            throw new Error("A data de término deve ser posterior à data de início.");
        }
        return this.auctionRepository.create(data);
    }
}
