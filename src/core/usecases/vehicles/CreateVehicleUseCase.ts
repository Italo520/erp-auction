import { Vehicle } from '@/core/entities/Vehicle';
import { IVehicleRepository } from '@/core/repositories/IVehicleRepository';

export class CreateVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) { }

    async execute(vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
        // Aqui poderiam entrar validações de negócio antes de criar
        return this.vehicleRepository.create(vehicleData);
    }
}
