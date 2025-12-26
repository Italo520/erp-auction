import { ApiError } from './ApiError';
import { ApiRequestOptions, ApiResponse } from '@/shared/types/api.types';

const BASE_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class HttpClient {
  private static async request<T>(endpoint: string, method: string, body?: unknown, options: ApiRequestOptions = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Adicionar token de auth se existir (exemplo)
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      Object.assign(headers, { Authorization: `Bearer ${token}` });
    }

    try {
      const response = await fetch(`${BASE_url}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: options.signal,
      });

      if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, 'HTTP_ERROR', response.status);
      }

      const responseData: ApiResponse<T> = await response.json();

      if (!responseData.success && responseData.error) {
        throw new ApiError(responseData.error.message, responseData.error.code, response.status, responseData.error.details);
      }

      return responseData.data as T;
    } catch (error) {
      throw ApiError.fromError(error);
    }
  }

  static get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, options);
  }

  static post<T>(endpoint: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, 'POST', body, options);
  }

  static put<T>(endpoint: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, 'PUT', body, options);
  }

  static delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, options);
  }
}