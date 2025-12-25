export interface NavItem {
  icon: string;
  label: string;
  path: string;
  badge?: number;
}

export enum AuctionStatus {
  ACTIVE = 'Active',
  SCHEDULED = 'Scheduled',
  FINISHED = 'Finished',
  PAUSED = 'Paused'
}

export interface Vehicle {
  id: string;
  name: string;
  details: string;
  image: string;
  price: number;
  status: AuctionStatus;
  timeLeft?: string;
}
