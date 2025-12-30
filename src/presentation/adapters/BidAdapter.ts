import { Bid as CoreBid } from '@/core/entities/Bid';
import { Bid as PresentationBid } from '@/presentation/components/features/bidding/bidding.types';

export class BidAdapter {
    static toCoreArray(bids: PresentationBid[]): CoreBid[] {
        return bids.map(bid => ({
            id: bid.id,
            auctionId: bid.auctionId,
            userId: bid.userId,
            amount: bid.amount,
            timestamp: bid.timestamp,
            // Campos obrigatórios no Core que não existem no Presentation
            vehicleId: '', // Será preenchido pelo contexto se necessário
            channel: 'WEB' as const,
            isCancelled: false
        }));
    }

    static toPresentation(bid: CoreBid, userName: string = 'Usuário'): PresentationBid {
        return {
            id: bid.id,
            auctionId: bid.auctionId,
            userId: bid.userId,
            userName: userName, // Core não tem userName, precisa vir de fora
            amount: bid.amount,
            timestamp: bid.timestamp
        };
    }
}
