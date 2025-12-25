import React, { useState } from 'react';
import { VehicleFormData, VehicleFormProps } from './vehicles.types';
import { FormSection } from '../../forms/FormSection';
import { VehicleSpecsForm } from './VehicleSpecsForm';
import { VehicleImageUpload } from './VehicleImageUpload';
import { Button } from '../../ui/Button/Button';
import { Save } from 'lucide-react';
import { FormError } from '../../forms/FormError';

export const VehicleForm: React.FC<VehicleFormProps> = ({ initialData, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<VehicleFormData>(initialData || {
        // Valores padrão para evitar null em uncontrolled inputs se necessário, 
        // mas aqui estamos controlando via state
        images: []
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpar erro do campo
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.make) newErrors.make = "Marca é obrigatória";
        if (!formData.model) newErrors.model = "Modelo é obrigatório";
        if (!formData.yearManufacture) newErrors.yearManufacture = "Ano Fab. é obrigatório";
        if (!formData.chassisNumber) newErrors.chassisNumber = "Chassi é obrigatório";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <FormSection title="Informações do Veículo" description="Dados básicos e técnicos do veículo.">
                <VehicleSpecsForm
                    data={formData}
                    onChange={handleChange}
                    errors={errors}
                />
            </FormSection>

            <FormSection title="Fotos e Documentos" description="Adicione fotos do veículo. A primeira será a capa.">
                <VehicleImageUpload
                    images={formData.images?.map(img => img.url) || []}
                    onUpload={() => { }} // TODO: Implementar upload real
                    onRemove={() => { }}
                />
            </FormSection>

            <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-800">
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                    <Save size={18} className="mr-2" />
                    Salvar Veículo
                </Button>
            </div>

            {Object.keys(errors).length > 0 && (
                <FormError message="Por favor, corrija os erros acima antes de salvar." />
            )}
        </form>
    );
};
