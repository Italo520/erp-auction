import React, { createContext, useContext, useMemo } from 'react';
import { IAuthRepository } from '../repositories/IAuthRepository';
import { IAuctionRepository } from '../repositories/IAuctionRepository';
import { IVehicleRepository } from '../repositories/IVehicleRepository';
import { IBidRepository } from '../repositories/IBidRepository';

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
  // Initialize repositories (singleton scope for the app lifetime)
  const repositories = useMemo(() => ({
    authRepo: new MockAuthRepository(),
    auctionRepo: new MockAuctionRepository(),
    vehicleRepo: new MockVehicleRepository(),
    bidRepo: new MockBidRepository(),
  }), []);

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = () => useContext(RepositoryContext);