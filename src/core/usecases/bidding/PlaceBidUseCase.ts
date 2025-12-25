import { BiddingWebSocket } from '../../../infrastructure/websocket/BiddingWebSocket';

export class PlaceBidUseCase {
    async execute(auctionId: string, amount: number): Promise<void> {
        const ws = new BiddingWebSocket(auctionId);
        // Em uma arquitetura real, o WS seria injetado ou singleton gerenciado
        ws.placeBid(amount);
    }
}
