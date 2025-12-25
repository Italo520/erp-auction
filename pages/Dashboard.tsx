import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
                <h3 className="text-2xl font-bold dark:text-white">12</h3>
                <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +2
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">Receita (Hoje)</p>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold dark:text-white">R$ 145k</h3>
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
                <h3 className="text-2xl font-bold dark:text-white">28</h3>
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
                <h3 className="text-2xl font-bold dark:text-white">45</h3>
                <span className="text-slate-400 text-xs font-medium">Aguardando aprovação</span>
              </div>
            </div>
          </section>

          {/* Grid Split */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Table */}
            <div className="xl:col-span-2 flex flex-col rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h2 className="text-lg font-bold dark:text-white">Leilões em Andamento</h2>
                <a href="#" className="text-sm font-medium text-primary hover:text-blue-400">Ver todos</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-500 dark:text-[#92a4c9]">
                  <thead className="bg-slate-50 dark:bg-[#232f48] text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Veículo</th>
                      <th className="px-5 py-4">Lance Atual</th>
                      <th className="px-5 py-4">Tempo Restante</th>
                      <th className="px-5 py-4 text-center">Status</th>
                      <th className="px-5 py-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-14 rounded bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWkFtyzRtIKJMWHnpjM84ViDteXM25ystnFBAND8HI-jljLRlNO7EGPo_rJmJmcYbIDQ41N07DMh7IiWooSEhYTM2PzVsNJIgrGh5P9yX6JjbsUtOTH5U_5lhFzoMY4HVkWpMsIUrDmhKgDKSpvtL4Gr4H117y7t7yNkaSfLJvqBZfhBiP0KgiFhi7YSVh84dZyKAs98j0lG6ijNSfRCFWMcHg6WjhqeSuL09VJBf7e5Ab6953-IdewS_oIqmK-Lx0KvkO35BK41Pm")' }}></div>
                          <div>
                            <Link to="/vehicle/2045" className="font-medium text-slate-900 dark:text-white hover:text-primary hover:underline">Toyota Corolla XEi</Link>
                            <div className="text-xs">Lot #8392 • 2020</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono font-medium text-slate-900 dark:text-white">R$ 85.500</td>
                      <td className="px-5 py-4 text-orange-500 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span> 02h 15m
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">Ativo</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-14 rounded bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDD1huaiZU3h-mdUm75pgOfyT7gX5-SIvXmZxB_QyB22NirwT3gWgsHWwD1dQ5OyZSYl-6ai8jmVqwWTJXwpFox5r8jfH7o7uEPdmdhFNyHcAFoBe-LI9CTCdQojeEIEZ_ugM-9S-gNga1Y1cWQ0klgX4uw8hB3Nuf4IFE6Sfr-zzWQ8ArtweZrILHrj6RrXjCoaCkmhRnkfY3KfUPQV2oKceGzAzl9_EvLakHW5GXd-_2FGjlHIEk0CEO_tFSCHL9X0iezE93bWKpf")' }}></div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">Honda Civic Touring</div>
                            <div className="text-xs">Lot #8395 • 2019</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono font-medium text-slate-900 dark:text-white">R$ 112.000</td>
                      <td className="px-5 py-4 text-orange-500 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span> 00h 45m
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">Ativo</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-14 rounded bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAA7dgfef2xGr6L3z5fLBKgiYfkehxYCBEf_4NqzzqCy9RRaRL_TSnqifAjxENFA-CGRubzcZCs6xjaDELZwx8pQHoX-ue0hbyjXGQQO9loL24V1Q8XQu2rU7k9bHL9umaEEw-nBWS8PJDayzpGmBALV1jWzHXcEx0Vkw41WfQc34EdhU69kSpZJgGYaAiJ3aOgdRAxkE7i7Na6amr_rqahLyxykyrmRvU0jWQ6RSl2yhlxdnSSTX4nLde2n7aDw3dBlZBoRjopuCVT")' }}></div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">BMW 320i Sport GP</div>
                            <div className="text-xs">Lot #8401 • 2021</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono font-medium text-slate-900 dark:text-white">R$ 205.000</td>
                      <td className="px-5 py-4 text-slate-500 dark:text-[#92a4c9] font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">timer</span> 12h 00m
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-500/20">Pausado</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
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
                <div className="flex gap-4 p-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-[#232f48]/30 transition-colors">
                  <div className="relative">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTJr4p--ACdMmaj7DgP54m06KAYYVkJxtL9lXhf8MxC7YN6_aNRTd6Q3l_nCK1p8hc1K3d9EwXQPqKolblTpcGbsbZ7AHxDyQ-89hmwKq71XYLP6OLlRUjRanWrLjEhmxbnqZCoNZa26O4hN4jhA5sag4AUpGaD5SPnNnx62t5oo9BBLYPq47kxfYvVY87N_0iIDE6hBq5bF9RMFfymdePO8lf-k7_Of7welIyEpM0m6sbsF6_ZtRp2ie0c-hsEbHtsWSle0Puoi-M")' }}></div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-[#1e293b]">
                      <span className="material-symbols-outlined text-white text-[10px] font-bold block">attach_money</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <p className="text-sm dark:text-white"><span className="font-bold">João S.</span> ofertou <span className="text-emerald-500 font-bold">R$ 85.500</span></p>
                    <p className="text-xs text-slate-500 dark:text-[#92a4c9]">Toyota Corolla XEi</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mt-1">Há 2 min</p>
                  </div>
                </div>
                
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
