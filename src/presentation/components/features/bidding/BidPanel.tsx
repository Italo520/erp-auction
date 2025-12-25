import React from 'react';
import { BiddingState } from './bidding.types';
import { BidInput } from './BidInput';
import { LiveIndicator } from './LiveIndicator';
import { formatCurrency } from '@/shared/utils/formatters';
import { Clock } from 'lucide-react';

interface BidPanelProps {
    state: BiddingState;
    connectionStatus: 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED';
    onPlaceBid: (amount: number) => void;
}

export const BidPanel: React.FC<BidPanelProps> = ({ state, connectionStatus, onPlaceBid }) => {
    // Timer de exemplo (poderia ser um hook separado useCountDown)
    // Como é mock, vamos apenas mostrar o tempo restante simulado ou string fixa

    return (
        <div className="bg-white dark:bg-[#111722] rounded-xl border-2 border-primary/20 p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative">
                <LiveIndicator status={state.status} connectionStatus={connectionStatus} />
                <div className="flex items-center gap-1.5 text-red-500 font-mono font-medium bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg">
                    <Clock size={16} />
                    <span>00:15:30</span>
                </div>
            </div>

            <div className="text-center mb-8 relative">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Lance Atual</p>
                <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2 animate-in zoom-in duration-300">
                    {formatCurrency(state.currentBid)}
                </div>
                {state.lastBidderName && (
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10 inline-block px-3 py-1 rounded-full">
                        Vencendo: {state.lastBidderName}
                    </p>
                )}
            </div>

            <div className="relative">
                <BidInput
                    currentBid={state.currentBid}
                    minIncrement={state.nextMinimumBid - state.currentBid}
                    onPlaceBid={onPlaceBid}
                    disabled={state.status !== 'LIVE' || connectionStatus !== 'CONNECTED'}
                />
            </div>
        </div>
    );
};
