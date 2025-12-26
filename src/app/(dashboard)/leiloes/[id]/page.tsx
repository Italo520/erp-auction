'use client';

import React, { use } from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { Card } from '@/presentation/components/ui/Card/Card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button/Button';
import { useRouter } from 'next/navigation';

interface AuctionDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function AuctionDetailPage({ params }: AuctionDetailPageProps) {
    const router = useRouter();
    const { id } = use(params);

    return (
        <Container>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" className="p-2" onClick={() => router.back()}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Detalhes do Leilão</h1>
                    <p className="text-slate-500 dark:text-slate-400">ID: {id}</p>
                </div>
            </div>

            <Card>
                <div className="p-4 text-center">
                    <p className="text-slate-600 dark:text-slate-300">Detalhes do leilão em desenvolvimento.</p>
                </div>
            </Card>
        </Container>
    );
}
