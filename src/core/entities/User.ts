export type UserRole = 'ADMIN' | 'AUCTIONEER' | 'BIDDER' | 'AUDITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Dados específicos para licitantes (KYC)
  documentId?: string; // CPF/CNPJ
  isVerified?: boolean;
}