import React from 'react';
import { Input } from '@/presentation/components/ui/Input/Input';
import { FormFieldProps } from './form.types';

export const FormField: React.FC<FormFieldProps> = ({
    label,
    error,
    helperText,
    className,
    ...props
}) => {
    return (
        <div className={className}>
            <Input
                label={label}
                error={error}
                {...props}
            />
            {helperText && !error && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
            )}
        </div>
    );
};
