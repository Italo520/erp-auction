import { supabase } from '@/infrastructure/api/supabaseClient';

export class SupabaseStorageService {
  private bucket = 'vehicles';

  /**
   * Faz upload da imagem de um veículo organizando por pasta do ID.
   */
  async uploadVehicleImage(file: File, vehicleId: string): Promise<string> {
    try {
      // Sanitiza o nome do arquivo e cria o caminho: vehicleId/timestamp-nome.ext
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${vehicleId}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(this.bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      return this.getImageUrl(data.path);
    } catch (error) {
      console.error('Erro no upload:', error);
      throw new Error('Falha ao fazer upload da imagem do veículo.');
    }
  }

  /**
   * Remove uma imagem do bucket baseada na URL pública.
   */
  async deleteVehicleImage(imageUrl: string): Promise<void> {
    try {
      // Extrai o caminho relativo do arquivo a partir da URL completa
      const path = this.extractPathFromUrl(imageUrl);

      if (!path) {
        console.warn('URL inválida ou arquivo não pertence a este bucket:', imageUrl);
        return;
      }

      const { error } = await supabase.storage
        .from(this.bucket)
        .remove([path]);

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      throw new Error('Falha ao remover imagem do armazenamento.');
    }
  }

  /**
   * Gera a URL pública para um caminho específico.
   */
  getImageUrl(path: string): string {
    const { data } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  /**
   * Lista todas as URLs de imagens de uma pasta de veículo específica.
   */
  async listVehicleImages(vehicleId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .list(vehicleId, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) throw error;

      // Retorna array vazio se não houver dados, senão mapeia para URLs completas
      return data
        ? data.map((file: { name: string }) => this.getImageUrl(`${vehicleId}/${file.name}`))
        : [];
    } catch (error) {
      console.error('Erro ao listar imagens:', error);
      return []; // Retorna vazio em caso de erro para não quebrar a UI
    }
  }

  /**
   * Helper privado para extrair o caminho do arquivo (path) de uma URL pública do Supabase.
   */
  private extractPathFromUrl(url: string): string | null {
    try {
      const targetStr = `/storage/v1/object/public/${this.bucket}/`;
      const index = url.indexOf(targetStr);

      if (index !== -1) {
        return url.substring(index + targetStr.length);
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
