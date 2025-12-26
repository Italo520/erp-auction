import React from 'react';
import { Vehicle } from '@/core/entities/Vehicle';
import { Fuel, Settings, Gauge, Calendar, Hash, FileText, MapPin } from 'lucide-react';

interface VehicleSpecsProps {
    vehicle: Vehicle;
}

export const VehicleSpecs: React.FC<VehicleSpecsProps> = ({ vehicle }) => {
    const specs = [
        { label: 'Combustível', value: vehicle.fuel, icon: <Fuel size={18} /> },
        { label: 'Câmbio', value: vehicle.transmission, icon: <Settings size={18} /> },
        { label: 'Quilometragem', value: `${vehicle.mileage.toLocaleString()} km`, icon: <Gauge size={18} /> },
        { label: 'Cor', value: vehicle.color, icon: <div className="w-4 h-4 rounded-full bg-slate-400" style={{ backgroundColor: vehicle.color.toLowerCase() }} /> }, // Fallback to icon if needed, but color circle is nice
        { label: 'Final da Placa', value: vehicle.plateEnd, icon: <Hash size={18} /> },
        { label: 'Chassi (VIN)', value: vehicle.chassisNumber, icon: <FileText size={18} />, fullWidth: true },
        { label: 'Localização', value: `${vehicle.locationCity || '--'} - ${vehicle.locationState || '--'}`, icon: <MapPin size={18} />, fullWidth: true },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Ficha Técnica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {specs.map((spec, index) => (
                    <div key={index} className={`flex items-start gap-3 ${spec.fullWidth ? 'md:col-span-2' : ''}`}>
                        <div className="mt-0.5 text-slate-400">
                            {spec.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{spec.value || '--'}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{spec.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
