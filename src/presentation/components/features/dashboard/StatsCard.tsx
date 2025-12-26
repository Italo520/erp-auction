import React from 'react';
import { Card } from '@/presentation/components/ui/Card/Card';
import { StatCardProps } from './dashboard.types';
import { cn } from '@/shared/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatsCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    trend = 'neutral',
    icon,
    description
}) => {
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {icon}
                </div>
                {change && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                        trend === 'up' ? "text-green-600 bg-green-50 dark:bg-green-900/20" :
                            trend === 'down' ? "text-red-600 bg-red-50 dark:bg-red-900/20" :
                                "text-slate-600 bg-slate-50 dark:bg-slate-800"
                    )}>
                        {trend === 'up' && <TrendingUp size={12} />}
                        {trend === 'down' && <TrendingDown size={12} />}
                        {trend === 'neutral' && <Minus size={12} />}
                        {change}
                    </div>
                )}
            </div>

            <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
                {description && (
                    <p className="text-slate-400 text-xs mt-1">{description}</p>
                )}
            </div>
        </Card>
    );
};
