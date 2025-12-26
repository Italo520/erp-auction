import React from 'react';
import { VehicleSpecsFormProps } from './vehicles.types';
import { FormField } from '@/presentation/components/forms/FormField';

const FUEL_TYPES = [
    { value: 'GASOLINE', label: 'Gasolina' },
    { value: 'ETHANOL', label: 'Etanol' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'FLEX', label: 'Flex' },
    { value: 'HYBRID', label: 'Híbrido' },
    { value: 'ELECTRIC', label: 'Elétrico' },
];

const TRANSMISSION_TYPES = [
    { value: 'MANUAL', label: 'Manual' },
    { value: 'AUTOMATIC', label: 'Automático' },
    { value: 'CVT', label: 'CVT' },
    { value: 'AUTOMATED', label: 'Automatizado' },
];

export const VehicleSpecsForm: React.FC<VehicleSpecsFormProps> = ({ data, onChange, errors }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                label="Marca"
                placeholder="Ex: Toyota"
                value={data.make || ''}
                onChange={(e) => onChange('make', e.target.value)}
                error={errors?.make}
            />

            <FormField
                label="Modelo"
                placeholder="Ex: Corolla"
                value={data.model || ''}
                onChange={(e) => onChange('model', e.target.value)}
                error={errors?.model}
            />

            <FormField
                label="Versão"
                placeholder="Ex: XEi 2.0"
                value={data.version || ''}
                onChange={(e) => onChange('version', e.target.value)}
                error={errors?.version}
            />

            <FormField
                label="Cor"
                placeholder="Ex: Prata"
                value={data.color || ''}
                onChange={(e) => onChange('color', e.target.value)}
                error={errors?.color}
            />

            <div className="flex flex-col gap-2">
                <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">Combustível</label>
                <select
                    className="flex w-full h-12 md:h-14 px-4 rounded-lg bg-white dark:bg-[#111722] border border-[#d1d5db] dark:border-[#324467] text-[#111418] dark:text-white"
                    value={data.fuel || ''}
                    onChange={(e) => onChange('fuel', e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {FUEL_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
                {errors?.fuel && <p className="text-red-500 text-xs mt-1">{errors.fuel}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">Câmbio</label>
                <select
                    className="flex w-full h-12 md:h-14 px-4 rounded-lg bg-white dark:bg-[#111722] border border-[#d1d5db] dark:border-[#324467] text-[#111418] dark:text-white"
                    value={data.transmission || ''}
                    onChange={(e) => onChange('transmission', e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {TRANSMISSION_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
                {errors?.transmission && <p className="text-red-500 text-xs mt-1">{errors.transmission}</p>}
            </div>

            <FormField
                label="Ano Fabricação"
                type="number"
                placeholder="Ex: 2021"
                value={data.yearManufacture || ''}
                onChange={(e) => onChange('yearManufacture', parseInt(e.target.value))}
                error={errors?.yearManufacture}
            />

            <FormField
                label="Ano Modelo"
                type="number"
                placeholder="Ex: 2022"
                value={data.yearModel || ''}
                onChange={(e) => onChange('yearModel', parseInt(e.target.value))}
                error={errors?.yearModel}
            />

            <FormField
                label="Quilometragem"
                type="number"
                placeholder="Ex: 45000"
                value={data.mileage || ''}
                onChange={(e) => onChange('mileage', parseInt(e.target.value))}
                error={errors?.mileage}
            />

            <FormField
                label="Placa (Final)"
                placeholder="Ex: 9B12"
                value={data.plateEnd || ''}
                onChange={(e) => onChange('plateEnd', e.target.value)}
                error={errors?.plateEnd}
            />

            <FormField
                label="Chassi (VIN)"
                placeholder="Digite o chassi completo"
                className="md:col-span-2"
                value={data.chassisNumber || ''}
                onChange={(e) => onChange('chassisNumber', e.target.value)}
                error={errors?.chassisNumber}
            />
        </div>
    );
};
