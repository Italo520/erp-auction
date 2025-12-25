import { useState, useCallback, useMemo } from 'react';
import { Vehicle } from '../../core/entities/Vehicle';
import { MockVehicleRepository } from '../../infrastructure/repositories/MockVehicleRepository';
import { CreateVehicleUseCase } from '../../core/usecases/vehicles/CreateVehicleUseCase';
import { ListVehiclesUseCase } from '../../core/usecases/vehicles/ListVehiclesUseCase';
import { UpdateVehicleUseCase } from '../../core/usecases/vehicles/UpdateVehicleUseCase';
import { GetVehicleUseCase } from '../../core/usecases/vehicles/GetVehicleUseCase';
import { VehicleFilterParams } from '../../core/repositories/IVehicleRepository';
import { PaginatedResult } from '../../shared/types/domain.types';

export function useVehicles() {
    const [vehicles, setVehicles] = useState<PaginatedResult<Vehicle> | null>(null);
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Instancia dependências (em um app real, isso poderia vir de um Context ou DI Container)
    const repository = useMemo(() => new MockVehicleRepository(), []);

    const createUseCase = useMemo(() => new CreateVehicleUseCase(repository), [repository]);
    const listUseCase = useMemo(() => new ListVehiclesUseCase(repository), [repository]);
    const updateUseCase = useMemo(() => new UpdateVehicleUseCase(repository), [repository]);
    const getUseCase = useMemo(() => new GetVehicleUseCase(repository), [repository]);

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

    const createVehicle = useCallback(async (data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsLoading(true);
        setError(null);
        try {
            const newVehicle = await createUseCase.execute(data);
            // Opcional: atualizar lista local
            return newVehicle;
        } catch (err) {
            setError('Erro ao criar veículo');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [createUseCase]);

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
