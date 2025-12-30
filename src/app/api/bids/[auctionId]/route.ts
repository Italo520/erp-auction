import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/app/api/utils/response';
import { GetAuctionBidsUseCase } from '@/core/usecases/bidding/GetAuctionBidsUseCase';
import { SupabaseBidRepository } from '@/infrastructure/repositories/SupabaseBidRepository';

interface RouteParams {
    params: Promise<{
        auctionId: string;
    }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        // 1. Obter auctionId dos params
        const { auctionId } = await params;

        if (!auctionId) {
            return errorResponse('ID do leilão é obrigatório', 400);
        }

        // 2. Instanciar dependências
        const bidRepository = new SupabaseBidRepository();
        const getAuctionBidsUseCase = new GetAuctionBidsUseCase(bidRepository);

        // 3. Executar use case
        const bids = await getAuctionBidsUseCase.execute(auctionId);

        // 4. Retornar dados
        return successResponse({
            bids,
            total: bids.length,
        });

    } catch (error) {
        console.error('Error fetching bids:', error);

        const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar lances';

        return errorResponse(errorMessage, 500);
    }
}
