import { Vehicle } from '@/core/entities/Vehicle';
import { IVehicleRepository } from '@/core/repositories/IVehicleRepository';

export class UpdateVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) { }

    async execute(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
        if (!id) {
            throw new Error('Vehicle ID is required');
        }
        return this.vehicleRepository.update(id, data);
    }
}
