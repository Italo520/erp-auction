import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Auctions from './pages/Auctions';
import VehicleNew from './pages/VehicleNew';
import LiveBidding from './pages/LiveBidding';
import VehicleDetails from './pages/VehicleDetails';
import { RepositoryProvider } from './core/contexts/RepositoryContext';
import { AuthProvider } from './presentation/contexts/AuthContext';
import { useAuth } from './presentation/hooks/useAuth';

// Componente ProtectedRoute para proteger rotas privadas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark text-slate-500">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
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

        {/* Link updated to a valid Mock Vehicle ID (2045) for demo purposes */}
        <Link 
          to="/live/2045" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive('/live/2045') ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-[#232f48] hover:text-slate-900 dark:hover:text-white'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${isActive('/live/2045') ? 'filled' : ''}`}>sensors</span>
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
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#232f48] transition-colors relative group">
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-full size-9 shrink-0" 
            style={{ backgroundImage: `url("${user?.avatarUrl || 'https://via.placeholder.com/150'}")` }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.name || 'Carregando...'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
          </div>
          
          {/* Logout Menu (Hover) */}
          <div className="absolute bottom-full left-0 w-full pb-2 hidden group-hover:block">
            <button 
              onClick={() => logout()}
              className="w-full flex items-center gap-2 bg-card-dark border border-slate-700 p-3 rounded-lg text-red-400 hover:bg-slate-800 transition-colors shadow-lg"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="text-sm font-medium">Sair</span>
            </button>
          </div>
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
    <RepositoryProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/auctions" element={<ProtectedRoute><Layout><Auctions /></Layout></ProtectedRoute>} />
            <Route path="/vehicle/new" element={<ProtectedRoute><Layout><VehicleNew /></Layout></ProtectedRoute>} />
            <Route path="/vehicle/:id" element={<ProtectedRoute><Layout><VehicleDetails /></Layout></ProtectedRoute>} />
            <Route path="/live/:id" element={<ProtectedRoute><Layout><LiveBidding /></Layout></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </RepositoryProvider>
  );
};

export default App;