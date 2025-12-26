'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { Card } from '@/presentation/components/ui/Card/Card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button/Button';
import { useRouter } from 'next/navigation';

export default function NewAuctionPage() {
    const router = useRouter();

    return (
        <Container>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" className="p-2" onClick={() => router.back()}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Novo Leilão</h1>
                    <p className="text-slate-500 dark:text-slate-400">Cadastre um novo leilão no sistema.</p>
                </div>
            </div>

            <Card>
                <div className="p-4 text-center">
                    <p className="text-slate-600 dark:text-slate-300">Formulário de criação de leilão em desenvolvimento.</p>
                </div>
            </Card>
        </Container>
    );
}
