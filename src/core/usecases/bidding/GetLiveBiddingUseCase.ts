import { BiddingState } from '../../../presentation/components/features/bidding/bidding.types';

export class GetLiveBiddingUseCase {
    async execute(auctionId: string): Promise<BiddingState> {
        // Mock initial state
        return {
            currentBid: 55000,
            nextMinimumBid: 55500,
            lastBidderName: 'João Silva',
            endTime: new Date(Date.now() + 1000 * 60 * 15), // 15 min
            status: 'LIVE',
            bids: [
                { id: '1', auctionId, userId: 'u1', userName: 'João Silva', amount: 55000, timestamp: new Date(Date.now() - 10000) },
                { id: '2', auctionId, userId: 'u2', userName: 'Maria Santos', amount: 54500, timestamp: new Date(Date.now() - 30000) },
            ]
        };
    }
}
