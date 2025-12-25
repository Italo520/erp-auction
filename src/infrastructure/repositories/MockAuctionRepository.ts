import { IAuctionRepository, AuctionFilterParams } from "../../core/repositories/IAuctionRepository";
import { Auction, AuctionStatus } from "../../core/entities/Auction";
import { PaginatedResult } from "../../shared/types/domain.types";

const MOCK_AUCTIONS: Auction[] = [
  {
    id: 'auction-124',
    title: 'Leilão de Veículos Recuperados #124',
    description: 'Grande oportunidade de veículos recuperados de financiamento.',
    status: AuctionStatus.ACTIVE,
    scheduledStartTime: new Date(),
    actualStartTime: new Date(),
    location: 'Online',
    itemsCount: 45,
    totalEstimatedValue: 1200000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'auction-125',
    title: 'Leilão de Luxo - Frota Executiva',
    status: AuctionStatus.SCHEDULED,
    scheduledStartTime: new Date(Date.now() + 86400000), // Amanhã
    location: 'Híbrido - São Paulo',
    itemsCount: 12,
    totalEstimatedValue: 3500000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'auction-123',
    title: 'Leilão de Motocicletas',
    status: AuctionStatus.FINISHED,
    scheduledStartTime: new Date(Date.now() - 86400000), // Ontem
    endTime: new Date(Date.now() - 80000000),
    itemsCount: 150,
    totalEstimatedValue: 800000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class MockAuctionRepository implements IAuctionRepository {
  async create(auction: Omit<Auction, "id" | "createdAt" | "updatedAt">): Promise<Auction> {
    const newAuction: Auction = {
      ...auction,
      id: `auction-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    MOCK_AUCTIONS.push(newAuction);
    return newAuction;
  }

  async findById(id: string): Promise<Auction | null> {
    return MOCK_AUCTIONS.find(a => a.id === id) || null;
  }

  async findAll(params: AuctionFilterParams): Promise<PaginatedResult<Auction>> {
    let filtered = [...MOCK_AUCTIONS];
    
    if (params.status) {
      filtered = filtered.filter(a => a.status === params.status);
    }
    
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(q));
    }

    return {
      data: filtered,
      total: filtered.length,
      page: params.page,
      perPage: params.perPage,
      totalPages: Math.ceil(filtered.length / params.perPage)
    };
  }

  async update(id: string, data: Partial<Auction>): Promise<Auction> {
    const index = MOCK_AUCTIONS.findIndex(a => a.id === id);
    if (index === -1) throw new Error("Auction not found");
    
    MOCK_AUCTIONS[index] = { ...MOCK_AUCTIONS[index], ...data, updatedAt: new Date() };
    return MOCK_AUCTIONS[index];
  }

  async delete(id: string): Promise<void> {
    const index = MOCK_AUCTIONS.findIndex(a => a.id === id);
    if (index !== -1) {
      MOCK_AUCTIONS.splice(index, 1);
    }
  }

  async findActiveAuctions(): Promise<Auction[]> {
    return MOCK_AUCTIONS.filter(a => a.status === AuctionStatus.ACTIVE);
  }
}