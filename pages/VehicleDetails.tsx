import React from 'react';

const VehicleDetails = () => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto">
      <main className="layout-container flex h-full grow flex-col w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 py-4 items-center">
          <a className="text-[#92a4c9] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Home</a>
          <span className="text-[#92a4c9] text-sm font-medium leading-normal">/</span>
          <a className="text-[#92a4c9] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Leilões</a>
          <span className="text-[#92a4c9] text-sm font-medium leading-normal">/</span>
          <span className="text-white text-sm font-medium leading-normal">Lote #2045</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 mb-6 border-b border-[#232f48] pb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Toyota Corolla XEi 2021</h1>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold border border-green-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Em Andamento
              </span>
            </div>
            <p className="text-[#92a4c9] text-base font-normal leading-normal flex items-center gap-2">
              Lote #2045 • Leilão de Recuperados • Paraíba
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#232f48] hover:bg-[#2d3b55] text-white text-sm font-bold transition-colors border border-transparent hover:border-[#3a4b6b]">
              <span className="material-symbols-outlined mr-2 text-[18px]">visibility</span>
              Ver na Loja
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-900/20">
              <span className="material-symbols-outlined mr-2 text-[18px]">edit</span>
              Editar Lote
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Visuals & Specs */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Gallery */}
            <div className="bg-card-dark rounded-xl p-1 overflow-hidden border border-[#232f48]">
              <div className="w-full aspect-video bg-cover bg-center rounded-lg relative group" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsZIPD18trQyF6fUwePqygUpa_O8ipHqtkIm81sqxqeiQwJe0rkwExGoP-WrpwVLEEekITx_QFuSDR7ab7JDuoEnd6qdkOUSkzcBWwVsjTJQMV2j7GrIAO6DdUjwuL13yGn2BUonViE160HwfSmCMzBb4sbpYyLEh6Y0SxVaX81lrC8G6KhU8-LIScFrfhjH9-0S8pV4wGLBLmNs8V8bbn9R_X22_c8jhUr2sSNcVTylTvqdZ5WMd7C1pfrmD9QvZndWCaEg65Y8tb")' }}>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span> 1/12
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-2 px-1 pb-1">
                <div className="cursor-pointer aspect-[4/3] rounded-md bg-cover bg-center border-2 border-primary" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdUGGVrSxBM-uoo8X8agkrY5uupU6tpCdH49o24irZ_VmgUtsv-tYaYtcDVhWuS3DvQa_2LTBFUklzR2xPvR0wQ4bBVRasbpMSc9V32HTHZhTWyk9gpHN8TiNziRxdfEdd0JJeafU5hIIrRM_hJauRJQkKVgLlFI4JcrRIlIqzZhrDXYEgBsqgh7zy15Nhjzi7dA6LhFVjB83rTXJMh6PyIfI3Nmx3AX5OMp0lp5nKtkzm5Q_HCclM5cBvC2PvIWsXTrTQRCWcV7Tk")' }}></div>
                <div className="cursor-pointer aspect-[4/3] rounded-md bg-cover bg-center opacity-70 hover:opacity-100 transition-opacity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsMuk6TUSMwEeALBtZZGyazxcmnpfJVggRNYwQvSWV2Koa_pSq66jwcOwCvLk4pyRn-14XB4gfP0ME8vgLVmGr6M9B9qFXSlwrBzbAM6lfz9Mt96pltWzC4jN4ecLdx2VGwnjItXjsujfL__qiGeB9-W92-CBpSWUoSK_oaJsfA8tNY-0f4kZrr-vCY218Yu1RiNDc49jxLsogCJ8lNdrBG5yDW93F0bV1bV6wJfskJaajjQHrNCkuCB6zRMX99kzZHOM3cp4mSACj")' }}></div>
                <div className="cursor-pointer aspect-[4/3] rounded-md bg-cover bg-center opacity-70 hover:opacity-100 transition-opacity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVrZpHXBjMYU5aUNJVCmcnM7RUUUivcTwNsKxoPOgHm7UXbLoAjOgnS4GDIMUcHT2b6Z8qYCr2pp5Nwl4yyEwgYDo2VcWEUcMyWs8oD36T2Hqe6a6UrHuXfoj3HL0UbVdGoABO-cU5s21R2wc9JPQJwdJz4qco6y-oSCQFXHYWLxKsfFQXKtD4qaddxy9lVj7mz2CjCsltOZEmAridx41I_Byr0yI8VFDDajZBL2KbbCTR_epFgvCogfXjjG953cgFY7XRO26wAtym")' }}></div>
                <div className="cursor-pointer aspect-[4/3] rounded-md bg-cover bg-center opacity-70 hover:opacity-100 transition-opacity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEEE7toQmR0UWytT7i2rPADTFLyN60tzHAYDHyuCu5SEcVMeq0mNHCgpvo7ZG4MTBeRAvKYI5RouWbJEJ8puwtzzqXOvQKduEF6KkkMW_q2mQKTzYCV-mKyrIeSlKzniWhhLD921op5d9wBuLQnXHSdJJVPeCHgZ1tl2oYXuRqt3KfDw5dRHbSf-NChTtcx0P_waJDYTjYJYtrf060rQszwNjLTscNGOfIyjmW-h7-0Id4N8IFWM3L9jGnXskL81IWlBKzqkd46RtO")' }}></div>
                <div className="cursor-pointer aspect-[4/3] rounded-md bg-cover bg-center opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center bg-[#232f48] text-[#92a4c9]">
                  <span className="text-xs font-bold">+8</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-card-dark rounded-xl border border-[#232f48] p-6">
              <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span> Especificações Técnicas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Ano/Modelo</span>
                  <p className="text-white font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#92a4c9]">calendar_today</span> 2020/2021
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Combustível</span>
                  <p className="text-white font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#92a4c9]">local_gas_station</span> Flex
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Quilometragem</span>
                  <p className="text-white font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#92a4c9]">speed</span> 45.320 km
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Cor</span>
                  <p className="text-white font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#92a4c9]">palette</span> Prata
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Câmbio</span>
                  <p className="text-white font-medium">Automático CVT</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Final da Placa</span>
                  <p className="text-white font-medium">***-**83</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Localização</span>
                  <p className="text-white font-medium">João Pessoa - PB</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-xs uppercase tracking-wider font-semibold">Código FIPE</span>
                  <p className="text-white font-medium">002194-4</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-[#232f48]">
                <h4 className="text-white text-sm font-bold mb-2">Observações do Avaliador</h4>
                <p className="text-[#92a4c9] text-sm leading-relaxed">
                  Veículo em bom estado geral de conservação. Pequenos arranhões no para-choque traseiro. Pneus meia-vida. Interior preservado. Mecânica funcionando perfeitamente no teste estático. Acompanha chave reserva e manual.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Status & Admin Controls */}
          <div className="flex flex-col gap-6">
            {/* Live Status Card */}
            <div className="bg-card-dark rounded-xl border border-[#232f48] overflow-hidden relative">
              <div className="bg-gradient-to-r from-blue-900/50 to-primary/20 p-4 border-b border-[#232f48] flex justify-between items-center">
                <span className="text-blue-200 text-sm font-bold uppercase tracking-wider">Tempo Restante</span>
                <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
                  <span className="material-symbols-outlined text-primary animate-pulse">timer</span> 02h : 14m : 30s
                </div>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[#92a4c9] text-sm font-medium">Lance Atual</span>
                  <h2 className="text-4xl font-black text-white tracking-tight">R$ 85.000,00</h2>
                  <span className="text-xs text-[#92a4c9]">+ R$ 500,00 incremento mínimo</span>
                </div>
                <div className="grid grid-cols-2 gap-3 p-3 bg-[#111722] rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#92a4c9] uppercase">Lances</span>
                    <span className="text-white font-bold">24</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#92a4c9] uppercase">Visitas</span>
                    <span className="text-white font-bold">1.2k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bid History */}
            <div className="bg-card-dark rounded-xl border border-[#232f48] flex flex-col flex-1 max-h-[400px]">
              <div className="p-4 border-b border-[#232f48] flex justify-between items-center">
                <h3 className="text-white font-bold text-sm">Histórico de Lances</h3>
                <button className="text-primary text-xs font-bold hover:underline">Ver Todos</button>
              </div>
              <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
                <div className="flex items-center justify-between p-3 hover:bg-[#232f48] rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-green-900/50 text-green-400 flex items-center justify-center border border-green-800">
                      <span className="material-symbols-outlined text-[16px]">gavel</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-bold">Carlos M.</span>
                      <span className="text-[#92a4c9] text-xs">João Pessoa - PB</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-green-400 font-bold text-sm">R$ 85.000</span>
                    <span className="text-[#92a4c9] text-[10px]">Há 2 min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 hover:bg-[#232f48] rounded-lg transition-colors border-l-2 border-transparent hover:border-[#232f48]">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-[#232f48] text-[#92a4c9] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-300 text-sm font-medium">Ana P.</span>
                      <span className="text-[#92a4c9] text-xs">Recife - PE</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-slate-300 font-medium text-sm">R$ 84.500</span>
                    <span className="text-[#92a4c9] text-[10px]">Há 15 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Action Panel */}
            <div className="bg-card-dark rounded-xl border border-[#232f48] p-4">
              <h3 className="text-white font-bold text-sm mb-4">Ações Administrativas</h3>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center w-full h-10 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 text-sm font-bold border border-yellow-500/20 transition-all">
                  <span className="material-symbols-outlined mr-2 text-[18px]">pause_circle</span> Pausar Leilão
                </button>
                <button className="flex items-center justify-center w-full h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-bold border border-red-500/20 transition-all">
                  <span className="material-symbols-outlined mr-2 text-[18px]">cancel</span> Cancelar Último Lance
                </button>
                <div className="h-px bg-[#232f48] my-1"></div>
                <button className="flex items-center justify-center w-full h-10 rounded-lg bg-[#232f48] hover:bg-[#2d3b55] text-white text-sm font-bold transition-colors">
                  <span className="material-symbols-outlined mr-2 text-[18px]">history</span> Ver Log de Auditoria
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetails;
