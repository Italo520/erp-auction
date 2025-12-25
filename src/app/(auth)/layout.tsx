import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0d121c] p-4">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}
