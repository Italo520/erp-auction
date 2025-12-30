'use client';

import React, { useEffect, use, useState } from 'react';
import { Container } from '@/presentation/components/layout/Container/Container';
import { VehicleForm } from '@/presentation/components/features/vehicles/VehicleForm';
import { useVehicles } from '@/presentation/hooks/useVehicles';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button/Button';
import { toast } from 'sonner';
import { Spinner } from '@/presentation/components/ui/Spinner/Spinner';
import { VehicleFormData } from '@/presentation/components/features/vehicles/vehicles.types';
import { SupabaseStorageService } from '@/infrastructure/storage/SupabaseStorageService';

interface VehicleEditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function VehicleEditPage({ params }: VehicleEditPageProps) {
    const router = useRouter();
    const { id } = use(params);

    const { getVehicle, updateVehicle, currentVehicle, isLoading, error } = useVehicles();
    const [isUpdating, setIsUpdating] = useState(false);
    const [storageService] = useState(() => new SupabaseStorageService());

    useEffect(() => {
        if (id) {
            getVehicle(id);
        }
    }, [getVehicle, id]);

    const handleUpdate = async (formData: VehicleFormData) => {
        setIsUpdating(true);

        try {
            // Separar imagens existentes de novos arquivos
            const existingImages = (formData.images || [])
                .filter((img: any) => img.url && !img.url.startsWith('blob:')) // URLs reais do servidor
                .map((img: any) => img.url);

            // Upload de novos arquivos
            const newImageUrls: string[] = [];
            if (formData.vehicleImageFiles && formData.vehicleImageFiles.length > 0) {
                for (const file of formData.vehicleImageFiles) {
                    try {
                        const url = await storageService.uploadVehicleImage(file, id);
                        newImageUrls.push(url);
                    } catch (uploadError) {
                        console.error('Erro ao fazer upload de imagem:', uploadError);
                        toast.error('Erro ao fazer upload de uma das imagens');
                    }
                }
            }

            // Combinar URLs antigas (mantidas) com as novas
            const allImageUrls = [...existingImages, ...newImageUrls];

            // Atualizar veículo no banco
            await updateVehicle(id, {
                ...formData,
                images: allImageUrls.map((url, index) => ({
                    id: `${id}-${index}`,
                    url,
                    isCover: index === 0
                }))
            } as any);

            toast.success('Veículo atualizado com sucesso!');
            router.push(`/veiculos/${id}`);
        } catch (err) {
            console.error('Erro ao atualizar veículo:', err);
            toast.error('Erro ao atualizar veículo. Tente novamente.');
        } finally {
            setIsUpdating(false);
        }
    };

    // Estado de carregamento
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    // Veículo não encontrado
    if (error || !currentVehicle) {
        return (
            <Container>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Veículo não encontrado
                    </h2>
                    <p className="text-slate-500 mb-6">
                        {error || "O veículo que você procura não existe ou foi removido."}
                    </p>
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft size={20} className="mr-2" />
                        Voltar
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" className="p-2" onClick={() => router.back()}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Editar Veículo
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Atualize as informações do veículo {currentVehicle.make} {currentVehicle.model}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#111722] rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                <VehicleForm
                    initialData={currentVehicle as any}
                    onSubmit={handleUpdate}
                    isLoading={isUpdating}
                />
            </div>
        </Container>
    );
}
