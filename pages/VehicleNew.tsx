import React from 'react';

const VehicleNew = () => {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8 h-full overflow-y-auto">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          <a href="#" className="text-[#92a4c9] hover:text-white text-sm font-medium leading-normal">Home</a>
          <span className="text-[#92a4c9] text-sm font-medium leading-normal">/</span>
          <a href="#" className="text-[#92a4c9] hover:text-white text-sm font-medium leading-normal">Veículos</a>
          <span className="text-[#92a4c9] text-sm font-medium leading-normal">/</span>
          <span className="text-white text-sm font-medium leading-normal">Novo Cadastro</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-end gap-4 px-4 pb-8 border-b border-[#232f48] mb-8">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Novo Cadastro de Veículo</h1>
            <p className="text-[#92a4c9] text-base font-normal leading-normal">Preencha os dados abaixo para adicionar um novo veículo ao sistema.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#232f48] hover:bg-[#2f3e5e] text-white text-sm font-bold transition-colors">
              <span className="truncate">Cancelar</span>
            </button>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-900/20">
              <span className="material-symbols-outlined text-[20px] mr-2">save</span>
              <span className="truncate">Salvar Rascunho</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 pb-12">
          {/* Left Column: Main Form */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Section 1: Dados do Veículo */}
            <div className="flex flex-col rounded-xl bg-[#192233] border border-[#232f48] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#232f48] flex items-center justify-between bg-[#1f2b40]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">directions_car</span>
                  </div>
                  <h2 className="text-white text-lg font-bold">Dados do Veículo</h2>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Placa <span className="text-red-500">*</span></p>
                    <input className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="ABC-1234" />
                  </label>
                  <label className="flex flex-col min-w-40 flex-[2]">
                    <p className="text-white text-sm font-medium pb-2">VIN / Chassi <span className="text-red-500">*</span></p>
                    <input className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="Digite o chassi do veículo" />
                  </label>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Marca</p>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 pr-10 text-sm">
                        <option>Toyota</option>
                        <option>Honda</option>
                        <option>Volkswagen</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-[#92a4c9] pointer-events-none">expand_more</span>
                    </div>
                  </label>
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Modelo</p>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 pr-10 text-sm">
                        <option>Corolla</option>
                        <option>Civic</option>
                        <option>Gol</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-[#92a4c9] pointer-events-none">expand_more</span>
                    </div>
                  </label>
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Versão</p>
                    <input className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="Ex: XEi 2.0 Flex" />
                  </label>
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex flex-col min-w-24 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Ano Fab.</p>
                    <input type="number" className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="2022" />
                  </label>
                  <label className="flex flex-col min-w-24 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Ano Mod.</p>
                    <input type="number" className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="2023" />
                  </label>
                  <label className="flex flex-col min-w-32 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Cor</p>
                    <input className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="Preto" />
                  </label>
                  <label className="flex flex-col min-w-32 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Combustível</p>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 pr-10 text-sm">
                        <option>Flex</option>
                        <option>Gasolina</option>
                        <option>Diesel</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-[#92a4c9] pointer-events-none">expand_more</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2: Estado & Documentação */}
            <div className="flex flex-col rounded-xl bg-[#192233] border border-[#232f48] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#232f48] flex items-center justify-between bg-[#1f2b40]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">assignment_turned_in</span>
                  </div>
                  <h2 className="text-white text-lg font-bold">Estado & Documentação</h2>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-sm font-medium pb-2">Quilometragem (km)</p>
                    <input type="number" className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="0" />
                  </label>
                  <label className="flex flex-col min-w-40 flex-[2]">
                    <p className="text-white text-sm font-medium pb-2">Localização do Veículo</p>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#92a4c9]">location_on</span>
                      <input className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 pl-10 pr-4 placeholder:text-[#92a4c9] text-sm" placeholder="Cidade, UF - Pátio" />
                    </div>
                  </label>
                </div>

                <div className="flex flex-wrap gap-6 py-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox rounded border-[#324467] bg-[#111722] text-primary focus:ring-0 focus:ring-offset-0 w-5 h-5 transition-colors group-hover:border-primary" />
                    <span className="text-white text-sm">Blindado</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox rounded border-[#324467] bg-[#111722] text-primary focus:ring-0 focus:ring-offset-0 w-5 h-5 transition-colors group-hover:border-primary" />
                    <span className="text-white text-sm">Único Dono</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="form-checkbox rounded border-[#324467] bg-[#111722] text-primary focus:ring-0 focus:ring-offset-0 w-5 h-5 transition-colors group-hover:border-primary" />
                    <span className="text-white text-sm">IPVA Pago</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox rounded border-[#324467] bg-[#111722] text-primary focus:ring-0 focus:ring-offset-0 w-5 h-5 transition-colors group-hover:border-primary" />
                    <span className="text-white text-sm">Chave Reserva</span>
                  </label>
                </div>

                <label className="flex flex-col w-full">
                  <p className="text-white text-sm font-medium pb-2">Observações Gerais</p>
                  <textarea className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-32 p-4 placeholder:text-[#92a4c9] text-sm resize-none" placeholder="Descreva detalhes sobre avarias, estado dos pneus, funcionamento do motor, etc."></textarea>
                </label>
              </div>
            </div>

            {/* Section 3: Galeria de Fotos */}
            <div className="flex flex-col rounded-xl bg-[#192233] border border-[#232f48] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#232f48] flex items-center justify-between bg-[#1f2b40]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">imagesmode</span>
                  </div>
                  <h2 className="text-white text-lg font-bold">Galeria de Fotos</h2>
                </div>
                <button className="text-primary text-sm font-bold hover:underline">Gerenciar Ordem</button>
              </div>
              <div className="p-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#324467] rounded-xl bg-[#111722]/50 p-10 cursor-pointer hover:bg-[#111722] transition-colors hover:border-primary group">
                  <span className="material-symbols-outlined text-4xl text-[#92a4c9] mb-3 group-hover:text-primary transition-colors">cloud_upload</span>
                  <p className="text-white font-medium mb-1">Arraste e solte imagens aqui</p>
                  <p className="text-[#92a4c9] text-sm">ou clique para selecionar do computador</p>
                  <p className="text-[#92a4c9] text-xs mt-4">JPG, PNG até 10MB</p>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  <div className="relative group aspect-square rounded-lg overflow-hidden border border-[#324467] bg-[#111722]">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaekX22JMU5bYjbkN7RjMLcJPHn75cBErvFva1zVTloU9iwoyA3bCApbAlOop9Zy9TOk--YvmoBOypBozgDJ2Nvwhjy0xCBhB5AR5u8jxDV6IV0UNPBckaoWn8AkeaEHYr876Ngw8mQRlrr0mg98NV4UQLUHdUK9fLf3GaYNr-cVKgZh7EhgT5wgoEd7HjGOQ08HQn3a7QqjLaXOTL_mcJOFlkBcP5xqPh6f71mPntn3HDhhZsnKe4Sc_vcxJHAEWoXN615F_Wvu8u" alt="Car" />
                    <div className="absolute inset-0 bg-black/60 hidden group-hover:flex items-center justify-center gap-2 transition-all">
                      <button className="text-white hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                    <div className="absolute top-1 left-1 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">CAPA</div>
                  </div>
                  <div className="relative group aspect-square rounded-lg overflow-hidden border border-[#324467] bg-[#111722]">
                     <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-qMZMMQR8lqgY8yeYhl6nIeTIaZWSJZTlMnXrtmis7bmipwqXJn-IrApOjVqf-PCdBewC2oNfPRZCwmmqmkMXpJGlSZvc6IMfApX8EHuwKxxkF0cMtW5I7UzBP03NF_i8Ha6SJwtEDIMdutQZfal1zNRKB8FQosIYuOIYRSQRKK0EhEF_LHPOnuYqKE5B6fhRBHObLCW12kkp3D_NH7jDXnxF2GCdkQXeXfpff7_R3zuz3ADSmoxaSgyg-7UPlY9r1saxqfOtfntM" alt="Car interior" />
                  </div>
                  <div className="relative group aspect-square rounded-lg overflow-hidden border border-[#324467] bg-[#111722]">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdRU3HalTefqqAj02G-a8vm8VXmMI6ooqq2LmuhUz23utrxZ2mfabq6lMYmMKn6TEkHGvAQ9lZPE66nThMR_hNaEGDpviAOZPgLS1V6pmtcVyKh2lYlrDSfkdoBoICgGG4ilMyAHNMvOjIdrUx-OVHVo7qg80qlkX_5z0-2OzrsD6LnCydRfKmBnudyvia2sE_AXVRL8mHkbzfIP1YplQpZVK9AU8SNQYTcdrf46fu6hNolGtEqcgEDxs823sOFb2zju7i1ie0PRyL" alt="Car rear" />
                  </div>
                  <div className="relative group aspect-square rounded-lg overflow-hidden border border-[#324467] bg-[#111722]">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm92CyzZ8lQ3Bs-V9-rHQicQuqxRXK6KPksVfSacKNKHpDOaJyvTDRupcYucTcZ_OKtedWHqrQSWl6I0K8xoH7T4ne-2OMpVAuhoC1c89UO6JxEni2tasKKsZxNJRxaVmBXr5AU-F8AfQM4YV4oemNev9yRKyLncdvhBiDqQxwdAlC92ADSVKHfcxfoXBLcgF_a2bKL3GMym6pfzkR1uIM0kzJCocxNZxz8BpVbMG4jdcnlIyTQ8TZ-jun9Lbkv6fbixZNajloj8ex" alt="Wheel" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Actions */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Publish Card */}
            <div className="flex flex-col rounded-xl bg-[#192233] border border-[#232f48] shadow-lg">
              <div className="p-6 border-b border-[#232f48]">
                <h3 className="text-white font-bold text-lg mb-4">Publicação</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#92a4c9] text-sm">Status:</span>
                  <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">Rascunho</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#92a4c9] text-sm">Visibilidade:</span>
                  <span className="text-white text-sm font-medium">Oculto</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#92a4c9] text-sm">Criado em:</span>
                  <span className="text-white text-sm font-medium">Hoje, 10:30</span>
                </div>
              </div>
              <div className="p-4 bg-[#1f2b40] flex flex-col gap-3 rounded-b-xl">
                <button className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold transition-colors shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined">publish</span>
                  Publicar Veículo
                </button>
                <button className="w-full text-[#92a4c9] hover:text-white text-sm font-medium py-2">
                  Agendar Publicação
                </button>
              </div>
            </div>

            {/* Auction Config */}
            <div className="flex flex-col rounded-xl bg-[#192233] border border-[#232f48]">
              <div className="px-6 py-4 border-b border-[#232f48] flex items-center gap-3 bg-[#1f2b40]">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">gavel</span>
                </div>
                <h2 className="text-white text-lg font-bold">Leilão</h2>
              </div>
              <div className="p-6 flex flex-col gap-5">
                <label className="flex flex-col w-full">
                  <p className="text-white text-sm font-medium pb-2">Lote nº</p>
                  <input type="text" className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm" placeholder="001" />
                </label>
                <label className="flex flex-col w-full">
                  <p className="text-white text-sm font-medium pb-2">Lance Inicial (R$)</p>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-[#92a4c9] text-sm">R$</span>
                    <input type="number" className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 pl-10 pr-4 placeholder:text-[#92a4c9] text-sm font-mono" placeholder="0,00" />
                  </div>
                </label>
                <label className="flex flex-col w-full">
                  <p className="text-white text-sm font-medium pb-2">Incremento Mín. (R$)</p>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-[#92a4c9] text-sm">R$</span>
                    <input type="number" className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 pl-10 pr-4 placeholder:text-[#92a4c9] text-sm font-mono" placeholder="500,00" />
                  </div>
                </label>
                <div className="h-px bg-[#232f48] w-full my-1"></div>
                <label className="flex flex-col w-full">
                  <p className="text-white text-sm font-medium pb-2">Data de Início</p>
                  <input type="datetime-local" className="w-full rounded-lg text-white focus:ring-1 focus:ring-primary border border-[#324467] bg-[#111722] h-12 px-4 placeholder:text-[#92a4c9] text-sm [color-scheme:dark]" />
                </label>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex flex-col rounded-xl bg-[#192233] border border-[#232f48] p-6 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-white font-medium">Veículo em Destaque</span>
                  <span className="text-[#92a4c9] text-xs">Exibir na home do site</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#324467] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="h-px bg-[#232f48] w-full"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-white font-medium">Permitir Visitação</span>
                  <span className="text-[#92a4c9] text-xs">Habilitar agendamento</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#324467] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleNew;
