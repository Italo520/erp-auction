import { Auction, AuctionStatus } from "../entities/Auction";
import { PaginatedResult, PaginationParams } from "../../shared/types/domain.types";

export interface AuctionFilterParams extends PaginationParams {
  status?: AuctionStatus;
  search?: string;
  dateRange?: { start: Date; end: Date };
}

export interface IAuctionRepository {
  create(auction: Omit<Auction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Auction>;
  findById(id: string): Promise<Auction | null>;
  findAll(params: AuctionFilterParams): Promise<PaginatedResult<Auction>>;
  update(id: string, data: Partial<Auction>): Promise<Auction>;
  delete(id: string): Promise<void>;
  
  // Métodos específicos de negócio
  findActiveAuctions(): Promise<Auction[]>;
}