import { Vehicle } from '../../../../../core/entities/Vehicle';

export interface VehicleFormData extends Partial<Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>> {
    vehicleImageFiles?: File[]; // Arquivos físicos para upload
}

export interface VehicleFormProps {
    initialData?: Vehicle;
    onSubmit: (data: VehicleFormData) => Promise<void>;
    isLoading?: boolean;
}

export interface VehicleImageUploadProps {
    images: string[]; // URLs
    onUpload: (files: File[]) => void;
    onRemove: (index: number) => void;
}

export interface VehicleSpecsFormProps {
    data: VehicleFormData;
    onChange: (field: string, value: any) => void;
    errors?: Record<string, string>;
}
