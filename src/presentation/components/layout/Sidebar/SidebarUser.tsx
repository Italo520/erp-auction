import React from 'react';
import { SidebarUserProps } from './Sidebar.types';

export const SidebarUser: React.FC<SidebarUserProps> = ({ name, email, avatarUrl }) => {
    return (
        <div className="flex items-center gap-3 p-3 mt-auto border-t border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {email}
                </span>
            </div>
        </div>
    );
};
