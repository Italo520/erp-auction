import { IAuctionRepository, AuctionFilterParams } from '@/core/repositories/IAuctionRepository';
import { Auction, AuctionStatus } from '@/core/entities/Auction';
import { PaginatedResult } from '@/shared/types/domain.types';

export class MockAuctionRepository implements IAuctionRepository {
  private auctions: Auction[] = [
    {
      id: 'auction-124',
      name: 'Leilão de Veículos Recuperados #124',
      description: 'Grande oportunidade de veículos recuperados de financiamento.',
      status: AuctionStatus.ACTIVE,
      startDateTime: new Date(), // Ajustado de scheduledStartTime para startDateTime
      endDateTime: new Date(Date.now() + 86400000), // +1 dia
      termsConditions: 'Termos padrão...',
      location: 'São Paulo - SP',
      itemsCount: 15,
      totalEstimatedValue: 450000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'auction-125',
      name: 'Leilão de Luxo e Esportivos',
      description: 'Veículos de alta gama com baixa quilometragem.',
      status: AuctionStatus.SCHEDULED,
      startDateTime: new Date(Date.now() + 172800000), // +2 dias
      endDateTime: new Date(Date.now() + 259200000), // +3 dias
      termsConditions: 'Termos especiais para luxo...',
      location: 'Online',
      itemsCount: 8,
      totalEstimatedValue: 1200000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async create(auction: Omit<Auction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Auction> {
    const newAuction: Auction = {
      ...auction,
      id: `auction-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.auctions.push(newAuction);
    return newAuction;
  }

  async findById(id: string): Promise<Auction | null> {
    return this.auctions.find(a => a.id === id) || null;
  }

  async findAll(params: AuctionFilterParams): Promise<PaginatedResult<Auction>> {
    let filtered = this.auctions;

    if (params.status) {
      filtered = filtered.filter(a => a.status === params.status);
    }
    if (params.search) {
      filtered = filtered.filter(a => a.name.toLowerCase().includes(params.search!.toLowerCase()));
    }

    const start = (params.page - 1) * params.limit;
    const data = filtered.slice(start, start + params.limit);

    return {
      data,
      total: filtered.length,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(filtered.length / params.limit)
    };
  }

  async update(id: string, data: Partial<Auction>): Promise<Auction> {
    const index = this.auctions.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Auction not found');

    this.auctions[index] = { ...this.auctions[index], ...data, updatedAt: new Date() };
    return this.auctions[index];
  }

  async delete(id: string): Promise<void> {
    this.auctions = this.auctions.filter(a => a.id !== id);
  }

  async findActiveAuctions(): Promise<Auction[]> {
    return this.auctions.filter(a => a.status === AuctionStatus.ACTIVE);
  }
}