import { useRef, useEffect } from 'react';
import { BiddingWebSocket } from '../../infrastructure/websocket/BiddingWebSocket';
import { BiddingEvent } from '../components/features/bidding/bidding.types';

export function useWebSocket(auctionId: string, onEvent: (event: BiddingEvent) => void) {
    const wsRef = useRef<BiddingWebSocket | null>(null);

    useEffect(() => {
        if (!auctionId) return;

        wsRef.current = new BiddingWebSocket(auctionId);
        wsRef.current.connect();

        const unsubscribe = wsRef.current.onEvent(onEvent);

        return () => {
            unsubscribe();
            wsRef.current?.disconnect();
        };
    }, [auctionId, onEvent]);

    return wsRef.current;
}
