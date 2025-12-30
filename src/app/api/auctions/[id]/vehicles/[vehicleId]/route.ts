import { NextRequest } from 'next/server';
import { requireAdmin } from '@/app/api/middleware/auth';
import { successResponse, errorResponse, forbiddenResponse } from '@/app/api/utils/response';
import { RemoveVehicleFromAuctionUseCase } from '@/core/usecases/auctions/RemoveVehicleFromAuctionUseCase';
import { SupabaseVehicleRepository } from '@/infrastructure/repositories/SupabaseVehicleRepository';
import { SupabaseAuctionRepository } from '@/infrastructure/repositories/SupabaseAuctionRepository';

interface RouteParams {
    params: Promise<{
        id: string;
        vehicleId: string;
    }>;
}

/**
 * DELETE /api/auctions/[id]/vehicles/[vehicleId]
 * Remove um veículo de um leilão
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        // 1. Validar permissão de admin
        const admin = await requireAdmin(request);

        if (!admin) {
            return forbiddenResponse('Apenas administradores podem gerenciar veículos de leilões');
        }

        // 2. Obter IDs dos params
        const { id: auctionId, vehicleId } = await params;

        if (!auctionId || !vehicleId) {
            return errorResponse('ID do leilão e do veículo são obrigatórios', 400);
        }

        // 3. Instanciar dependências
        const vehicleRepository = new SupabaseVehicleRepository();
        const auctionRepository = new SupabaseAuctionRepository();
        const removeVehicleUseCase = new RemoveVehicleFromAuctionUseCase(
            vehicleRepository,
            auctionRepository
        );

        // 4. Executar use case
        await removeVehicleUseCase.execute(vehicleId);

        // 5. Retornar sucesso
        return successResponse({
            message: 'Veículo removido do leilão com sucesso',
        });

    } catch (error) {
        console.error('Error removing vehicle from auction:', error);

        const errorMessage = error instanceof Error ? error.message : 'Erro ao remover veículo do leilão';

        return errorResponse(errorMessage, 500);
    }
}
