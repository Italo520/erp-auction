import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/app/api/utils/response';
import { SupabaseVehicleRepository } from '@/infrastructure/repositories/SupabaseVehicleRepository';

/**
 * GET /api/vehicles/available
 * Retorna veículos disponíveis (sem leilão associado)
 */
export async function GET(request: NextRequest) {
    try {
        const vehicleRepository = new SupabaseVehicleRepository();

        const vehicles = await vehicleRepository.findAvailableVehicles();

        return successResponse({
            vehicles,
            total: vehicles.length,
        });

    } catch (error) {
        console.error('Error fetching available vehicles:', error);

        const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar veículos disponíveis';

        return errorResponse(errorMessage, 500);
    }
}
