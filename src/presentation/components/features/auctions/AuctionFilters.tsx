import React from 'react';
import { Input } from '@/presentation/components/ui/Input/Input';
import { Button } from '@/presentation/components/ui/Button/Button';
import { AuctionFiltersProps } from './auctions.types';
import { Search, Filter } from 'lucide-react';
import { AuctionStatus } from '@/core/entities/Auction';

export const AuctionFilters: React.FC<AuctionFiltersProps> = ({ onSearch, onStatusFilter, currentStatus }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <Input
                    placeholder="Buscar leilões..."
                    leftIcon={<Search size={18} />}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <Button
                    variant={currentStatus === 'ALL' ? 'primary' : 'outline'}
                    onClick={() => onStatusFilter('ALL')}
                    className="whitespace-nowrap"
                >
                    Todos
                </Button>
                <Button
                    variant={currentStatus === AuctionStatus.ACTIVE ? 'primary' : 'outline'}
                    onClick={() => onStatusFilter(AuctionStatus.ACTIVE)}
                    className="whitespace-nowrap"
                >
                    Abertos
                </Button>
                <Button
                    variant={currentStatus === AuctionStatus.SCHEDULED ? 'primary' : 'outline'}
                    onClick={() => onStatusFilter(AuctionStatus.SCHEDULED)}
                    className="whitespace-nowrap"
                >
                    Agendados
                </Button>
                <Button
                    variant={currentStatus === AuctionStatus.FINISHED ? 'primary' : 'outline'}
                    onClick={() => onStatusFilter(AuctionStatus.FINISHED)}
                    className="whitespace-nowrap"
                >
                    Encerrados
                </Button>
            </div>
        </div>
    );
};
