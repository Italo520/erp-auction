export const APP_ROUTES = {
  public: {
    LOGIN: '/',
  },
  private: {
    DASHBOARD: '/dashboard',
    AUCTIONS: '/leiloes',
    VEHICLE_NEW: '/veiculos/novo',
    VEHICLE_DETAILS: (id: string) => `/veiculos/${id}`,
    LIVE_BIDDING: (id: string) => `/live/${id}`,
    SETTINGS: '/configuracoes',
  }
} as const;