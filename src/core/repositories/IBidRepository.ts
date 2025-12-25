import { Bid } from "../entities/Bid";

export interface IBidRepository {
  create(bid: Omit<Bid, 'id' | 'timestamp'>): Promise<Bid>;

  // Para exibir o histórico em tempo real
  findByVehicleId(vehicleId: string, limit?: number): Promise<Bid[]>;

  // Para determinar o vencedor atual
  findHighestBid(vehicleId: string): Promise<Bid | null>;

  // Para perfil do usuário
  findByUserId(userId: string): Promise<Bid[]>;

  // Realtime subscription (abstração conceitual)
  subscribeToVehicleBids(vehicleId: string, callback: (bid: Bid) => void): () => void;
  // Para sala de lances da audição
  subscribeToAuctionBids(auctionId: string, callback: (bid: Bid) => void): () => void;
}