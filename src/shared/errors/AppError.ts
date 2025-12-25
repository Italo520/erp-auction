export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 400, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Recurso não encontrado') {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Não autorizado') {
        super(message, 401);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Dados inválidos') {
        super(message, 422);
    }
}
