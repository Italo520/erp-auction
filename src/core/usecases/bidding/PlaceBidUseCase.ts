import { IBidRepository } from '@/core/repositories/IBidRepository';
import { IAuctionRepository } from '@/core/repositories/IAuctionRepository';
import { AuctionStatus } from '@/core/entities/Auction';
import { Bid } from '@/core/entities/Bid';

export interface PlaceBidInput {
    auctionId: string;
    vehicleId?: string;
    userId: string;
    amount: number;
}

export class PlaceBidUseCase {
    constructor(
        private bidRepo: IBidRepository,
        private auctionRepo: IAuctionRepository
    ) { }

    async execute(input: PlaceBidInput): Promise<Bid> {
        const { auctionId, userId, amount, vehicleId } = input;

        // 1. Validar se o leilão existe
        const auction = await this.auctionRepo.findById(auctionId);
        if (!auction) {
            throw new Error('Leilão não encontrado');
        }

        // 2. Validar status do leilão
        if (auction.status !== AuctionStatus.ACTIVE) {
            throw new Error('Leilão não está ativo');
        }

        // TODO: Validar se o veículo pertence ao leilão (se vehicleId for fornecido)
        // TODO: Validar regras de incremento de lance

        // 3. Criar o lance
        const bid = await this.bidRepo.create({
            auctionId,
            vehicleId: vehicleId || 'unknown', // Fallback temporário
            userId,
            amount,
            channel: 'WEB',
            isCancelled: false
        });

        return bid;
    }
}
