import { ReactNode } from 'react';

export interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    href: string;
    isActive?: boolean;
}

export interface SidebarUserProps {
    name: string;
    email: string;
    avatarUrl?: string;
}

export interface SidebarProps {
    className?: string;
}
