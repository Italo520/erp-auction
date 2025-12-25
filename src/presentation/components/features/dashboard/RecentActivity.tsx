import React from 'react';
import { Card, CardHeader } from '../../ui/Card/Card';
import { RecentActivityProps } from './dashboard.types';
import { Activity, Gavel, User, DollarSign, Info } from 'lucide-react';
import { cn } from '../../../../shared/utils/cn';

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'bid': return <DollarSign size={16} />;
            case 'auction': return <Gavel size={16} />;
            case 'user': return <User size={16} />;
            default: return <Info size={16} />;
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'bid': return "text-green-600 bg-green-50 dark:bg-green-900/20";
            case 'auction': return "text-primary bg-primary/10";
            case 'user': return "text-orange-600 bg-orange-50 dark:bg-orange-900/20";
            default: return "text-slate-600 bg-slate-50 dark:bg-slate-800";
        }
    };

    return (
        <Card className="h-full">
            <CardHeader
                title="Atividade Recente"
                icon={<Activity size={18} />}
            />

            <div className="space-y-4 mt-2">
                {activities.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">Nenhuma atividade recente.</p>
                ) : (
                    activities.map((activity) => (
                        <div key={activity.id} className="flex gap-4 items-start pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                            <div className={cn(
                                "p-2 rounded-full flex-shrink-0 mt-0.5",
                                getIconColor(activity.type)
                            )}>
                                {getIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                    {activity.title}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {activity.description}
                                </p>
                                <span className="text-xs text-slate-400 mt-1 block">
                                    {activity.time}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};
