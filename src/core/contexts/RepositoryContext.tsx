import React, { createContext, useContext, useMemo } from 'react';
import { IAuthRepository } from '../repositories/IAuthRepository';
import { IAuctionRepository } from '../repositories/IAuctionRepository';
import { IVehicleRepository } from '../repositories/IVehicleRepository';
import { IBidRepository } from '../repositories/IBidRepository';

// Infra - Supabase
import { SupabaseAuthRepository } from '../../infrastructure/repositories/SupabaseAuthRepository';
import { SupabaseAuctionRepository } from '../../infrastructure/repositories/SupabaseAuctionRepository';
import { SupabaseVehicleRepository } from '../../infrastructure/repositories/SupabaseVehicleRepository';

// Infra - Mocks
import { MockAuthRepository } from '../../infrastructure/repositories/MockAuthRepository';
import { MockAuctionRepository } from '../../infrastructure/repositories/MockAuctionRepository';
import { MockVehicleRepository } from '../../infrastructure/repositories/MockVehicleRepository';
import { MockBidRepository } from '../../infrastructure/repositories/MockBidRepository';

interface RepositoryContextData {
  authRepo: IAuthRepository;
  auctionRepo: IAuctionRepository;
  vehicleRepo: IVehicleRepository;
  bidRepo: IBidRepository;
}

const RepositoryContext = createContext<RepositoryContextData>({} as RepositoryContextData);

export const RepositoryProvider = ({ children }: { children: React.ReactNode }) => {
  // Use environment variable to toggle mocks (default to false if not set)
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

  const repositories = useMemo(() => {
    if (useMock) {
      console.log('⚠️ Using MOCK Repositories');
      return {
        authRepo: new MockAuthRepository(),
        auctionRepo: new MockAuctionRepository(),
        vehicleRepo: new MockVehicleRepository(),
        bidRepo: new MockBidRepository(),
      };
    }

    console.log('✅ Using REAL Repositories (Supabase)');
    return {
      authRepo: new SupabaseAuthRepository(),
      auctionRepo: new SupabaseAuctionRepository(),
      vehicleRepo: new SupabaseVehicleRepository(),
      bidRepo: new MockBidRepository(), // Maintain MockBid for now as per previous step
    };
  }, [useMock]);

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = () => useContext(RepositoryContext);