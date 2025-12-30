import { NextRequest } from 'next/server';
import { requireAuth } from '@/app/api/middleware/auth';
import { successResponse, errorResponse, unauthorizedResponse, validationErrorResponse } from '@/app/api/utils/response';
import { PlaceBidUseCase } from '@/core/usecases/bidding/PlaceBidUseCase';
import { SupabaseBidRepository } from '@/infrastructure/repositories/SupabaseBidRepository';
import { SupabaseAuctionRepository } from '@/infrastructure/repositories/SupabaseAuctionRepository';

export async function POST(request: NextRequest) {
    try {
        // 1. Validar autenticação
        const user = await requireAuth(request);

        if (!user) {
            return unauthorizedResponse('Você precisa estar autenticado para dar lances');
        }

        // 2. Parse do body
        const body = await request.json();
        const { auctionId, amount } = body;

        // 3. Validações básicas
        const errors: Record<string, string> = {};

        if (!auctionId) {
            errors.auctionId = 'ID do leilão é obrigatório';
        }

        if (!amount || amount <= 0) {
            errors.amount = 'Valor do lance deve ser maior que zero';
        }

        if (Object.keys(errors).length > 0) {
            return validationErrorResponse(errors);
        }

        // 4. Instanciar dependências
        const bidRepository = new SupabaseBidRepository();
        const auctionRepository = new SupabaseAuctionRepository();
        const placeBidUseCase = new PlaceBidUseCase(bidRepository, auctionRepository);

        // 5. Executar use case
        const bid = await placeBidUseCase.execute({
            auctionId,
            userId: user.id,
            amount: Number(amount),
        });

        // 6. Retornar sucesso
        return successResponse(
            {
                bid,
                message: 'Lance realizado com sucesso!',
            },
            201
        );

    } catch (error) {
        console.error('Error placing bid:', error);

        const errorMessage = error instanceof Error ? error.message : 'Erro ao processar lance';

        return errorResponse(errorMessage, 500);
    }
}
