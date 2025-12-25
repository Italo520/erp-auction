import React from 'react';
import { cn } from '@/shared/utils/cn';

interface LiveIndicatorProps {
    status: 'WAITING' | 'LIVE' | 'PAUSED' | 'FINISHED';
    connectionStatus: 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED';
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({ status, connectionStatus }) => {
    const isOnline = connectionStatus === 'CONNECTED';

    return (
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium">
            <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                status === 'LIVE' ? "bg-red-500" : "bg-slate-400"
            )} />
            <span>{status === 'LIVE' ? 'AO VIVO' : status}</span>

            {!isOnline && (
                <span className="text-red-400 ml-2">(Offline)</span>
            )}
        </div>
    );
};
