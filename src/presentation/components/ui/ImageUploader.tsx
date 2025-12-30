import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, FileImage, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export interface ImageUploaderProps {
    onUpload: (file: File) => Promise<string>;
    onDelete?: (url: string) => Promise<void>;
    maxSize?: number; // in bytes, default 5MB
    acceptedTypes?: string[]; // default ['image/jpeg', 'image/png', 'image/webp']
    multiple?: boolean;
    className?: string;
    initialImages?: string[];
    disabled?: boolean;
}

interface FileState {
    id: string;
    file?: File;
    url: string;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    error?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    onUpload,
    onDelete,
    maxSize = 5 * 1024 * 1024, // 5MB
    acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    multiple = false,
    className,
    initialImages = [],
    disabled = false
}) => {
    const [files, setFiles] = useState<FileState[]>(() =>
        initialImages.map(url => ({
            id: Math.random().toString(36).substring(7),
            url,
            status: 'success',
            progress: 100
        }))
    );
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        if (!acceptedTypes.includes(file.type)) {
            return `Tipo de arquivo inválido. Aceitos: ${acceptedTypes.map(t => t.split('/')[1]).join(', ')}`;
        }
        if (file.size > maxSize) {
            return `Arquivo muito grande. Máximo: ${maxSize / 1024 / 1024}MB`;
        }
        return null;
    };

    const handleFiles = async (newFiles: File[]) => {
        if (disabled) return;

        const filesToUpload: FileState[] = [];

        for (const file of newFiles) {
            const error = validateFile(file);
            const id = Math.random().toString(36).substring(7);
            const previewUrl = URL.createObjectURL(file);

            filesToUpload.push({
                id,
                file,
                url: previewUrl,
                status: error ? 'error' : 'pending',
                progress: 0,
                error: error || undefined
            });
        }

        if (!multiple) {
            // If not multiple, replace existing files or just take the first one
            // But we might want to keep successful uploads? 
            // Usually single upload replaces the previous one.
            // Let's assume single upload replaces everything for now if we are in single mode.
            setFiles(filesToUpload.slice(0, 1));
        } else {
            setFiles(prev => [...prev, ...filesToUpload]);
        }

        // Trigger uploads for pending files
        filesToUpload.forEach(fileState => {
            if (fileState.status === 'pending' && fileState.file) {
                uploadFile(fileState.id, fileState.file);
            }
        });
    };

    const uploadFile = async (id: string, file: File) => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'uploading' } : f));

        // Simulate progress since we don't have real progress callback from the service yet
        const progressInterval = setInterval(() => {
            setFiles(prev => prev.map(f => {
                if (f.id === id && f.status === 'uploading') {
                    return { ...f, progress: Math.min(f.progress + 10, 90) };
                }
                return f;
            }));
        }, 200);

        try {
            const url = await onUpload(file);
            clearInterval(progressInterval);
            setFiles(prev => prev.map(f =>
                f.id === id ? { ...f, status: 'success', progress: 100, url } : f
            ));
        } catch (error) {
            clearInterval(progressInterval);
            setFiles(prev => prev.map(f =>
                f.id === id ? { ...f, status: 'error', progress: 0, error: 'Falha no upload' } : f
            ));
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (disabled) return;

        const fileToDelete = files.find(f => f.id === id);
        if (!fileToDelete) return;

        if (fileToDelete.status === 'success' && onDelete) {
            try {
                await onDelete(fileToDelete.url);
            } catch (error) {
                console.error('Error deleting file:', error);
                // Optional: show error to user
                return;
            }
        }

        setFiles(prev => prev.filter(f => f.id !== id));
        if (fileToDelete.file) {
            URL.revokeObjectURL(fileToDelete.url);
        }
    };

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles);
        }
    }, [disabled, multiple]);

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={cn("w-full space-y-4", className)}>
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center cursor-pointer group",
                    isDragging
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                    disabled && "opacity-50 cursor-not-allowed hover:border-slate-200 dark:hover:border-slate-700 hover:bg-transparent"
                )}
                onClick={() => !disabled && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple={multiple}
                    accept={acceptedTypes.join(',')}
                    onChange={onFileInputChange}
                    disabled={disabled}
                />

                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className={cn(
                        "p-4 rounded-full bg-slate-100 dark:bg-slate-800 transition-colors duration-200",
                        isDragging && "bg-primary/10 text-primary"
                    )}>
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            <span className="text-primary">Clique para upload</span> ou arraste e solte
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')} (max. {maxSize / 1024 / 1024}MB)
                        </p>
                    </div>
                </div>
            </div>

            {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className={cn(
                                "relative flex items-center p-3 rounded-lg border bg-white dark:bg-[#111722] transition-all",
                                file.status === 'error' ? "border-red-200 dark:border-red-900/50" : "border-slate-200 dark:border-slate-700"
                            )}
                        >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-100 dark:border-slate-800">
                                {file.file && file.file.type.startsWith('image/') || file.url ? (
                                    <img
                                        src={file.url}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-slate-800">
                                        <FileImage className="h-8 w-8 text-slate-400" />
                                    </div>
                                )}

                                {file.status === 'uploading' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    </div>
                                )}
                            </div>

                            <div className="ml-3 flex-1 overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                                        {file.file ? file.file.name : 'Imagem carregada'}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(file.id);
                                        }}
                                        className="ml-2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 transition-colors"
                                        disabled={disabled || file.status === 'uploading'}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="mt-2">
                                    {file.status === 'uploading' && (
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                            <div
                                                className="h-full bg-primary transition-all duration-300 ease-out"
                                                style={{ width: `${file.progress}%` }}
                                            />
                                        </div>
                                    )}

                                    {file.status === 'error' && (
                                        <div className="flex items-center text-xs text-red-500">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {file.error}
                                        </div>
                                    )}

                                    {file.status === 'success' && (
                                        <div className="flex items-center text-xs text-green-500">
                                            <CheckCircle2 className="mr-1 h-3 w-3" />
                                            Upload concluído
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
