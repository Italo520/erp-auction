export interface LoginFormProps {
    onSubmit?: (data: LoginFormData) => void;
    isLoading?: boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
    generic?: string;
}
