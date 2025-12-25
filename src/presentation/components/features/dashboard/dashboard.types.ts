import { ReactNode } from 'react';

export interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: ReactNode;
    description?: string;
}

export interface ActivityItem {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'bid' | 'auction' | 'user' | 'system';
}

export interface RecentActivityProps {
    activities: ActivityItem[];
}

export interface QuickActionProps {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface QuickActionsProps {
    actions: QuickActionProps[];
}
