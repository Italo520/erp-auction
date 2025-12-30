import { IVehicleRepository } from '@/core/repositories/IVehicleRepository';
import { IAuctionRepository } from '@/core/repositories/IAuctionRepository';
import { Vehicle } from '@/core/entities/Vehicle';

/**
 * Use Case para adicionar múltiplos veículos a um leilão
 */
export class AddVehiclesToAuctionUseCase {
    constructor(
        private vehicleRepository: IVehicleRepository,
        private auctionRepository: IAuctionRepository
    ) { }

    /**
     * Executa o caso de uso
     * @param auctionId - ID do leilão
     * @param vehicleIds - IDs dos veículos a serem adicionados
     * @returns Veículos atualizados
     */
    async execute(auctionId: string, vehicleIds: string[]): Promise<Vehicle[]> {
        // Validações básicas
        if (!auctionId) {
            throw new Error('ID do leilão é obrigatório');
        }

        if (!vehicleIds || vehicleIds.length === 0) {
            throw new Error('É necessário selecionar pelo menos um veículo');
        }

        // 1. Validar que o leilão existe
        const auction = await this.auctionRepository.findById(auctionId);

        if (!auction) {
            throw new Error('Leilão não encontrado');
        }

        // 2. Validar que o leilão permite adição de veículos
        const allowedStatuses = ['DRAFT', 'SCHEDULED'];

        if (!allowedStatuses.includes(auction.status)) {
            throw new Error(
                `Não é possível adicionar veículos a um leilão com status ${auction.status}. ` +
                `Apenas leilões com status DRAFT ou SCHEDULED permitem essa operação.`
            );
        }

        // 3. Validar e atualizar cada veículo
        const updatedVehicles: Vehicle[] = [];
        const errors: string[] = [];

        for (const vehicleId of vehicleIds) {
            try {
                // Verificar se o veículo existe
                const vehicle = await this.vehicleRepository.findById(vehicleId);

                if (!vehicle) {
                    errors.push(`Veículo ${vehicleId} não encontrado`);
                    continue;
                }

                // Verificar se o veículo já está em outro leilão
                if (vehicle.auctionId && vehicle.auctionId !== auctionId) {
                    errors.push(
                        `Veículo ${vehicle.make} ${vehicle.model} (${vehicle.chassisNumber}) ` +
                        `já está associado a outro leilão`
                    );
                    continue;
                }

                // Se já está neste leilão, pular
                if (vehicle.auctionId === auctionId) {
                    updatedVehicles.push(vehicle);
                    continue;
                }

                // Atualizar o veículo com o auctionId
                const updatedVehicle = await this.vehicleRepository.update(vehicleId, {
                    auctionId,
                });

                updatedVehicles.push(updatedVehicle);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
                errors.push(`Erro ao processar veículo ${vehicleId}: ${errorMessage}`);
            }
        }

        // Se houve erros, incluir na resposta
        if (errors.length > 0) {
            console.warn('Erros ao adicionar veículos:', errors);

            // Se TODOS falharam, lançar erro
            if (updatedVehicles.length === 0) {
                throw new Error(`Falha ao adicionar veículos:\n${errors.join('\n')}`);
            }

            // Se alguns falharam, registrar mas continuar
            console.log(`${updatedVehicles.length} veículos adicionados com sucesso, ${errors.length} falharam`);
        }

        return updatedVehicles;
    }
}
