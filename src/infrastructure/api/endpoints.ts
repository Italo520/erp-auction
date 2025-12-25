export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  AUCTIONS: {
    LIST: '/auctions',
    DETAIL: (id: string) => `/auctions/${id}`,
    CREATE: '/auctions',
    UPDATE: (id: string) => `/auctions/${id}`,
    DELETE: (id: string) => `/auctions/${id}`,
  },
  VEHICLES: {
    LIST: '/vehicles',
    DETAIL: (id: string) => `/vehicles/${id}`,
    CREATE: '/vehicles',
    UPDATE: (id: string) => `/vehicles/${id}`,
    DELETE: (id: string) => `/vehicles/${id}`,
    UPLOAD_IMAGES: (id: string) => `/vehicles/${id}/images`,
  },
  BIDS: {
    LIST_BY_VEHICLE: (vehicleId: string) => `/vehicles/${vehicleId}/bids`,
    CREATE: '/bids',
  }
} as const;