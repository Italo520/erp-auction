import { ReactNode } from 'react';

export interface HeaderProps {
    title?: string;
    actions?: ReactNode;
    user?: {
        name: string;
        image?: string;
    };
    onMenuClick?: () => void;
}
