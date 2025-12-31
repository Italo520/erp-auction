import { Vehicle } from "./Vehicle";

export enum AuctionStatus {
  DRAFT = 'DRAFT',         // Rascunho
  SCHEDULED = 'SCHEDULED', // Agendado
  ACTIVE = 'ACTIVE',       // Em andamento (Ao vivo)
  PAUSED = 'PAUSED',       // Pausado administrativamente
  FINISHED = 'FINISHED',   // Finalizado
  CANCELLED = 'CANCELLED'  // Cancelado
}

export interface Auction {
  id: string;

  // Alterado de 'title' para 'name' para bater com o banco e repositório
  name: string;
  description?: string;
  status: AuctionStatus;

  // Alterado de 'scheduledStartTime' para 'startDateTime'
  startDateTime: Date;

  // Alterado de 'endTime?' para 'endDateTime' (obrigatório para lógica de validação)
  endDateTime: Date;

  termsConditions?: string;
  location?: string; // Online, Presencial ou Híbrido

  itemsCount?: number;
  totalEstimatedValue?: number;

  // Relacionamentos
  items?: any[];
  vehicles?: Vehicle[];

  createdAt: Date;
  updatedAt: Date;
}