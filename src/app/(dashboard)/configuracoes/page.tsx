'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { Card } from '@/presentation/components/ui/Card/Card';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
    return (
        <Container>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings className="text-primary" />
                    Configurações
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Configurações do sistema.</p>
            </div>
            <Card>
                <div className="p-4 text-center">
                    <p className="text-slate-600 dark:text-slate-300">Funcionalidade de configurações em desenvolvimento.</p>
                </div>
            </Card>
        </Container>
    );
}
