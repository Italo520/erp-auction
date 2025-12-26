import React from 'react';
import { Spinner } from '@/presentation/components/ui/Spinner/Spinner';

interface LoadingStateProps {
    message?: string;
    fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Carregando...', fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 dark:bg-[#0d121c]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <Spinner size="lg" />
                <p className="mt-4 text-slate-600 dark:text-slate-300 font-medium animate-pulse">{message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="md" />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{message}</p>
        </div>
    );
};
