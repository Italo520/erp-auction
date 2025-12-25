import { Vehicle } from '../../entities/Vehicle';
import { IVehicleRepository } from '../../repositories/IVehicleRepository';

export class CreateVehicleUseCase {
    constructor(private vehicleRepository: IVehicleRepository) { }

    async execute(vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
        // Aqui poderiam entrar validações de negócio antes de criar
        return this.vehicleRepository.create(vehicleData);
    }
}
