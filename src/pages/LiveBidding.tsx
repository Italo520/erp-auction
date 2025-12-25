import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRepositories } from '../core/contexts/RepositoryContext';
import { Vehicle } from '../core/entities/Vehicle';
import { Bid } from '../core/entities/Bid';

const LiveBidding = () => {
  const { id } = useParams<{ id: string }>();
  const { vehicleRepo, bidRepo } = useRepositories();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [currentBid, setCurrentBid] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const loadInitialData = async () => {
      if (!id) return;
      try {
        const v = await vehicleRepo.findById(id);
        if (v) {
          setVehicle(v);
          setCurrentBid(v.currentBid || v.initialBid);
          
          const history = await bidRepo.findByVehicleId(id);
          setBids(history);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [id, vehicleRepo, bidRepo]);

  // Real-time Subscription
  useEffect(() => {
    if (!id) return;

    const unsubscribe = bidRepo.subscribeToVehicleBids(id, (newBid) => {
      setBids((prev) => [newBid, ...prev]);
      setCurrentBid(newBid.amount);
      
      // Flash effect or sound could go here
      console.log('New real-time bid:', newBid.amount);
    });

    return () => {
      unsubscribe();
    };
  }, [id, bidRepo]);

  const handleManualBid = async () => {
    if (!vehicle || !id) return;
    const nextAmount = currentBid + vehicle.minimumIncrement;
    
    try {
      // Optimistic update handled by subscription usually, but for manual action we can wait
      // In this mock, the create method triggers the change? 
      // Actually MockBidRepository.create returns the bid, but doesn't auto-trigger the subscription interval callback logic for *this* specific bid in the mock implementation (it's separate).
      // However, usually we just update state or wait for socket.
      // For this demo, let's create and push.
      const newBid = await bidRepo.create({
        auctionId: vehicle.auctionId || 'unknown',
        vehicleId: id,
        userId: 'admin-user',
        amount: nextAmount,
        channel: 'WEB',
        isCancelled: false
      });
      
      // Manually updating state for immediate feedback since mock subscription is interval-based noise
      setBids((prev) => [newBid, ...prev]);
      setCurrentBid(newBid.amount);
    } catch (e) {
      alert("Failed to place bid");
    }
  };

  if (loading) return <div className="flex h-full items-center justify-center text-white">Carregando lote...</div>;
  if (!vehicle) return <div className="flex h-full items-center justify-center text-white">Veículo não encontrado</div>;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark">
      {/* Top Header */}
      <header className="h-16 bg-card-dark border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0 z-10">
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2 text-sm">
            <a href="#" className="text-[#92a4c9] hover:text-white transition-colors">Home</a>
            <span className="text-slate-600">/</span>
            <a href="#" className="text-[#92a4c9] hover:text-white transition-colors">Leilões em Andamento</a>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Gerenciamento Lote #{vehicle.lotNumber}</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-full border border-red-500/20">
            <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">Ao Vivo</span>
          </div>
          <button className="text-[#92a4c9] hover:text-white transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 size-2 bg-primary rounded-full border-2 border-surface-dark"></span>
          </button>
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Vehicle List */}
        <div className="w-full max-w-sm border-r border-slate-800 bg-surface-darker flex flex-col hidden lg:flex">
          {/* Search & Filters */}
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-[20px]">search</span>
              <input className="w-full bg-slate-800/50 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:bg-slate-800 transition-all" placeholder="Buscar lote ou modelo..." type="text" />
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
              <button className="px-3 py-1 rounded-full bg-primary text-white text-xs font-medium whitespace-nowrap">Todos</button>
              <button className="px-3 py-1 rounded-full bg-slate-800 text-[#92a4c9] hover:text-white text-xs font-medium whitespace-nowrap transition-colors">Com Lances</button>
              <button className="px-3 py-1 rounded-full bg-slate-800 text-[#92a4c9] hover:text-white text-xs font-medium whitespace-nowrap transition-colors">Sem Lances</button>
            </div>
          </div>
          {/* List - Static for now in Mock, usually would map over all active vehicles */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex gap-3 p-4 border-l-4 border-primary bg-slate-800/30 cursor-pointer hover:bg-slate-800/50 transition-colors group">
              <div className="w-16 h-12 rounded bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${vehicle.images[0]?.url}")` }}></div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-primary mb-0.5">Lote #{vehicle.lotNumber}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-medium">04:20</span>
                </div>
                <h4 className="text-white text-sm font-medium truncate">{vehicle.make} {vehicle.model}</h4>
                <p className="text-[#92a4c9] text-xs">Maior lance: <span className="text-white font-medium">R$ {currentBid.toLocaleString()}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detail View */}
        <main className="flex-1 overflow-y-auto bg-background-dark p-4 md:p-8">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            
            {/* Vehicle Hero Card */}
            <div className="bg-card-dark rounded-xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-5/12 h-64 md:h-auto bg-cover bg-center relative group" style={{ backgroundImage: `url("${vehicle.images[0]?.url}")` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm border border-white/10">
                      <span className="material-symbols-outlined text-[14px] mr-1">photo_camera</span> {vehicle.images.length} Fotos
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-wide">Lote #{vehicle.lotNumber}</span>
                        <span className="text-slate-500 text-sm">Leilão de Veículos Recuperados</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white leading-tight">{vehicle.make} {vehicle.model} {vehicle.version}</h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-[#92a4c9]">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {vehicle.yearManufacture}/{vehicle.yearModel}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">speed</span> {vehicle.mileage.toLocaleString()} km</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">palette</span> {vehicle.color}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">local_gas_station</span> {vehicle.fuel}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col items-end">
                      <span className="text-xs text-[#92a4c9] uppercase tracking-wide font-semibold mb-1">Encerra em</span>
                      <div className="flex items-center gap-1 text-red-500 font-mono text-2xl font-bold bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                        <span className="material-symbols-outlined animate-pulse">timer</span> 00:04:20
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#92a4c9] mb-1">Lance Atual (Maior)</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">R$ {currentBid.toLocaleString('pt-BR')}</span>
                      </div>
                      {bids[0] && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="size-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                             {bids[0].userId.slice(0,2).toUpperCase()}
                          </div>
                          <span className="text-sm text-white">Usuário {bids[0].userId}</span>
                          <span className="text-xs text-green-500 bg-green-500/10 px-1.5 rounded ml-auto">Verificado</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-end gap-2">
                      <button 
                        onClick={handleManualBid}
                        className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
                      >
                        <span className="material-symbols-outlined">gavel</span> Registrar Lance (+R${vehicle.minimumIncrement})
                      </button>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-surface-darker border border-slate-700 hover:border-slate-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">pause</span> Pausar
                        </button>
                        <button className="flex-1 bg-surface-darker border border-red-500/30 hover:bg-red-500/10 text-red-400 text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">block</span> Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card-dark p-4 rounded-lg border border-slate-800 flex flex-col">
                <span className="text-xs text-[#92a4c9] uppercase font-medium">Total de Lances</span>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-white">{bids.length}</span>
                  <span className="text-xs text-green-500 flex items-center"><span className="material-symbols-outlined text-[14px]">trending_up</span> +5 min</span>
                </div>
              </div>
              <div className="bg-card-dark p-4 rounded-lg border border-slate-800 flex flex-col">
                <span className="text-xs text-[#92a4c9] uppercase font-medium">Visitantes Ativos</span>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-white">142</span>
                  <span className="text-xs text-slate-500">No lote</span>
                </div>
              </div>
              <div className="bg-card-dark p-4 rounded-lg border border-slate-800 flex flex-col">
                <span className="text-xs text-[#92a4c9] uppercase font-medium">Incremento Mínimo</span>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-white">R$ {vehicle.minimumIncrement}</span>
                  <button className="text-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                </div>
              </div>
              <div className="bg-card-dark p-4 rounded-lg border border-slate-800 flex flex-col">
                <span className="text-xs text-[#92a4c9] uppercase font-medium">Valor Inicial</span>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-white">R$ {vehicle.initialBid / 1000}k</span>
                  <span className="text-xs text-yellow-500">Ref</span>
                </div>
              </div>
            </div>

            {/* Bid History Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Histórico de Lances em Tempo Real</h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-green-500 font-medium uppercase">Conectado</span>
                </div>
              </div>
              <div className="bg-card-dark border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-darker text-[#92a4c9] uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">Valor do Lance</th>
                      <th className="px-6 py-4">Licitante</th>
                      <th className="px-6 py-4">Origem</th>
                      <th className="px-6 py-4">Data/Hora</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {bids.map((bid, index) => (
                      <tr key={bid.id} className={`${index === 0 ? 'bg-primary/5' : ''} hover:bg-slate-800/50 transition-colors group`}>
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          R$ {bid.amount.toLocaleString('pt-BR')}
                          {index === 0 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white uppercase">Vencendo</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                              {bid.userId.slice(0,2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">Usuário {bid.userId}</p>
                              <p className="text-xs text-slate-500">ID: #{bid.userId.split('-')[1] || '00'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-xs text-slate-400">
                            <span className="material-symbols-outlined text-[14px]">
                              {bid.channel === 'WEB' ? 'desktop_windows' : 'smartphone'}
                            </span> {bid.channel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors" title="Cancelar Lance">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {bids.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-slate-500">Aguardando lances...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveBidding;