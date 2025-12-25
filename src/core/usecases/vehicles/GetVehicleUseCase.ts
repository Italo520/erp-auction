import { Vehicle } from '@/core/entities/Vehicle';
import { IVehicleRepository } from '@/core/repositories/IVehicleRepository';

export class GetVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) { }

    async execute(id: string): Promise<Vehicle | null> {
        if (!id) {
            throw new Error('Vehicle ID is required');
        }
        return this.vehicleRepository.findById(id);
    }
}
