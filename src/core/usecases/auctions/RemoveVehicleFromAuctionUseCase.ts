import { IVehicleRepository } from '@/core/repositories/IVehicleRepository';
import { IAuctionRepository } from '@/core/repositories/IAuctionRepository';

/**
 * Use Case para remover um veículo de um leilão
 */
export class RemoveVehicleFromAuctionUseCase {
    constructor(
        private vehicleRepository: IVehicleRepository,
        private auctionRepository: IAuctionRepository
    ) { }

    /**
     * Executa o caso de uso
     * @param vehicleId - ID do veículo a ser removido
     * @returns true se removido com sucesso
     */
    async execute(vehicleId: string): Promise<boolean> {
        // Validação básica
        if (!vehicleId) {
            throw new Error('ID do veículo é obrigatório');
        }

        // 1. Buscar o veículo
        const vehicle = await this.vehicleRepository.findById(vehicleId);

        if (!vehicle) {
            throw new Error('Veículo não encontrado');
        }

        // 2. Verificar se o veículo está associado a algum leilão
        if (!vehicle.auctionId) {
            throw new Error('Veículo não está associado a nenhum leilão');
        }

        // 3. Buscar o leilão para validar o status
        const auction = await this.auctionRepository.findById(vehicle.auctionId);

        if (!auction) {
            throw new Error('Leilão associado não encontrado');
        }

        // 4. Validar que o leilão ainda não iniciou
        const allowedStatuses = ['DRAFT', 'SCHEDULED'];

        if (!allowedStatuses.includes(auction.status)) {
            throw new Error(
                `Não é possível remover veículos de um leilão com status ${auction.status}. ` +
                `Apenas leilões com status DRAFT ou SCHEDULED permitem essa operação.`
            );
        }

        // 5. Remover a associação (setar auctionId como null)
        await this.vehicleRepository.update(vehicleId, {
            auctionId: undefined, // Ou null, dependendo de como o repositório trata
            lotNumber: undefined, // Também limpar o número do lote
        });

        return true;
    }
}
