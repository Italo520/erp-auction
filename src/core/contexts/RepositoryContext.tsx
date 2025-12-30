import React, { createContext, useContext, useMemo } from 'react';
import { IAuthRepository } from '@/core/repositories/IAuthRepository';
import { IAuctionRepository } from '@/core/repositories/IAuctionRepository';
import { IVehicleRepository } from '@/core/repositories/IVehicleRepository';
import { IBidRepository } from '@/core/repositories/IBidRepository';

// Implementations
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { SupabaseAuctionRepository } from '@/infrastructure/repositories/SupabaseAuctionRepository';
import { SupabaseVehicleRepository } from '@/infrastructure/repositories/SupabaseVehicleRepository';
import { SupabaseBidRepository } from '@/infrastructure/repositories/SupabaseBidRepository';

// Mocks
import { MockAuthRepository } from '@/infrastructure/repositories/MockAuthRepository';
import { MockAuctionRepository } from '@/infrastructure/repositories/MockAuctionRepository';
import { MockVehicleRepository } from '@/infrastructure/repositories/MockVehicleRepository';
import { MockBidRepository } from '@/infrastructure/repositories/MockBidRepository';

interface RepositoryContextData {
  authRepo: IAuthRepository;
  auctionRepo: IAuctionRepository;
  vehicleRepo: IVehicleRepository;
  bidRepo: IBidRepository;
}

const RepositoryContext = createContext<RepositoryContextData>({} as RepositoryContextData);

export const RepositoryProvider = ({ children }: { children: React.ReactNode }) => {
  // Use environment variable to toggle mocks (default to false if not set)
  // Also fallback to mocks if Supabase credentials are missing
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true' ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
      bidRepo: new SupabaseBidRepository(),
    };
  }, [useMock]);

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = () => useContext(RepositoryContext);