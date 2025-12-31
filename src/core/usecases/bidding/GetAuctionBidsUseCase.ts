import { Bid } from '@/core/entities/Bid';
import { IBidRepository } from '@/core/repositories/IBidRepository';

/**
 * Use Case para obter todos os lances de um leilão específico
 */
export class GetAuctionBidsUseCase {
    constructor(private bidRepository: IBidRepository) { }

    /**
     * Executa o caso de uso
     * @param auctionId - ID do leilão
     * @returns Lista de lances ordenados por valor decrescente
     */
    async execute(auctionId: string): Promise<Bid[]> {
        if (!auctionId) {
            throw new Error('ID do leilão é obrigatório');
        }

        const bids = await this.bidRepository.findByAuctionId(auctionId);

        // Ordenar por valor decrescente (maior lance primeiro)
        return bids.sort((a, b) => b.amount - a.amount);
    }
}
