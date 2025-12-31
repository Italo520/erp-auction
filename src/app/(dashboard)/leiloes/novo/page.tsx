'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/presentation/components/ui/Card/Card';
import { Button } from '@/presentation/components/ui/Button/Button';
import { Input } from '@/presentation/components/ui/Input/Input';
import { toast } from 'sonner';
import { ArrowLeft, Save, MapPin } from 'lucide-react';

export default function NewAuctionPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        location: 'ONLINE', // Default
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validation
            if (!formData.name) throw new Error('Nome do leilão é obrigatório');
            if (!formData.startDateTime) throw new Error('Data de início é obrigatória');
            if (!formData.endDateTime) throw new Error('Data de término é obrigatória');

            const start = new Date(formData.startDateTime);
            const end = new Date(formData.endDateTime);

            if (end <= start) {
                throw new Error('A data de término deve ser posterior à data de início');
            }

            const response = await fetch('/api/auctions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erro ao criar leilão');
            }

            toast.success('Leilão criado com sucesso!');
            router.push(`/leiloes/${result.data.auction.id}`);

        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : 'Erro ao criar leilão');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-4 pl-0 hover:pl-2 transition-all"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                </Button>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Novo Leilão</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Preencha as informações básicas para iniciar um novo evento.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bloco 1: Identificação */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Identificação do Leilão
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <Input
                                label="Nome do Leilão *"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ex: Leilão de Frota Toyota - Dezembro 2025"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-[#111418] dark:text-white">Descrição / Edital Resumido</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg border border-[#d1d5db] dark:border-[#324467] bg-white dark:bg-[#111722] px-4 py-3 text-base text-[#111418] dark:text-white placeholder:text-[#92a4c9] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                placeholder="Observações internas ou públicas..."
                            />
                        </div>
                    </div>
                </Card>

                {/* Bloco 2: Agendamento */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        Agendamento e Local
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                label="Data/Hora Início *"
                                type="datetime-local"
                                name="startDateTime"
                                value={formData.startDateTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                label="Data/Hora Encerramento *"
                                type="datetime-local"
                                name="endDateTime"
                                value={formData.endDateTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-[#111418] dark:text-white">Tipo de Leilão</label>
                            <div className="relative">
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full h-12 md:h-14 rounded-lg border border-[#d1d5db] dark:border-[#324467] bg-white dark:bg-[#111722] px-4 text-base text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 appearance-none"
                                >
                                    <option value="ONLINE">Online (Apenas Internet)</option>
                                    <option value="PRESENCIAL">Presencial (Local Físico)</option>
                                    <option value="MISTO">Misto (Híbrido)</option>
                                </select>
                                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#92a4c9] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Bloco 3: Configurações */}
                <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 border-dashed">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                        Configurações Iniciais
                    </h2>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 px-3 py-1 rounded-full font-medium text-xs">
                            STATUS: RASCUNHO
                        </div>
                        <p>
                            O leilão será criado como <strong>Rascunho</strong>. Você poderá adicionar veículos e publicar depois.
                        </p>
                    </div>
                </Card>

                <div className="flex justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="min-w-[150px]"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                                Criando...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Criar Leilão
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
