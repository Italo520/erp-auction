import { useState, useCallback, useMemo } from 'react';
import { Vehicle } from '@/core/entities/Vehicle';
import { CreateVehicleUseCase } from '@/core/usecases/vehicles/CreateVehicleUseCase';
import { ListVehiclesUseCase } from '@/core/usecases/vehicles/ListVehiclesUseCase';
import { UpdateVehicleUseCase } from '@/core/usecases/vehicles/UpdateVehicleUseCase';
import { GetVehicleUseCase } from '@/core/usecases/vehicles/GetVehicleUseCase';
import { VehicleFilterParams } from '@/core/repositories/IVehicleRepository';
import { PaginatedResult } from '@/shared/types/domain.types';
import { useRepositories } from '@/core/contexts/RepositoryContext';
import { SupabaseStorageService } from '@/infrastructure/services/SupabaseStorageService';
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
            const uploadedImageUrls: string[] = [];

            // 1. Upload images if any
            if (data.vehicleImageFiles && data.vehicleImageFiles.length > 0) {
                for (const file of data.vehicleImageFiles) {
                    const result = await storageService.upload(file);
                    uploadedImageUrls.push(result.url);
                }
            }

            // 2. Prepare data with new URLs
            const vehicleToCreate = {
                ...data,
                images: [
                    ...(data.images || []),
                    ...uploadedImageUrls.map(url => ({ url, isCover: false })) // Map strings to objects
                ]
            };

            // Remove auxiliary field before sending to domain/repo
            delete (vehicleToCreate as any).vehicleImageFiles;

            const newVehicle = await createUseCase.execute(vehicleToCreate as any);
            return newVehicle;
        } catch (err) {
            setError('Erro ao criar veículo');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [createUseCase, storageService]);

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
