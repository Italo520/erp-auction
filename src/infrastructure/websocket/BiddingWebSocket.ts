import { webSocketManager } from './WebSocketManager';
import { BiddingEvent } from '@/presentation/components/features/bidding/bidding.types';

export class BiddingWebSocket {
    constructor(private auctionId: string) { }

    connect() {
        // URL seria env variable na real
        webSocketManager.connect(`ws://api.erp-auction.com/auctions/${this.auctionId}`);
    }

    disconnect() {
        webSocketManager.disconnect();
    }

    onEvent(callback: (event: BiddingEvent) => void) {
        webSocketManager.subscribe(this.auctionId, callback);
        return () => webSocketManager.unsubscribe(this.auctionId, callback);
    }

    placeBid(amount: number) {
        webSocketManager.send(this.auctionId, { type: 'PLACE_BID', amount });

        // Simula a reposta immediata de sucesso no mock
        // Num real, esperaria o server mandar o BID_PLACED event
        setTimeout(() => {
            webSocketManager.emit(this.auctionId, {
                type: 'BID_PLACED',
                payload: {
                    id: Math.random().toString(36).substr(2, 9),
                    auctionId: this.auctionId,
                    userId: 'me',
                    userName: 'Você',
                    amount: amount,
                    timestamp: new Date()
                }
            });
        }, 200);
    }
}
