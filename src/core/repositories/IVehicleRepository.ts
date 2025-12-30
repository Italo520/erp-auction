import { Vehicle, VehicleStatus } from "@/core/entities/Vehicle";
import { PaginatedResult, PaginationParams } from "@/shared/types/domain.types";

export interface VehicleFilterParams extends PaginationParams {
  auctionId?: string;
  status?: VehicleStatus;
  make?: string;
  model?: string;
  yearRange?: { min: number; max: number };
  search?: string;
}

export interface IVehicleRepository {
  create(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle | null>;
  findAll(params: VehicleFilterParams): Promise<PaginatedResult<Vehicle>>;
  update(id: string, data: Partial<Vehicle>): Promise<Vehicle>;
  delete(id: string): Promise<void>;

  // Gestão de Mídia
  addImages(vehicleId: string, imageUrls: string[]): Promise<void>;
  setCoverImage(vehicleId: string, imageId: string): Promise<void>;

  // Gestão de Leilões
  findAvailableVehicles(): Promise<Vehicle[]>; // Veículos sem leilão associado
}