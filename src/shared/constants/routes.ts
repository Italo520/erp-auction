export const APP_ROUTES = {
  public: {
    LOGIN: '/',
  },
  private: {
    DASHBOARD: '/dashboard',
    AUCTIONS: '/auctions',
    VEHICLE_NEW: '/vehicle/new',
    VEHICLE_DETAILS: (id: string) => `/vehicle/${id}`,
    LIVE_BIDDING: (id: string) => `/live/${id}`,
    SETTINGS: '/settings',
  }
} as const;