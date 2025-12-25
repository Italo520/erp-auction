import React from 'react';
import { AuctionCard } from './AuctionCard';
import { AuctionListProps } from './auctions.types';

import { Skeleton } from '../../ui/Skeleton/Skeleton';

export const AuctionList: React.FC<AuctionListProps> = ({ auctions, isLoading, onAuctionClick }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-[280px] w-full" />
                ))}
            </div>
        );
    }

    if (auctions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#111722] rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-500 font-medium">Nenhum leilão encontrado.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
                <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onClick={onAuctionClick}
                />
            ))}
        </div>
    );
};
