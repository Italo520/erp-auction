import React from 'react';
import { Card, CardHeader } from '@/presentation/components/ui/Card/Card';
import { QuickActionsProps } from './dashboard.types';
import { Zap } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button/Button';

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
    return (
        <Card>
            <CardHeader
                title="Ações Rápidas"
                icon={<Zap size={18} />}
                iconColor="text-amber-500"
                iconBgColor="bg-amber-50 dark:bg-amber-900/20"
            />

            <div className="grid grid-cols-2 gap-3 mt-2">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        variant={action.variant || 'outline'}
                        onClick={action.onClick}
                        className="justify-start h-auto py-3 px-4 flex flex-col items-center gap-2 text-center md:flex-row md:text-left"
                    >
                        {action.icon}
                        <span className="text-sm font-medium">{action.label}</span>
                    </Button>
                ))}
            </div>
        </Card>
    );
};
