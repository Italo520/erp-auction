import React from 'react';

const LiveBidding = () => {
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
            <span className="text-white font-medium">Gerenciamento Lote #124</span>
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
          {/* List */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex gap-3 p-4 border-l-4 border-primary bg-slate-800/30 cursor-pointer hover:bg-slate-800/50 transition-colors group">
              <div className="w-16 h-12 rounded bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIj-VXSGo3o9UDaNze8ox44Ziy05K7vfnMaaZ1yeiuoWbhF9BFLpN5ARJItXSb-j9CkRrrv15twuO4GkxSYgZnNeio6-d-Xc-SR68npMuqAYtIJij4veeFvzGpuELzgOLBOTLzAG9v6nh-QvL_UXHFnuy4QOEYY83uNe6HAH0LQQZEdSWwxq4hw-hyOi4nkjr3ZOnAgafluuSLwI7IW-Ys64ANJ2_x0MLash50qc2pOglJ0RzyT12kb2m-DAg5WGGllX2rmoPqbynj")' }}></div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-primary mb-0.5">Lote #124</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-medium">04:20</span>
                </div>
                <h4 className="text-white text-sm font-medium truncate">Toyota Corolla XEi 2021</h4>
                <p className="text-[#92a4c9] text-xs">Maior lance: <span className="text-white font-medium">R$ 86.500</span></p>
              </div>
            </div>
            
            <div className="flex gap-3 p-4 border-l-4 border-transparent hover:bg-slate-800/30 cursor-pointer transition-colors group border-b border-slate-800/50">
              <div className="w-16 h-12 rounded bg-cover bg-center shrink-0 opacity-80 group-hover:opacity-100" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtCwNL-FYgwvacOf4jE6601RoFaWPYXRfOgnpgx04wuctVkD5XP8yU2PPKQx8W40FXBB-k5jMmak3eXLLobgFbH-P8Q85OI34VxYYTkMT_dSNNY7K5MrIP51hIASNhHNo8Wj9wq5_Rxb8tC7xj8Xu7gbq_19JuGX8vCj2falX_TTIYfYffrxQMS6jAb5oPdyxs_Xng1U3lJK0ABU6X9B6j5dn_T6VnlE9QNrXSAziSJipK3iJiQESZ1Se6N_5PDP_CViu_1V_S0ClY")' }}></div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-medium text-slate-500 mb-0.5">Lote #125</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-medium">Aguardando</span>
                </div>
                <h4 className="text-slate-300 group-hover:text-white text-sm font-medium truncate">Honda Civic Touring 2020</h4>
                <p className="text-slate-500 text-xs">Lance inicial: R$ 90.000</p>
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
                <div className="w-full md:w-5/12 h-64 md:h-auto bg-cover bg-center relative group" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBErU05VQWqMyFzr5KOL_sIXBQTDfFQsH5Sp7FWb5eD8a7IXel11TryQm98wfUFElZvBxny4zqpbAKZiBzim7MNADmP1OxniOtIve19m56jyLTuEQWWeJTYtwwG9fwuWnBhpTdsLDxFIP7RxBs-XQaSxfsygv4Pymtg4S3pJyAPVGDGfEeGYn1HZnbH8mq97qCC2Cch2M97Fh1O5gBOFQMVeFN-j1SDr-4ZZKtSyE-W66mxDe4dTd7xdpNkmRo8iP2CgIFVSvxJUhk")' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm border border-white/10">
                      <span className="material-symbols-outlined text-[14px] mr-1">photo_camera</span> 12 Fotos
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-wide">Lote #124</span>
                        <span className="text-slate-500 text-sm">Leilão de Veículos Recuperados</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white leading-tight">Toyota Corolla XEi 2.0 Flex</h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-[#92a4c9]">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> 2021/2021</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">speed</span> 45.000 km</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">palette</span> Prata</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">local_gas_station</span> Flex</span>
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
                        <span className="text-3xl font-bold text-primary">R$ 86.500,00</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="size-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">JM</div>
                        <span className="text-sm text-white">João M. (Paraíba)</span>
                        <span className="text-xs text-green-500 bg-green-500/10 px-1.5 rounded ml-auto">Verificado</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end gap-2">
                      <button className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">gavel</span> Registrar Lance Manual
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
                  <span className="text-2xl font-bold text-white">24</span>
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
                  <span className="text-2xl font-bold text-white">R$ 500</span>
                  <button className="text-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                </div>
              </div>
              <div className="bg-card-dark p-4 rounded-lg border border-slate-800 flex flex-col">
                <span className="text-xs text-[#92a4c9] uppercase font-medium">Valor Estimado</span>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-white">R$ 92k</span>
                  <span className="text-xs text-yellow-500">-6% alvo</span>
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
                    <tr className="bg-primary/5 hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                        R$ 86.500,00 
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white uppercase">Vencendo</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">JM</div>
                          <div>
                            <p className="text-white font-medium">João Mendes</p>
                            <p className="text-xs text-slate-500">ID: #83921</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-xs text-slate-400">
                          <span className="material-symbols-outlined text-[14px]">desktop_windows</span> Web
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">Hoje, 14:32:45</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors" title="Cancelar Lance">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-400 line-through decoration-slate-600">R$ 86.000,00</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-orange-600 flex items-center justify-center text-xs font-bold text-white">AB</div>
                          <div>
                            <p className="text-slate-300 font-medium">Auto Brilho Ltda</p>
                            <p className="text-xs text-slate-500">ID: #11029</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-xs text-slate-400">
                          <span className="material-symbols-outlined text-[14px]">smartphone</span> App
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs">Hoje, 14:30:12</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-600 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </td>
                    </tr>
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
