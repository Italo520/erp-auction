import React, { useState } from 'react';
import { VehicleImage } from '@/core/entities/Vehicle';
import { cn } from '@/shared/utils/cn';
import { Image as ImageIcon } from 'lucide-react';

interface VehicleGalleryProps {
    images: VehicleImage[];
}

export const VehicleGallery: React.FC<VehicleGalleryProps> = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                <div className="flex flex-col items-center gap-2">
                    <ImageIcon size={48} />
                    <span className="text-sm">Sem imagens</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
                <img
                    src={images[selectedIndex].url}
                    alt={`Vehicle image ${selectedIndex + 1}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                    <button
                        key={img.id}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            "flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all",
                            selectedIndex === index
                                ? "border-primary"
                                : "border-transparent opacity-70 hover:opacity-100"
                        )}
                    >
                        <img
                            src={img.url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
