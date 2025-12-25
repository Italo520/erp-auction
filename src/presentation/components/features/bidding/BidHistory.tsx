import React from 'react';
import { Bid } from './bidding.types';
import { formatCurrency } from '../../../../../shared/utils/formatters';

interface BidHistoryProps {
    bids: Bid[];
}

export const BidHistory: React.FC<BidHistoryProps> = ({ bids }) => {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#111722] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-semibold text-slate-900 dark:text-white">Histórico de Lances</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
                {bids.map((bid, index) => (
                    <div key={bid.id} className="flex justify-between items-center text-sm animate-in slide-in-from-left duration-300">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 font-mono text-xs">{new Date(bid.timestamp).toLocaleTimeString()}</span>
                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                {bid.userName}
                                {index === 0 && <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">Atual</span>}
                            </span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(bid.amount)}</span>
                    </div>
                ))}
                {bids.length === 0 && (
                    <p className="text-center text-slate-400 py-8">Nenhum lance ainda.</p>
                )}
            </div>
        </div>
    );
};
