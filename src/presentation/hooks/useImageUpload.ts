import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { IStorageService } from '@/core/interfaces/IStorageService';

export interface ImageUploadOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
    maxRetries?: number;
    retryDelay?: number;
}

export interface UseImageUploadReturn {
    isUploading: boolean;
    error: string | null;
    progress: number;
    uploadImage: (file: File, path: string) => Promise<string | null>;
    resetState: () => void;
}

const defaultOptions: ImageUploadOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    maxRetries: 3,
    retryDelay: 1500, // 1.5 seconds
};

/**
 * Hook personalizado para gerenciar upload de imagens com compressão e retry
 * @param storageService - Serviço de armazenamento que implementa IStorageService
 * @param options - Opções de compressão e retry
 */
export function useImageUpload(
    storageService: IStorageService,
    options: ImageUploadOptions = {}
): UseImageUploadReturn {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const config = { ...defaultOptions, ...options };

    /**
     * Comprime uma imagem usando browser-image-compression
     */
    const compressImage = async (file: File): Promise<File> => {
        try {
            // Verifica se é uma imagem
            if (!file.type.startsWith('image/')) {
                throw new Error('O arquivo não é uma imagem válida');
            }

            setProgress(10);

            const compressedFile = await imageCompression(file, {
                maxSizeMB: config.maxSizeMB!,
                maxWidthOrHeight: config.maxWidthOrHeight!,
                useWebWorker: config.useWebWorker!,
                onProgress: (progressPercent) => {
                    // Progresso da compressão: 10% a 40%
                    setProgress(10 + Math.floor(progressPercent * 0.3));
                },
            });

            setProgress(40);

            console.log(`Imagem comprimida: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);

            return compressedFile;
        } catch (err) {
            console.error('Erro ao comprimir imagem:', err);
            throw new Error('Falha ao comprimir a imagem. Tente novamente.');
        }
    };

    /**
     * Função auxiliar que faz upload com retry
     */
    const uploadWithRetry = async (file: File, path: string): Promise<string> => {
        let lastError: Error | null = null;
        const maxRetries = config.maxRetries!;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                setProgress(40 + Math.floor((attempt - 1) / maxRetries * 50));

                const url = await storageService.upload(file, path);

                setProgress(100);
                return url;
            } catch (err) {
                lastError = err instanceof Error ? err : new Error('Erro desconhecido no upload');
                console.warn(`Tentativa ${attempt} de ${maxRetries} falhou:`, lastError.message);

                // Se ainda há tentativas restantes, aguarda antes de tentar novamente
                if (attempt < maxRetries) {
                    await new Promise((resolve) => setTimeout(resolve, config.retryDelay!));
                }
            }
        }

        // Se chegou aqui, todas as tentativas falharam
        throw new Error(`Falha no upload após ${maxRetries} tentativas: ${lastError?.message}`);
    };

    /**
     * Função principal de upload de imagem
     */
    const uploadImage = useCallback(
        async (file: File, path: string): Promise<string | null> => {
            // Reset de estados
            setError(null);
            setIsUploading(true);
            setProgress(0);

            try {
                // Etapa 1: Compressão
                const compressedFile = await compressImage(file);

                // Etapa 2: Upload com retry
                const url = await uploadWithRetry(compressedFile, path);

                setIsUploading(false);
                return url;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao fazer upload';
                setError(errorMessage);
                setIsUploading(false);
                setProgress(0);
                console.error('Erro no upload de imagem:', err);
                return null;
            }
        },
        [storageService, config]
    );

    /**
     * Reseta o estado do hook
     */
    const resetState = useCallback(() => {
        setError(null);
        setIsUploading(false);
        setProgress(0);
    }, []);

    return {
        isUploading,
        error,
        progress,
        uploadImage,
        resetState,
    };
}
