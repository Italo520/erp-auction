import React from 'react';
import { Vehicle } from '../../../../../core/entities/Vehicle';
import { Badge } from '../../ui/Badge/Badge'; // Assumindo que Badge existe ou usaremos span estilizado se não existir (nao vi Badge na lista de arquivos, vou usar span estilizado como no AuctionCard por segurança, ou criar Badge dps)
import { formatCurrency } from '../../../../../shared/utils/formatters';

interface VehicleInfoProps {
    vehicle: Vehicle;
}

export const VehicleInfo: React.FC<VehicleInfoProps> = ({ vehicle }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case 'SOLD': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case 'UNSOLD': return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
        }
    };

    const statusLabel: Record<string, string> = {
        'DRAFT': 'Rascunho',
        'PUBLISHED': 'Publicado',
        'SOLD': 'Vendido',
        'UNSOLD': 'Não Vendido',
        'WITHDRAWN': 'Retirado'
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${getStatusColor(vehicle.status)}`}>
                        {statusLabel[vehicle.status] || vehicle.status}
                    </span>
                    <span className="text-sm text-slate-500">ID: {vehicle.id.slice(0, 8)}</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {vehicle.make} {vehicle.model} <span className="text-slate-400 font-normal">{vehicle.version}</span>
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">
                    {vehicle.yearManufacture}/{vehicle.yearModel}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-200 dark:border-slate-800">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Lance Inicial</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(vehicle.initialBid)}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Incremento Mínimo</p>
                    <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                        {formatCurrency(vehicle.minimumIncrement)}
                    </p>
                </div>
            </div>

            {vehicle.description && (
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Descrição</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {vehicle.description}
                    </p>
                </div>
            )}
        </div>
    );
};
