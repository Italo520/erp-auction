import { ReactNode } from 'react';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export interface FormSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export interface FormErrorProps {
    message?: string;
}
