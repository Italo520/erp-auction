import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/app/api/utils/response';
import { SupabaseVehicleRepository } from '@/infrastructure/repositories/SupabaseVehicleRepository';
import { VehicleStatus } from '@/core/entities/Vehicle';

/**
 * GET /api/vehicles
 * Lista veículos com filtros e paginação
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const auctionId = searchParams.get('auctionId') || undefined;
        const status = searchParams.get('status') as VehicleStatus || undefined;
        const make = searchParams.get('make') || undefined;
        const model = searchParams.get('model') || undefined;
        const search = searchParams.get('search') || undefined;

        const vehicleRepository = new SupabaseVehicleRepository();

        const result = await vehicleRepository.findAll({
            page,
            limit,
            auctionId,
            status,
            make,
            model,
            search
        });

        return successResponse(result);

    } catch (error) {
        console.error('Error fetching vehicles:', error);

        const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar veículos';

        return errorResponse(errorMessage, 500);
    }
}
