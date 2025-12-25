'use client';

import React, { useEffect } from 'react';
import { Container } from '../../../../presentation/components/layout/Container/Container';
import { VehicleGallery } from '../../../../presentation/components/features/vehicles/VehicleGallery';
import { VehicleInfo } from '../../../../presentation/components/features/vehicles/VehicleInfo';
import { VehicleSpecs } from '../../../../presentation/components/features/vehicles/VehicleSpecs';
import { VehicleActions } from '../../../../presentation/components/features/vehicles/VehicleActions';
import { useVehicles } from '../../../../presentation/hooks/useVehicles';
import { useRouter } from 'next/navigation';

interface VehicleDetailPageProps {
    params: {
        id: string;
    };
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
    const router = useRouter();
    const { getVehicle, currentVehicle, isLoading, error } = useVehicles();

    useEffect(() => {
        if (params.id) {
            getVehicle(params.id);
        }
    }, [getVehicle, params.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !currentVehicle) {
        return (
            <Container>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Veículo não encontrado</h2>
                    <p className="text-slate-500 mb-6">{error || "O veículo que você procura não existe ou foi removido."}</p>
                    <VehicleActions
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onBack={() => router.back()}
                    />
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <VehicleActions
                onEdit={() => router.push(`/vehicles/${params.id}/edit`)} // Rota futura
                onDelete={() => alert("Funcionalidade de exclusão em desenvolvimento")}
                onBack={() => router.back()}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Gallery */}
                <div className="lg:col-span-7 space-y-8">
                    <VehicleGallery images={currentVehicle.images} />
                    <VehicleSpecs vehicle={currentVehicle} />
                </div>

                {/* Right Column: Info & Details */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 bg-white dark:bg-[#111722] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <VehicleInfo vehicle={currentVehicle} />
                    </div>
                </div>
            </div>
        </Container>
    );
}
