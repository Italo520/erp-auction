export type VehicleStatus = 'DRAFT' | 'PUBLISHED' | 'SOLD' | 'UNSOLD' | 'WITHDRAWN';
export type FuelType = 'GASOLINE' | 'ETHANOL' | 'DIESEL' | 'FLEX' | 'HYBRID' | 'ELECTRIC';
export type TransmissionType = 'MANUAL' | 'AUTOMATIC' | 'CVT' | 'AUTOMATED';

export interface VehicleImage {
  id: string;
  url: string;
  isCover: boolean;
  order?: number;
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
  doors?: number;
  engineNumber?: string;
  chassisNumber: string; // VIN
  renavam?: string;
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

/**
 * Valida os dados de um veículo
 * @param vehicle - Dados parciais ou completos do veículo
 * @throws Error se a validação falhar
 */
export const validateVehicle = (vehicle: Partial<Vehicle>): void => {
  const errors: string[] = [];

  // Validação de imagens (obrigatório ao menos 1)
  if (!vehicle.images || vehicle.images.length === 0) {
    errors.push('É obrigatório adicionar pelo menos uma imagem do veículo.');
  }

  // Validação de campos obrigatórios
  if (!vehicle.make) errors.push('Marca é obrigatória.');
  if (!vehicle.model) errors.push('Modelo é obrigatório.');
  if (!vehicle.chassisNumber) errors.push('Número do chassi é obrigatório.');

  if (errors.length > 0) {
    throw new Error(errors.join(' '));
  }
};

/**
 * Valida especificamente as imagens de um veículo
 * @param images - Array de imagens do veículo
 * @throws Error se não houver pelo menos uma imagem
 */
export const validateVehicleImages = (images?: VehicleImage[]): void => {
  if (!images || images.length === 0) {
    throw new Error('É obrigatório adicionar pelo menos uma imagem do veículo.');
  }
};