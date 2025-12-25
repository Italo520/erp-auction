import React, { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import { formatCurrency } from '../../../../../shared/utils/formatters';

interface BidInputProps {
    currentBid: number;
    minIncrement: number;
    onPlaceBid: (amount: number) => void;
    disabled?: boolean;
}

export const BidInput: React.FC<BidInputProps> = ({ currentBid, minIncrement, onPlaceBid, disabled }) => {
    const [customAmount, setCustomAmount] = useState<string>('');

    const nextMinBid = currentBid + minIncrement;

    // Sugestões de quick bid
    const suggestions = [
        nextMinBid,
        nextMinBid + minIncrement,
        nextMinBid + minIncrement * 2,
        nextMinBid + minIncrement * 4
    ];

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(customAmount);
        if (!isNaN(val) && val >= nextMinBid) {
            onPlaceBid(val);
            setCustomAmount('');
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
                {suggestions.map(amount => (
                    <Button
                        key={amount}
                        variant="outline"
                        className="h-12 text-sm md:text-base border-primary/20 hover:bg-primary/5 hover:border-primary text-primary"
                        onClick={() => onPlaceBid(amount)}
                        disabled={disabled}
                    >
                        {formatCurrency(amount)}
                    </Button>
                ))}
            </div>

            <form onSubmit={handleCustomSubmit} className="flex gap-2">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">R$</span>
                    <input
                        type="number"
                        className="w-full h-12 rounded-lg border border-slate-300 dark:border-slate-700 pl-10 pr-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                        placeholder={nextMinBid.toString()}
                        min={nextMinBid}
                        step={minIncrement}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        disabled={disabled}
                    />
                </div>
                <Button type="submit" disabled={disabled || !customAmount} className="h-12 px-6">
                    Dar Lance
                </Button>
            </form>
        </div>
    );
};
