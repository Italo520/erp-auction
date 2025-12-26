import React from 'react';
import { cn } from '@/shared/utils/cn';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, className, fluid = false }) => {
    return (
        <div
            className={cn(
                "w-full mx-auto px-4 md:px-6 py-6",
                !fluid && "max-w-7xl",
                className
            )}
        >
            {children}
        </div>
    );
};
