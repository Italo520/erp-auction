'use client';

import { AuthProvider } from '@/presentation/contexts/AuthContext';
import { RepositoryProvider } from '@/core/contexts/RepositoryContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <RepositoryProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </RepositoryProvider>
    );
}
