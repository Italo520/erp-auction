import { Vehicle } from '@/core/entities/Vehicle';
import { IVehicleRepository, VehicleFilterParams } from '@/core/repositories/IVehicleRepository';
import { PaginatedResult } from '@/shared/types/domain.types';

export class ListVehiclesUseCase {
    constructor(private vehicleRepository: IVehicleRepository) { }

    async execute(params: VehicleFilterParams): Promise<PaginatedResult<Vehicle>> {
        return this.vehicleRepository.findAll(params);
    }
}
