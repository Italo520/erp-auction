'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { VehicleForm } from '@/presentation/components/features/vehicles/VehicleForm';
import { useVehicles } from '@/presentation/hooks/useVehicles';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button/Button';
import { toast } from 'sonner';
import { VehicleFormData } from '@/presentation/components/features/vehicles/vehicles.types';

export default function NewVehiclePage() {
    const router = useRouter();
    const { createVehicle, isLoading } = useVehicles();

    const handleSubmit = async (data: VehicleFormData) => {
        try {
            await createVehicle({
                ...data,
                status: 'DRAFT',
                initialBid: 0,
                minimumIncrement: 0,
            } as any);

            toast.success('Veículo criado com sucesso!');
            router.push('/veiculos');
        } catch (error) {
            console.error('Erro ao criar veículo:', error);
            toast.error('Erro ao criar veículo. Tente novamente.');
        }
    };

    return (
        <Container>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" className="p-2" onClick={() => router.back()}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Novo Veículo</h1>
                    <p className="text-slate-500 dark:text-slate-400">Cadastre um novo veículo no sistema.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#111722] rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                <VehicleForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </Container>
    );
}
