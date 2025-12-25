import React, { useRef } from 'react';
import { VehicleImageUploadProps } from './vehicles.types';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export const VehicleImageUpload: React.FC<VehicleImageUploadProps> = ({ images, onUpload, onRemove }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(Array.from(e.target.files));
        }
    };

    return (
        <div className="space-y-4">
            <div
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                    <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Clique para fazer upload</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">SVG, PNG, JPG ou GIF (max. 10MB)</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative group aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />

                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
