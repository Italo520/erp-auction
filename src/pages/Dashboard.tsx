import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRepositories } from '../core/contexts/RepositoryContext';
import { Vehicle } from '../core/entities/Vehicle';
import { Bid } from '../core/entities/Bid';

const Dashboard = () => {
  const { auctionRepo, vehicleRepo, bidRepo } = useRepositories();
  const [activeVehicles, setActiveVehicles] = useState<Vehicle[]>([]);
  const [recentBids, setRecentBids] = useState<Bid[]>([]);
  const [stats, setStats] = useState({
    activeAuctions: 0,
    totalRevenue: 0,
    newUsers: 28, // Mocked for now
    pendingVehicles: 45 // Mocked for now
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active auctions count
        const activeAuctionsList = await auctionRepo.findActiveAuctions();
        
        // Fetch vehicles (simulating active lots)
        const vehiclesResult = await vehicleRepo.findAll({ page: 1, perPage: 5 });
        setActiveVehicles(vehiclesResult.data);

        // Calculate some simple stats
        const totalRevenue = vehiclesResult.data.reduce((acc, v) => acc + (v.currentBid || v.initialBid), 0);
        
        setStats(prev => ({
          ...prev,
          activeAuctions: activeAuctionsList.length,
          totalRevenue
        }));

        // Get some mock bids for the "Recent Activity" feed
        // In a real scenario, we'd have a global recent bids endpoint
        if (vehiclesResult.data.length > 0) {
            const vehicleId = vehiclesResult.data[0].id;
            const bids = await bidRepo.findByVehicleId(vehicleId, 3);
            setRecentBids(bids);
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, [auctionRepo, vehicleRepo, bidRepo]);

  return (
    <>
      {/* Top Header */}
      <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#101622]/90 backdrop-blur-md z-10 sticky top-0">
        <div className="flex-1 max-w-xl">
          <label className="flex w-full items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input className="block w-full rounded-lg border-0 bg-slate-100 dark:bg-[#1e293b] py-2.5 pl-10 pr-3 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-[#92a4c9] focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-shadow" placeholder="Buscar por ID, veículo ou usuário..." type="text" />
            </div>
          </label>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <button className="relative p-2 text-slate-500 hover:text-primary transition-colors dark:text-[#92a4c9] dark:hover:text-white">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#101622]"></span>
          </button>
          <Link to="/vehicle/new" className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="hidden sm:inline">Cadastrar Veículo</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
          
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Leilões Ativos</p>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold dark:text-white">{stats.activeAuctions}</h3>
                <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +2
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Receita Estimada</p>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold dark:text-white">R$ {(stats.totalRevenue / 1000).toFixed(1)}k</h3>
                <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +15%
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Novos Usuários</p>
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold dark:text-white">{stats.newUsers}</h3>
                <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +5
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Veículos Pendentes</p>
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                  <span className="material-symbols-outlined text-[20px]">directions_car</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold dark:text-white">{stats.pendingVehicles}</h3>
                <span className="text-slate-400 text-xs font-medium">Aguardando aprovação</span>
              </div>
            </div>
          </section>

          {/* Grid Split */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Table */}
            <div className="xl:col-span-2 flex flex-col rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h2 className="text-lg font-bold dark:text-white">Veículos em Destaque</h2>
                <Link to="/auctions" className="text-sm font-medium text-primary hover:text-blue-400">Ver todos</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-500 dark:text-[#92a4c9]">
                  <thead className="bg-slate-50 dark:bg-[#232f48] text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Veículo</th>
                      <th className="px-5 py-4">Lance Atual</th>
                      <th className="px-5 py-4">Ano</th>
                      <th className="px-5 py-4 text-center">Status</th>
                      <th className="px-5 py-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {activeVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-10 w-14 rounded bg-cover bg-center shrink-0" 
                              style={{ backgroundImage: `url("${vehicle.images[0]?.url || 'https://via.placeholder.com/150'}")` }}
                            ></div>
                            <div>
                              <Link to={`/live/${vehicle.id}`} className="font-medium text-slate-900 dark:text-white hover:text-primary hover:underline">
                                {vehicle.make} {vehicle.model}
                              </Link>
                              <div className="text-xs">{vehicle.version} • Lote #{vehicle.lotNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-mono font-medium text-slate-900 dark:text-white">
                          R$ {(vehicle.currentBid || vehicle.initialBid).toLocaleString('pt-BR')}
                        </td>
                        <td className="px-5 py-4 text-slate-500 dark:text-[#92a4c9]">
                          {vehicle.yearManufacture}/{vehicle.yearModel}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link to={`/live/${vehicle.id}`} className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">gavel</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {activeVehicles.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                          Nenhum veículo ativo encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="flex flex-col rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h2 className="text-lg font-bold dark:text-white">Lances Recentes</h2>
                <button className="text-slate-400 hover:text-white">
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                </button>
              </div>
              <div className="p-0 flex flex-col">
                {recentBids.map((bid) => (
                   <div key={bid.id} className="flex gap-4 p-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-[#232f48]/30 transition-colors">
                    <div className="relative">
                      <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                         {bid.userId.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-[#1e293b]">
                        <span className="material-symbols-outlined text-white text-[10px] font-bold block">attach_money</span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-1">
                      <p className="text-sm dark:text-white"><span className="font-bold">Usuário {bid.userId}</span> ofertou <span className="text-emerald-500 font-bold">R$ {bid.amount.toLocaleString('pt-BR')}</span></p>
                      <p className="text-xs text-slate-500 dark:text-[#92a4c9]">Veículo ID: {bid.vehicleId}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mt-1">
                        {new Date(bid.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}

                {recentBids.length === 0 && (
                   <div className="flex gap-4 p-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-[#232f48]/30 transition-colors">
                    <div className="relative">
                      <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDixfyc0IDh3AYhkOG9kTpWepIw6YCpqjFU5T4847jz2Tf1j9C5kGH0pMdcnfDfKowbqrKsDSWtfEWyQd6E7zuEgBDPs4XSTH7giZJLckm_CTuapTf7i5p4GT4R6l4jIWY02NXCg3Ej-iW3IxD4fytcXVms-9ABFjKHS2Vhzk9AjWU-TsmI5nauZ8lhjZBOnoYcbDnIlyU11nmPTBq3jXjRmLntRi-Zy_XUdz9QpytkAjBjR8ChUurhS5yF_BowYTqsUFPhxj6vMEDy")' }}></div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-[#1e293b]">
                        <span className="material-symbols-outlined text-white text-[10px] font-bold block">person_add</span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-1">
                      <p className="text-sm dark:text-white"><span className="font-bold">Maria L.</span> criou uma conta</p>
                      <p className="text-xs text-slate-500 dark:text-[#92a4c9]">Novo usuário verificado</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mt-1">Há 15 min</p>
                    </div>
                  </div>
                )}
               
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-center">
                <button className="text-xs font-bold text-primary hover:text-white transition-colors uppercase tracking-wide">
                  Ver histórico completo
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-12 mb-6 text-center text-xs text-slate-500 dark:text-slate-600">
          © 2023 Leilões 083 Admin. Todos os direitos reservados.
        </footer>
      </div>
    </>
  );
};

export default Dashboard;