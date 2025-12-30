import { supabase } from '@/infrastructure/api/supabaseClient';

export class SupabaseStorageService {
  private readonly bucket = 'vehicles';

  async uploadVehicleImage(file: File, vehicleId: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${vehicleId}/${fileName}`;

      const { error } = await supabase.storage
        .from(this.bucket)
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      return this.getImageUrl(filePath);
    } catch (error) {
      console.error('Error uploading vehicle image:', error);
      throw error;
    }
  }

  async deleteVehicleImage(imageUrl: string): Promise<void> {
    try {
      // Extract path from URL
      // URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
      const path = imageUrl.split(`${this.bucket}/`).pop();

      if (!path) {
        throw new Error('Invalid image URL');
      }

      const { error } = await supabase.storage
        .from(this.bucket)
        .remove([path]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting vehicle image:', error);
      throw error;
    }
  }

  getImageUrl(path: string): string {
    const { data } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async listVehicleImages(vehicleId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .list(vehicleId);

      if (error) {
        throw error;
      }

      return data
        .filter((item) => item.name !== '.emptyFolderPlaceholder') // Filter out placeholders if any
        .map((item) => this.getImageUrl(`${vehicleId}/${item.name}`));
    } catch (error) {
      console.error('Error listing vehicle images:', error);
      throw error;
    }
  }
}
