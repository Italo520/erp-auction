import { supabase } from '../api/supabaseClient';

export interface UploadResult {
    path: string;
    url: string;
}

export class SupabaseStorageService {
    constructor(private bucket: string = 'vehicles') { }

    /**
     * Faz o upload de um arquivo para o Supabase Storage.
     * @param file O arquivo a ser enviado (File object).
     * @param path O caminho opcional (pasta/nome). Se não fornecido, gera um nome único.
     */
    async upload(file: File, path?: string): Promise<UploadResult> {
        try {
            const fileName = path || `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

            const { data, error } = await supabase.storage
                .from(this.bucket)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                throw error;
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(this.bucket)
                .getPublicUrl(data.path);

            return {
                path: data.path,
                url: publicUrl
            };
        } catch (error) {
            console.error('Erro no upload:', error);
            throw new Error('Falha ao fazer upload da imagem.');
        }
    }

    /**
     * Remove um arquivo do bucket.
     * @param path Caminho do arquivo no bucket.
     */
    async delete(path: string): Promise<void> {
        const { error } = await supabase.storage
            .from(this.bucket)
            .remove([path]);

        if (error) {
            throw error;
        }
    }
}
