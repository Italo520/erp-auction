import { Auction, AuctionStatus } from '@/core/entities/Auction';

export interface AuctionCardProps {
    auction: Auction;
    onClick?: (id: string) => void;
}

export interface AuctionFiltersProps {
    onSearch: (term: string) => void;
    onStatusFilter: (status: AuctionStatus | 'ALL') => void;
    currentStatus: AuctionStatus | 'ALL';
}

export interface AuctionListProps {
    auctions: Auction[];
    isLoading?: boolean;
    onAuctionClick?: (id: string) => void;
}
