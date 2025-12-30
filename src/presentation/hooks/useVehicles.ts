import { useState, useCallback, useMemo } from 'react';
import { Vehicle } from '@/core/entities/Vehicle';
import { CreateVehicleUseCase } from '@/core/usecases/vehicles/CreateVehicleUseCase';
import { ListVehiclesUseCase } from '@/core/usecases/vehicles/ListVehiclesUseCase';
import { UpdateVehicleUseCase } from '@/core/usecases/vehicles/UpdateVehicleUseCase';
import { GetVehicleUseCase } from '@/core/usecases/vehicles/GetVehicleUseCase';
import { VehicleFilterParams } from '@/core/repositories/IVehicleRepository';
import { PaginatedResult } from '@/shared/types/domain.types';
import { useRepositories } from '@/core/contexts/RepositoryContext';
import { SupabaseStorageService } from '@/infrastructure/storage/SupabaseStorageService';
import { VehicleFormData } from '@/presentation/components/features/vehicles/vehicles.types';

export function useVehicles() {
    const { vehicleRepo } = useRepositories();
    const [vehicles, setVehicles] = useState<PaginatedResult<Vehicle> | null>(null);
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const storageService = useMemo(() => new SupabaseStorageService(), []);

    const createUseCase = useMemo(() => new CreateVehicleUseCase(vehicleRepo), [vehicleRepo]);
    const listUseCase = useMemo(() => new ListVehiclesUseCase(vehicleRepo), [vehicleRepo]);
    const updateUseCase = useMemo(() => new UpdateVehicleUseCase(vehicleRepo), [vehicleRepo]);
    const getUseCase = useMemo(() => new GetVehicleUseCase(vehicleRepo), [vehicleRepo]);

    const fetchVehicles = useCallback(async (params: VehicleFilterParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await listUseCase.execute(params);
            setVehicles(result);
        } catch (err) {
            setError('Erro ao carregar veículos');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [listUseCase]);

    const getVehicle = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const vehicle = await getUseCase.execute(id);
            setCurrentVehicle(vehicle);
            return vehicle;
        } catch (err) {
            setError('Erro ao buscar veículo');
            console.error(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [getUseCase]);

    const createVehicle = useCallback(async (data: VehicleFormData & Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsLoading(true);
        setError(null);
        try {
            // 1. Separate files from data
            const { vehicleImageFiles, ...vehicleData } = data as any;

            // 2. Create vehicle first to get ID
            const newVehicle = await createUseCase.execute(vehicleData);

            // 3. Upload images using the new ID
            const uploadedImageUrls: string[] = [];
            if (vehicleImageFiles && vehicleImageFiles.length > 0) {
                for (const file of vehicleImageFiles) {
                    const url = await storageService.uploadVehicleImage(file, newVehicle.id);
                    uploadedImageUrls.push(url);
                }
            }

            // 4. Add images to DB
            // Also include any existing image URLs that might have been passed (though rare for create)
            const existingImageUrls = (vehicleData.images || []).map((img: any) => img.url);
            const allImageUrls = [...existingImageUrls, ...uploadedImageUrls];

            if (allImageUrls.length > 0) {
                await vehicleRepo.addImages(newVehicle.id, allImageUrls);
            }

            // 5. Fetch updated vehicle to return full object with images
            const finalVehicle = await getUseCase.execute(newVehicle.id);
            return finalVehicle || newVehicle;

        } catch (err) {
            setError('Erro ao criar veículo');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [createUseCase, storageService, vehicleRepo, getUseCase]);

    const updateVehicle = useCallback(async (id: string, data: Partial<Vehicle>) => {
        setIsLoading(true);
        setError(null);
        try {
            const updated = await updateUseCase.execute(id, data);
            setCurrentVehicle(updated);
            return updated;
        } catch (err) {
            setError('Erro ao atualizar veículo');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [updateUseCase]);

    return {
        vehicles,
        currentVehicle,
        isLoading,
        error,
        fetchVehicles,
        getVehicle,
        createVehicle,
        updateVehicle
    };
}
