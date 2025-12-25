import React from 'react';
import { Button } from '../../ui/Button/Button';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface VehicleActionsProps {
    onEdit: () => void;
    onDelete: () => void;
    onBack: () => void;
}

export const VehicleActions: React.FC<VehicleActionsProps> = ({ onEdit, onDelete, onBack }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={onBack} className="pl-0 hover:bg-transparent hover:text-primary">
                <ArrowLeft size={18} className="mr-2" />
                Voltar
            </Button>

            <div className="flex gap-2">
                <Button variant="outline" onClick={onEdit}>
                    <Edit size={16} className="mr-2" />
                    Editar
                </Button>
                <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30" onClick={onDelete}>
                    <Trash2 size={16} className="mr-2" />
                    Excluir
                </Button>
            </div>
        </div>
    );
};
