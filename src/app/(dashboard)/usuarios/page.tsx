'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { Card } from '@/presentation/components/ui/Card/Card';
import { Users } from 'lucide-react';

export default function UsersPage() {
    return (
        <Container>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="text-primary" />
                    Usuários
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Gerencie os usuários do sistema.</p>
            </div>
            <Card>
                <div className="p-4 text-center">
                    <p className="text-slate-600 dark:text-slate-300">Funcionalidade de gerenciamento de usuários em desenvolvimento.</p>
                </div>
            </Card>
        </Container>
    );
}
