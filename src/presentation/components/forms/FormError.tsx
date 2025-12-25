import React from 'react';
import { FormErrorProps } from './form.types';
import { AlertCircle } from 'lucide-react';

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm mt-2">
            <AlertCircle size={16} />
            <span>{message}</span>
        </div>
    );
};
