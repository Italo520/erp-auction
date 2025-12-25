import React from 'react';

const Auctions = () => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="flex-shrink-0 bg-background-dark/50 backdrop-blur-md sticky top-0 z-20 border-b border-gray-800">
        <div className="px-8 py-6 max-w-[1400px] mx-auto w-full">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-3xl font-black leading-tight tracking-tight">Gerenciamento de Leilões</h2>
              <p className="text-[#92a4c9] text-base font-normal">Crie, edite e monitore o status dos leilões e lotes em tempo real.</p>
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Criar Novo Leilão</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
            <div className="bg-[#232f48] p-5 rounded-xl border border-gray-700/50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[#92a4c9] text-sm font-medium">Leilões Ativos</span>
                <span className="material-symbols-outlined text-green-500 bg-green-500/10 p-1.5 rounded-md text-[20px]">sensors</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-white text-3xl font-bold leading-none">3</span>
                <span className="text-green-400 text-sm font-medium mb-1 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +1
                </span>
              </div>
            </div>
            
             <div className="bg-[#232f48] p-5 rounded-xl border border-gray-700/50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[#92a4c9] text-sm font-medium">Agendados</span>
                <span className="material-symbols-outlined text-yellow-500 bg-yellow-500/10 p-1.5 rounded-md text-[20px]">calendar_month</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-white text-3xl font-bold leading-none">12</span>
                <span className="text-[#92a4c9] text-sm font-medium mb-1">Próximo: 14h</span>
              </div>
            </div>

            <div className="bg-[#232f48] p-5 rounded-xl border border-gray-700/50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[#92a4c9] text-sm font-medium">Finalizados (Mês)</span>
                <span className="material-symbols-outlined text-blue-400 bg-blue-400/10 p-1.5 rounded-md text-[20px]">check_circle</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-white text-3xl font-bold leading-none">45</span>
                <span className="text-green-400 text-sm font-medium mb-1 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +12
                </span>
              </div>
            </div>

             <div className="bg-[#232f48] p-5 rounded-xl border border-gray-700/50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[#92a4c9] text-sm font-medium">Receita Estimada</span>
                <span className="material-symbols-outlined text-primary bg-primary/20 p-1.5 rounded-md text-[20px]">payments</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-white text-3xl font-bold leading-none tracking-tight">R$ 1.2M</span>
                <span className="text-green-400 text-sm font-medium mb-1">+15%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 pb-8 max-w-[1400px] mx-auto w-full">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 py-2 sticky top-0 z-10 bg-background-dark/95 backdrop-blur-sm">
          <div className="w-full md:w-96">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#92a4c9] group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-[#232f48] text-white placeholder-[#92a4c9] focus:outline-none focus:ring-2 focus:ring-primary focus:bg-[#2a3755] sm:text-sm transition-all" placeholder="Buscar por nome, ID ou lote..." type="text" />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            <button className="flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium shadow-md shadow-primary/20 transition-transform hover:scale-105">Todos</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] text-white text-sm font-medium border border-transparent hover:border-gray-700 transition-all">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Em andamento
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] text-white text-sm font-medium border border-transparent hover:border-gray-700 transition-all">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Agendados
            </button>
             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] text-white text-sm font-medium border border-transparent hover:border-gray-700 transition-all">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div> Finalizados
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1a2230] rounded-xl overflow-hidden border border-gray-800 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-[#232f48]/50">
                  <th className="py-4 px-6 text-xs font-semibold text-[#92a4c9] uppercase tracking-wider">Leilão</th>
                  <th className="py-4 px-6 text-xs font-semibold text-[#92a4c9] uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-[#92a4c9] uppercase tracking-wider">Data / Hora</th>
                  <th className="py-4 px-6 text-xs font-semibold text-[#92a4c9] uppercase tracking-wider text-center">Lotes</th>
                  <th className="py-4 px-6 text-xs font-semibold text-[#92a4c9] uppercase tracking-wider">Maior Lance</th>
                  <th className="py-4 px-6 text-xs font-semibold text-[#92a4c9] uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="group hover:bg-[#232f48] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 rounded-lg overflow-hidden relative flex-shrink-0">
                        <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHUNrHXoszR9J7iqRg324-BcMaSlQYxi3GeSpFq6cdnm4ZUe22QynktqltHGkGvin2gvjrbUYdy66gdFXxemKbsiu_ijHRW4FQWYJug-ZAX-84C1gRRSKu8KfwDTNRJMvFb9rpKA-Jsctm2vOYi1PQPrXf7ipE72j5Oxvh_z2SBznLn68-l-FbjMgLd0Bw2l7W8donrZEHDCAnYkXSTkj92IeL7AMo4Mn2P-WOGZ7PSjyHatnTTAtpcrZQ2tSAYVapVBSjHFdoABY2" alt="Car" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Leilão de Luxo #083</p>
                        <p className="text-xs text-[#92a4c9]">ID: LX-2023-083</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Em andamento
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-white text-sm">Hoje</span>
                      <span className="text-[#92a4c9] text-xs">Termina em 2h 15m</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-white text-sm font-medium bg-[#232f48] px-2 py-1 rounded">12</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-primary font-bold text-sm">R$ 450.000</span>
                      <span className="text-[#92a4c9] text-xs">Lote 004</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-[#92a4c9] hover:text-white hover:bg-gray-700 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">desktop_windows</span></button>
                      <button className="p-1.5 text-[#92a4c9] hover:text-primary hover:bg-primary/10 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                    </div>
                  </td>
                </tr>

                <tr className="group hover:bg-[#232f48] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 rounded-lg overflow-hidden relative flex-shrink-0">
                        <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7uP4jBz2DSoy_YRWB4yW1Ku1FpH0ZXsERQUOwLwsSUyINpev2OC6BcUjZDzfX2Oy7zRNkaWahlm66i8P74zDuDNTO7PIrBrVRfTrn0bYwtTJejQkiilQm4kwSbGpzOMyaTyFLwIECwm5Y5UpQxDeRGDDSOarFu-fQCBh6gzCEx1V5PuRJXw65AN9or95qCMa8yJ2oIKV2iRN8jBQBwQCwGPbYTPgbkW3YYsptihh-OpLj-vPnu50lVn6ZRIDJ4BYzyTGA0HJd6bPY" alt="Car" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Veículos Recuperados #084</p>
                        <p className="text-xs text-[#92a4c9]">ID: VR-2023-084</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      Agendado
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-white text-sm">Amanhã</span>
                      <span className="text-[#92a4c9] text-xs">14:00 - 18:00</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-white text-sm font-medium bg-[#232f48] px-2 py-1 rounded">45</span>
                  </td>
                  <td className="py-4 px-6"><span className="text-[#92a4c9] text-sm">--</span></td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-[#92a4c9] hover:text-white hover:bg-gray-700 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                      <button className="p-1.5 text-[#92a4c9] hover:text-primary hover:bg-primary/10 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-sm text-[#92a4c9]">Mostrando <span className="font-medium text-white">1</span> a <span className="font-medium text-white">4</span> de <span className="font-medium text-white">45</span> resultados</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-gray-700 text-sm font-medium text-[#92a4c9] hover:bg-gray-800 hover:text-white disabled:opacity-50" disabled>Anterior</button>
              <button className="px-3 py-1 rounded border border-gray-700 text-sm font-medium text-[#92a4c9] hover:bg-gray-800 hover:text-white">Próximo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auctions;
