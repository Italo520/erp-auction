import { LoginForm } from '@/presentation/components/features/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | ERP Auction',
    description: 'Acesse sua conta',
};

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="mb-6">
                {/* Placeholder para Logo se necessário */}
                {/* <Logo className="h-10 w-auto" /> */}
            </div>
            <LoginForm />
        </div>
    );
}
