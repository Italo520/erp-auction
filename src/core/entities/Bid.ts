export interface Bid {
  id: string;
  auctionId: string;
  vehicleId: string;
  userId: string;
  
  amount: number;
  timestamp: Date;
  
  // Metadados do lance
  channel: 'WEB' | 'APP' | 'FLOOR'; // Origem do lance
  ipAddress?: string;
  isCancelled: boolean;
}