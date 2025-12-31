import { NextRequest } from 'next/server';
import { requireAuth } from '@/app/api/middleware/auth';
import { successResponse, errorResponse, unauthorizedResponse, validationErrorResponse } from '@/app/api/utils/response';
import { CreateAuctionUseCase } from '@/core/usecases/auctions/CreateAuctionUseCase';
import { SupabaseAuctionRepository } from '@/infrastructure/repositories/SupabaseAuctionRepository';
import { AuctionStatus } from '@/core/entities/Auction';

export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth(request);
        if (!user) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const { name, description, startDateTime, endDateTime, location } = body;

        const errors: Record<string, string> = {};
        if (!name) errors.name = 'Nome é obrigatório';
        if (!startDateTime) errors.startDateTime = 'Data de início é obrigatória';
        if (!endDateTime) errors.endDateTime = 'Data de término é obrigatória';

        if (Object.keys(errors).length > 0) {
            return validationErrorResponse(errors);
        }

        const auctionRepo = new SupabaseAuctionRepository();
        const createUseCase = new CreateAuctionUseCase(auctionRepo);

        const auction = await createUseCase.execute({
            name,
            description,
            startDateTime: new Date(startDateTime),
            endDateTime: new Date(endDateTime),
            status: AuctionStatus.DRAFT,
            location,
            itemsCount: 0,
            totalEstimatedValue: 0
        });

        return successResponse({ auction }, 201);
    } catch (error) {
        console.error('Error creating auction:', error);
        return errorResponse(error instanceof Error ? error.message : 'Erro ao criar leilão');
    }
}
