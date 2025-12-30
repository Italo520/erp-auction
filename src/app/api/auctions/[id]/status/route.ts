import { NextRequest } from 'next/server';
import { requireAdmin } from '@/app/api/middleware/auth';
import { successResponse, errorResponse, forbiddenResponse, validationErrorResponse } from '@/app/api/utils/response';
import { SupabaseAuctionRepository } from '@/infrastructure/repositories/SupabaseAuctionRepository';
import { AuctionStatus } from '@/core/entities/Auction';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        // 1. Validar permissão de admin
        const admin = await requireAdmin(request);

        if (!admin) {
            return forbiddenResponse('Apenas administradores podem alterar o status do leilão');
        }

        // 2. Obter ID do leilão
        const { id } = await params;

        if (!id) {
            return errorResponse('ID do leilão é obrigatório', 400);
        }

        // 3. Parse do body
        const body = await request.json();
        const { status } = body;

        // 4. Validar status
        const validStatuses: AuctionStatus[] = ['DRAFT', 'SCHEDULED', 'ACTIVE', 'PAUSED', 'FINISHED', 'CANCELLED'];

        if (!status || !validStatuses.includes(status)) {
            return validationErrorResponse({
                status: `Status inválido. Valores permitidos: ${validStatuses.join(', ')}`,
            });
        }

        // 5. Instanciar repositório
        const auctionRepository = new SupabaseAuctionRepository();

        // 6. Atualizar status
        const updatedAuction = await auctionRepository.update(id, { status });

        // 7. Retornar sucesso
        return successResponse({
            auction: updatedAuction,
            message: `Status do leilão atualizado para ${status}`,
        });

    } catch (error) {
        console.error('Error updating auction status:', error);

        const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar status do leilão';

        return errorResponse(errorMessage, 500);
    }
}
