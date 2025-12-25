import React from 'react';
import { FormSectionProps } from './form.types';

export const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
    return (
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8 last:border-0 last:pb-0 last:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{title}</h3>
                    {description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                    )}
                </div>
                <div className="md:col-span-2 space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
};
