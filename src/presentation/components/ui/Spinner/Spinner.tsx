import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <Loader2
            className={cn(
                "animate-spin text-primary",
                sizeClasses[size],
                className
            )}
        />
    );
};
