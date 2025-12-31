export interface Bid {
    id: string;
    auctionId: string;
    userId: string;
    userName: string;
    amount: number;
    timestamp: Date;
}

export interface BiddingState {
    auctionId?: string;
    currentBid: number;
    nextMinimumBid: number;
    lastBidderId?: string | null;
    lastBidderName?: string | null;
    endTime?: Date;
    status?: 'WAITING' | 'LIVE' | 'PAUSED' | 'FINISHED';
    bids: Bid[];
}

export type BiddingEvent =
    | { type: 'BID_PLACED'; payload: Bid }
    | { type: 'STATE_UPDATE'; payload: Partial<BiddingState> }
    | { type: 'ERROR'; payload: string };

export type BiddingListener = (event: BiddingEvent) => void;
