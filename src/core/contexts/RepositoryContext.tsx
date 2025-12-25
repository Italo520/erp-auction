import React, { createContext, useContext, useMemo } from 'react';
import { IAuthRepository } from '../repositories/IAuthRepository';
import { IAuctionRepository } from '../repositories/IAuctionRepository';
import { IVehicleRepository } from '../repositories/IVehicleRepository';
import { IBidRepository } from '../repositories/IBidRepository';

import { SupabaseAuthRepository } from '../../infrastructure/repositories/SupabaseAuthRepository';
import { SupabaseAuctionRepository } from '../../infrastructure/repositories/SupabaseAuctionRepository';
import { SupabaseVehicleRepository } from '../../infrastructure/repositories/SupabaseVehicleRepository';
import { MockBidRepository } from '../../infrastructure/repositories/MockBidRepository'; // Bid ainda é mock até o WebSocket ser 100% integrado

interface RepositoryContextData {
  authRepo: IAuthRepository;
  auctionRepo: IAuctionRepository;
  vehicleRepo: IVehicleRepository;
  bidRepo: IBidRepository;
}

const RepositoryContext = createContext<RepositoryContextData>({} as RepositoryContextData);

export const RepositoryProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize repositories (singleton scope for the app lifetime)
  const repositories = useMemo(() => ({
    authRepo: new SupabaseAuthRepository(),
    auctionRepo: new SupabaseAuctionRepository(),
    vehicleRepo: new SupabaseVehicleRepository(),
    bidRepo: new MockBidRepository(),
  }), []);

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = () => useContext(RepositoryContext);