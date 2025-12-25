import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Auctions from './pages/Auctions';
import VehicleNew from './pages/VehicleNew';
import LiveBidding from './pages/LiveBidding';
import VehicleDetails from './pages/VehicleDetails';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111722] flex flex-col transition-all duration-300 hidden md:flex z-50">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shadow-lg ring-2 ring-primary/20"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCU_jGvha0sgMZM5kSkc6ye_ezOW_mcqYIOSqgJdgkXmMM8iL6B9q_rqffOPbbjc56zsuTCAQj2QQCB1vE1k2alWgBn_bQPAP9M7WtXDGESNeKvaEGReSeJYwzRJOkA6KN_tdOoezN691Fwxz80pR_bzVD1wWsNXQKmnROInpL2cqFLiPrbsEY10WbbntHZ1-8Pj_PAtBhe1MPZVT0OlCSJ8RNI0j5aNLPpHUJHqmQ6T5iEDT2LXnl_rP35rx20M6V2v5q2uB3SdDST")' }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-none tracking-tight text-slate-900 dark:text-white">Leilões 083</h1>
            <p className="text-slate-500 dark:text-[#92a4c9] text-xs font-medium mt-1">Painel Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive('/dashboard') ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-[#232f48] hover:text-slate-900 dark:hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${isActive('/dashboard') ? 'filled' : ''}`}>dashboard</span>
          <p className="text-sm font-medium">Dashboard</p>
        </Link>
        
        <Link 
          to="/auctions" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive('/auctions') ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-[#232f48] hover:text-slate-900 dark:hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${isActive('/auctions') ? 'filled' : ''}`}>gavel</span>
          <p className="text-sm font-medium">Leilões</p>
        </Link>
        
        <Link 
          to="/vehicle/new" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive('/vehicle/new') ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-[#232f48] hover:text-slate-900 dark:hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${isActive('/vehicle/new') ? 'filled' : ''}`}>directions_car</span>
          <p className="text-sm font-medium">Novo Veículo</p>
          {!isActive('/vehicle/new') && <span className="ml-auto bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">12</span>}
        </Link>

        <Link 
          to="/live/124" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive('/live/124') ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-[#232f48] hover:text-slate-900 dark:hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${isActive('/live/124') ? 'filled' : ''}`}>sensors</span>
          <p className="text-sm font-medium">Ao Vivo</p>
          <span className="flex relative h-2 w-2 ml-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </Link>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-2 mx-3"></div>
        
        <Link 
          to="/settings" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive('/settings') ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-[#232f48] hover:text-slate-900 dark:hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${isActive('/settings') ? 'filled' : ''}`}>settings</span>
          <p className="text-sm font-medium">Configurações</p>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#232f48] cursor-pointer transition-colors">
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-full size-9" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVK4IJfncfhL_25Eq0T7DWIWBhcRywdPro73gr3cybjfflGzyEVZtICR2w8aLUlqGZpqsFz3Xbt-7LhmLGXMQx6LBW2pixE3l6tgPlz8dGr8hEhKKYVdvfw70kSO6_oeynpOZmy34yy1-cjJxbpx0f0QaE5ou8utQ8qxDkedyn5juhAkFpzf_NoJ54gevbAId7-al_sgxEuR3MGkv9twQ080Hc5ZBuZ-tpmdeBqz6O_de4Uim36cmmOStXfUiOkWvMNye1dH0LJjlc")' }}
          ></div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">admin@leiloes083.com</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-slate-400 text-sm">expand_more</span>
        </div>
      </div>
    </aside>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/auctions" element={<Layout><Auctions /></Layout>} />
        <Route path="/vehicle/new" element={<Layout><VehicleNew /></Layout>} />
        <Route path="/vehicle/:id" element={<Layout><VehicleDetails /></Layout>} />
        <Route path="/live/:id" element={<Layout><LiveBidding /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
