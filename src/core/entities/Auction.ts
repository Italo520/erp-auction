import { Vehicle } from "./Vehicle";

export enum AuctionStatus {
  SCHEDULED = 'SCHEDULED', // Agendado
  ACTIVE = 'ACTIVE',       // Em andamento (Ao vivo)
  PAUSED = 'PAUSED',       // Pausado administrativamente
  FINISHED = 'FINISHED',   // Finalizado
  CANCELLED = 'CANCELLED'  // Cancelado
}

export interface Auction {
  id: string;
  title: string;
  description?: string;
  status: AuctionStatus;
  
  scheduledStartTime: Date;
  actualStartTime?: Date;
  endTime?: Date;
  
  location?: string; // Online, Presencial ou Híbrido
  
  itemsCount?: number;
  totalEstimatedValue?: number;
  
  // Relacionamentos (Opcional no carregamento da lista)
  vehicles?: Vehicle[];
  
  createdAt: Date;
  updatedAt: Date;
}