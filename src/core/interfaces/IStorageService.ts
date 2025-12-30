/**
 * Interface para serviços de armazenamento de arquivos.
 * Segue os princípios de Clean Architecture, permitindo
 * desacoplar a implementação concreta do storage.
 */
export interface IStorageService {
    /**
     * Faz upload de um arquivo para o storage.
     * @param file - Arquivo a ser enviado
     * @param path - Caminho onde o arquivo será armazenado
     * @returns Promise com a URL pública do arquivo
     */
    upload(file: File, path: string): Promise<string>;

    /**
     * Remove um arquivo do storage.
     * @param url - URL pública do arquivo a ser removido
     * @returns Promise void
     */
    delete(url: string): Promise<void>;

    /**
     * Obtém a URL pública de um arquivo.
     * @param path - Caminho do arquivo no storage
     * @returns URL pública do arquivo
     */
    getUrl(path: string): string;
}
