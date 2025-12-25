'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '../../../presentation/components/layout/Container/Container';
import { AuctionList } from '../../../presentation/components/features/auctions/AuctionList';
import { AuctionFilters } from '../../../presentation/components/features/auctions/AuctionFilters';
import { useAuctions } from '../../../presentation/hooks/useAuctions';
import { AuctionStatus } from '../../../core/entities/Auction';
import { Button } from '../../../presentation/components/ui/Button/Button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AuctionsPage() {
    const router = useRouter();
    const { auctions, isLoading, error, fetchAuctions } = useAuctions();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<AuctionStatus | 'ALL'>('ALL');

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        fetchAuctions({
            page: 1,
            limit: 10,
            search: searchTerm,
            status: statusFilter === 'ALL' ? undefined : statusFilter
        });
    }, [fetchAuctions, searchTerm, statusFilter]);

    const handleCreateNew = () => {
        // Navegar para página de criação (será criada futuramente)
        router.push('/leiloes/novo');
    };

    const handleAuctionClick = (id: string) => {
        router.push(`/leiloes/${id}`);
    }

    return (
        <Container>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leilões</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gerencie todos os leilões cadastrados no sistema.</p>
                </div>
                <Button onClick={handleCreateNew}>
                    <Plus size={18} className="mr-2" />
                    Novo Leilão
                </Button>
            </div>

            <AuctionFilters
                onSearch={setSearchTerm}
                onStatusFilter={setStatusFilter}
                currentStatus={statusFilter}
            />

            <AuctionList
                auctions={auctions?.data || []}
                isLoading={isLoading}
                onAuctionClick={handleAuctionClick}
            />
        </Container>
    );
}
