import { IVehicleRepository, VehicleFilterParams } from "@/core/repositories/IVehicleRepository";
import { Vehicle } from "@/core/entities/Vehicle";
import { PaginatedResult } from "@/shared/types/domain.types";

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '2045',
    auctionId: 'auction-124',
    lotNumber: '124',
    make: 'Toyota',
    model: 'Corolla',
    version: 'XEi 2.0 Flex',
    yearManufacture: 2020,
    yearModel: 2021,
    color: 'Prata',
    fuel: 'FLEX',
    transmission: 'AUTOMATIC',
    mileage: 45320,
    chassisNumber: '9BRBD48...',
    status: 'PUBLISHED',
    initialBid: 70000,
    currentBid: 85500,
    minimumIncrement: 500,
    images: [
      { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWkFtyzRtIKJMWHnpjM84ViDteXM25ystnFBAND8HI-jljLRlNO7EGPo_rJmJmcYbIDQ41N07DMh7IiWooSEhYTM2PzVsNJIgrGh5P9yX6JjbsUtOTH5U_5lhFzoMY4HVkWpMsIUrDmhKgDKSpvtL4Gr4H117y7t7yNkaSfLJvqBZfhBiP0KgiFhi7YSVh84dZyKAs98j0lG6ijNSfRCFWMcHg6WjhqeSuL09VJBf7e5Ab6953-IdewS_oIqmK-Lx0KvkO35BK41Pm', isCover: true, order: 1 }
    ],
    locationCity: 'João Pessoa',
    locationState: 'PB',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2046',
    auctionId: 'auction-124',
    lotNumber: '125',
    make: 'Honda',
    model: 'Civic',
    version: 'Touring 1.5 Turbo',
    yearManufacture: 2019,
    yearModel: 2020,
    color: 'Branco',
    fuel: 'GASOLINE',
    transmission: 'AUTOMATIC',
    mileage: 32100,
    chassisNumber: '93HCV...',
    status: 'PUBLISHED',
    initialBid: 90000,
    currentBid: 112000,
    minimumIncrement: 1000,
    images: [
      { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD1huaiZU3h-mdUm75pgOfyT7gX5-SIvXmZxB_QyB22NirwT3gWgsHWwD1dQ5OyZSYl-6ai8jmVqwWTJXwpFox5r8jfH7o7uEPdmdhFNyHcAFoBe-LI9CTCdQojeEIEZ_ugM-9S-gNga1Y1cWQ0klgX4uw8hB3Nuf4IFE6Sfr-zzWQ8ArtweZrILHrj6RrXjCoaCkmhRnkfY3KfUPQV2oKceGzAzl9_EvLakHW5GXd-_2FGjlHIEk0CEO_tFSCHL9X0iezE93bWKpf', isCover: true, order: 1 }
    ],
    locationCity: 'Recife',
    locationState: 'PE',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class MockVehicleRepository implements IVehicleRepository {
  async create(vehicle: Omit<Vehicle, "id" | "createdAt" | "updatedAt">): Promise<Vehicle> {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Math.floor(Math.random() * 10000).toString(),
      images: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    MOCK_VEHICLES.push(newVehicle);
    return newVehicle;
  }

  async findById(id: string): Promise<Vehicle | null> {
    return MOCK_VEHICLES.find(v => v.id === id) || null;
  }

  async findAll(params: VehicleFilterParams): Promise<PaginatedResult<Vehicle>> {
    let filtered = [...MOCK_VEHICLES];

    if (params.auctionId) {
      filtered = filtered.filter(v => v.auctionId === params.auctionId);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(v =>
        v.model.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.lotNumber?.includes(q)
      );
    }

    return {
      data: filtered,
      total: filtered.length,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(filtered.length / params.limit)
    };
  }

  async update(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const index = MOCK_VEHICLES.findIndex(v => v.id === id);
    if (index === -1) throw new Error("Vehicle not found");

    MOCK_VEHICLES[index] = { ...MOCK_VEHICLES[index], ...data, updatedAt: new Date() };
    return MOCK_VEHICLES[index];
  }

  async delete(id: string): Promise<void> {
    const index = MOCK_VEHICLES.findIndex(v => v.id === id);
    if (index !== -1) MOCK_VEHICLES.splice(index, 1);
  }

  async addImages(vehicleId: string, imageUrls: string[]): Promise<void> {
    const vehicle = MOCK_VEHICLES.find(v => v.id === vehicleId);
    if (vehicle) {
      const startOrder = vehicle.images.length + 1;
      const newImages = imageUrls.map((url, i) => ({
        id: Math.random().toString(),
        url,
        isCover: vehicle.images.length === 0 && i === 0,
        order: startOrder + i
      }));
      vehicle.images.push(...newImages);
    }
  }

  async setCoverImage(vehicleId: string, imageId: string): Promise<void> {
    const vehicle = MOCK_VEHICLES.find(v => v.id === vehicleId);
    if (vehicle) {
      vehicle.images.forEach(img => {
        img.isCover = img.id === imageId;
      });
    }
  }
}