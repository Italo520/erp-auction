import { NextResponse } from 'next/server';

/**
 * Resposta de sucesso padronizada
 */
export function successResponse<T>(data: T, status: number = 200) {
    return NextResponse.json(
        {
            success: true,
            data,
        },
        { status }
    );
}

/**
 * Resposta de erro padronizada
 */
export function errorResponse(message: string, status: number = 400) {
    return NextResponse.json(
        {
            success: false,
            error: message,
        },
        { status }
    );
}

/**
 * Resposta de erro de validação (422)
 */
export function validationErrorResponse(errors: Record<string, string>) {
    return NextResponse.json(
        {
            success: false,
            error: 'Erro de validação',
            validationErrors: errors,
        },
        { status: 422 }
    );
}

/**
 * Resposta de não autorizado (401)
 */
export function unauthorizedResponse(message: string = 'Não autorizado') {
    return errorResponse(message, 401);
}

/**
 * Resposta de proibido (403)
 */
export function forbiddenResponse(message: string = 'Acesso negado') {
    return errorResponse(message, 403);
}

/**
 * Resposta de não encontrado (404)
 */
export function notFoundResponse(message: string = 'Recurso não encontrado') {
    return errorResponse(message, 404);
}
