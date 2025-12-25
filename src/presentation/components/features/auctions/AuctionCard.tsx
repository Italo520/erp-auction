import React from 'react';
import { Auction } from '../../../../../core/entities/Auction';
import { Card } from '../../ui/Card/Card';
import { cn } from '../../../../../shared/utils/cn';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../../../shared/utils/formatters';
import { AuctionCardProps } from './auctions.types';

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onClick }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case 'Closed': return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
            case 'DRAFT': return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
            default: return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        }
    };

    const getStatusLabel = (status: string) => {
        // Mapeamento simples, idealmente viria de um arquivo de constantes/i18n
        const map: Record<string, string> = {
            'OPEN': 'Aberto',
            'CLOSED': 'Fechado',
            'DRAFT': 'Rascunho',
            'SCHEDULED': 'Agendado',
            'PAUSED': 'Pausado'
        };
        return map[status] || status;
    }

    return (
        <Card
            className="cursor-pointer hover:shadow-md transition-shadow duration-200 group"
            onClick={() => onClick?.(auction.id)}
        >
            <div className="flex justify-between items-start mb-4">
                <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase",
                    getStatusColor(auction.status)
                )}>
                    {getStatusLabel(auction.status)}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                    #{auction.id.slice(0, 8)}
                </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                {auction.name}
            </h3>

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span>{formatDate(auction.startDateTime)}</span>
                </div>
                {auction.location && (
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-slate-400" />
                        <span>{auction.location}</span>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="text-xs text-slate-500">
                    Itens: <span className="font-semibold text-slate-900 dark:text-white">12</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-xs text-slate-400">Total Estimado</span>
                    <span className="text-sm font-bold text-primary">R$ --</span>
                </div>
            </div>
        </Card>
    );
};
