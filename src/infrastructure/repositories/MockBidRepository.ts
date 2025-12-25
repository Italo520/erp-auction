import { IBidRepository } from "../../core/repositories/IBidRepository";
import { Bid } from "../../core/entities/Bid";

const MOCK_BIDS: Bid[] = [
  {
    id: 'bid-1',
    auctionId: 'auction-124',
    vehicleId: '2045',
    userId: 'user-101',
    amount: 85500,
    timestamp: new Date(Date.now() - 120000), // 2 min ago
    channel: 'WEB',
    isCancelled: false
  },
  {
    id: 'bid-2',
    auctionId: 'auction-124',
    vehicleId: '2045',
    userId: 'user-102',
    amount: 85000,
    timestamp: new Date(Date.now() - 300000), // 5 min ago
    channel: 'APP',
    isCancelled: false
  }
];

export class MockBidRepository implements IBidRepository {
  async create(bid: Omit<Bid, "id" | "timestamp">): Promise<Bid> {
    const newBid: Bid = {
      ...bid,
      id: `bid-${Date.now()}`,
      timestamp: new Date(),
    };
    MOCK_BIDS.unshift(newBid); // Add to top
    return newBid;
  }

  async findByVehicleId(vehicleId: string, limit: number = 20): Promise<Bid[]> {
    return MOCK_BIDS
      .filter(b => b.vehicleId === vehicleId && !b.isCancelled)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, limit);
  }

  async findHighestBid(vehicleId: string): Promise<Bid | null> {
    const bids = MOCK_BIDS
      .filter(b => b.vehicleId === vehicleId && !b.isCancelled)
      .sort((a, b) => b.amount - a.amount);
    return bids.length > 0 ? bids[0] : null;
  }

  async findByUserId(userId: string): Promise<Bid[]> {
    return MOCK_BIDS.filter(b => b.userId === userId);
  }

  // Simulação de Realtime
  subscribeToVehicleBids(vehicleId: string, callback: (bid: Bid) => void): () => void {
    console.log(`[MockRealtime] Subscribed to bids for vehicle ${vehicleId}`);
    
    // Simula um novo lance a cada 15-30 segundos para testar a UI
    const interval = setInterval(() => {
      const shouldEmit = Math.random() > 0.5;
      if (shouldEmit) {
        const currentHighest = MOCK_BIDS
            .filter(b => b.vehicleId === vehicleId)
            .sort((a,b) => b.amount - a.amount)[0]?.amount || 50000;
            
        const nextAmount = currentHighest + 500;
        
        const newBid: Bid = {
            id: `bid-auto-${Date.now()}`,
            auctionId: 'auction-124',
            vehicleId,
            userId: 'user-random-' + Math.floor(Math.random() * 100),
            amount: nextAmount,
            timestamp: new Date(),
            channel: 'WEB',
            isCancelled: false
        };
        
        MOCK_BIDS.unshift(newBid);
        callback(newBid);
      }
    }, 15000);

    return () => {
      console.log(`[MockRealtime] Unsubscribed from vehicle ${vehicleId}`);
      clearInterval(interval);
    };
  }
}