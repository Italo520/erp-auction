export type VehicleStatus = 'DRAFT' | 'PUBLISHED' | 'SOLD' | 'UNSOLD' | 'WITHDRAWN';
export type FuelType = 'GASOLINE' | 'ETHANOL' | 'DIESEL' | 'FLEX' | 'HYBRID' | 'ELECTRIC';
export type TransmissionType = 'MANUAL' | 'AUTOMATIC' | 'CVT' | 'AUTOMATED';

export interface VehicleImage {
  id: string;
  url: string;
  isCover: boolean;
  order: number;
}

export interface Vehicle {
  id: string;
  auctionId?: string; // Vinculado a qual leilão
  lotNumber?: string; // Número do lote
  
  // Informações Básicas
  make: string;      // Marca (Toyota)
  model: string;     // Modelo (Corolla)
  version: string;   // Versão (XEi 2.0)
  yearManufacture: number;
  yearModel: number;
  
  // Detalhes Técnicos
  color: string;
  fuel: FuelType;
  transmission: TransmissionType;
  mileage: number;
  engineNumber?: string;
  chassisNumber: string; // VIN
  plateEnd?: string; // Final da placa
  
  // Estado e Financeiro
  status: VehicleStatus;
  initialBid: number;
  minimumIncrement: number;
  currentBid?: number;
  
  // Mídia
  images: VehicleImage[];
  
  // Metadados
  description?: string;
  locationCity?: string;
  locationState?: string;
  
  createdAt: Date;
  updatedAt: Date;
}