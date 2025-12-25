import { AppError } from './AppError';

export class ErrorHandler {
    public static handle(error: unknown): { message: string; statusCode: number } {
        if (error instanceof AppError) {
            return {
                message: error.message,
                statusCode: error.statusCode,
            };
        }

        if (error instanceof Error) {
            // Logar erro desconhecido para monitoramento
            console.error('Unexpected error:', error);
            return {
                message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
                statusCode: 500
            };
        }

        return {
            message: 'Erro desconhecido',
            statusCode: 500
        };
    }
}
