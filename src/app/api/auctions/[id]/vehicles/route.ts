import { NextRequest } from 'next/server';
import { requireAdmin } from '@/app/api/middleware/auth';
import { successResponse, errorResponse, forbiddenResponse, validationErrorResponse } from '@/app/api/utils/response';
import { AddVehiclesToAuctionUseCase } from '@/core/usecases/auctions/AddVehiclesToAuctionUseCase';
import { SupabaseVehicleRepository } from '@/infrastructure/repositories/SupabaseVehicleRepository';
import { SupabaseAuctionRepository } from '@/infrastructure/repositories/SupabaseAuctionRepository';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

/**
 * POST /api/auctions/[id]/vehicles
 * Adiciona múltiplos veículos a um leilão
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        // 1. Validar permissão de admin
        const admin = await requireAdmin(request);

        if (!admin) {
            return forbiddenResponse('Apenas administradores podem gerenciar veículos de leilões');
        }

        // 2. Obter ID do leilão
        const { id: auctionId } = await params;

        if (!auctionId) {
            return errorResponse('ID do leilão é obrigatório', 400);
        }

        // 3. Parse do body
        const body = await request.json();
        const { vehicleIds } = body;

        // 4. Validar vehicleIds
        if (!vehicleIds || !Array.isArray(vehicleIds) || vehicleIds.length === 0) {
            return validationErrorResponse({
                vehicleIds: 'É necessário fornecer pelo menos um ID de veículo',
            });
        }

        // 5. Instanciar dependências
        const vehicleRepository = new SupabaseVehicleRepository();
        const auctionRepository = new SupabaseAuctionRepository();
        const addVehiclesUseCase = new AddVehiclesToAuctionUseCase(
            vehicleRepository,
            auctionRepository
        );

        // 6. Executar use case
        const updatedVehicles = await addVehiclesUseCase.execute(auctionId, vehicleIds);

        // 7. Retornar sucesso
        return successResponse(
            {
                vehicles: updatedVehicles,
                total: updatedVehicles.length,
                message: `${updatedVehicles.length} veículo(s) adicionado(s) com sucesso`,
            },
            201
        );

    } catch (error) {
        console.error('Error adding vehicles to auction:', error);

        const errorMessage = error instanceof Error ? error.message : 'Erro ao adicionar veículos ao leilão';

        return errorResponse(errorMessage, 500);
    }
}
