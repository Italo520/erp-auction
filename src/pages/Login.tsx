import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../presentation/hooks/useAuth';
import { Button } from '../presentation/components/ui/Button/Button';
import { Input } from '../presentation/components/ui/Input/Input';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email);
      navigate('/dashboard');
    } catch (error) {
      alert('Falha ao realizar login. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 justify-center py-5 md:py-10 px-4 min-h-screen bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col max-w-[1200px] w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-start">
          
          {/* Left Column: Visual/Marketing */}
          <div className="hidden lg:flex flex-col gap-6 sticky top-24">
            <div 
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[500px] relative group shadow-2xl border border-slate-800" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5IkqRrYh2QiMj4_P5lrpwmXgiJOBU8keWREqk_MFWxlX-e2c_sVqZjwasUcydzagzg87ud8SF9TaLUouFbcs8GzISj7u6_EhXf8Dp-yscUYY2xT5_D-7h1nxyQHRvBm99phCxVStJjJI6zUKEGw0Vz18Yv8GDCb_9nxA6IZbjtM7jwvfrs-U01bXoqZyrREdplqRi6TFViyfedEMLz2Xjm-akLi9acBerinIhM3kwFv6TIhufwLzJe852wVKBepueY9baOWOhEVFt")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="relative p-8 z-10">
                <h3 className="text-white text-3xl font-black leading-tight mb-2">Encontre seu próximo veículo</h3>
                <p className="text-[#92a4c9] text-lg">Participe dos maiores leilões de veículos do país com segurança e transparência.</p>
                <div className="flex gap-4 mt-6">
                  <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span className="text-sm font-medium">Verificado</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="material-symbols-outlined text-sm">gavel</span>
                    <span className="text-sm font-medium">Lances Online</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center px-2">
              <div className="flex -space-x-3">
                <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-[#101622]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4goxboKo4wQAYlSDbZBgByP6Ri10XVgxb5GWb_rMmYudcFbyxcaZ_VzUdBv_dH-tFnzOEHrclccoWLrmLXIivCIZ9qEUqe53CCxBrt1MJY1phdvPuJehqN2SLLX5LQjYilfWKHwuNn-RYt-FiF6W30dwFIbzKqZ6Nefbn4H93BswuJGYuxfBIu6GJW6LtesHde09C8BcABZ8dzfqKRY4brx1E725wvYHQU2oPsuGTqrq43cqt2Ga8Yp7-c1iFKzStlLQ6Ad930nv6" />
                <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-[#101622]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATysa35WVAxme6YYvtCsexv4bDa-HKj4oCzsRA1EHXytJYmawFmuMv_s20Rzt2BCET8SRFjXcPbPWDHFBRR7VhNsIr_wQ5WPkvsyDnfHypdkBJSkk-xSWMDWebafO94dKKmE0ICmtOF63wdhuZezqpuljOuJNfITsV9m9vGuqcAddoUX7_TYpthEOH5KwhUB-vMVfl4OjjFgHHPVMQ5sU4F10cFU78yTJbc2DWs5r61fU-9qf93EclsQO2Nxe_ELe8zeITa1_Dh3TU" />
                <div className="w-10 h-10 rounded-full border-2 border-[#101622] bg-[#232f48] text-white flex items-center justify-center text-xs font-bold">+2k</div>
              </div>
              <p className="text-[#92a4c9] text-sm font-medium">Junte-se a mais de 2.000 compradores</p>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="flex flex-col bg-white dark:bg-[#192233] rounded-xl shadow-xl border border-[#e5e7eb] dark:border-[#232f48] overflow-hidden">
            <div className="flex flex-col gap-2 p-6 md:p-8 pb-0">
              <h1 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Bem-vindo de volta</h1>
              <p className="text-[#637588] dark:text-[#92a4c9] text-base font-normal leading-normal">Acesse sua conta para gerenciar lances e veículos.</p>
            </div>

            <div className="px-6 md:px-8 pt-6">
              <div className="flex border-b border-[#e5e7eb] dark:border-[#324467] gap-8">
                <button className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] px-2 cursor-pointer transition-colors">
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Entrar</p>
                </button>
                <button className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#637588] dark:text-[#92a4c9] hover:text-[#111418] dark:hover:text-white pb-[13px] px-2 cursor-pointer transition-colors">
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Criar Conta</p>
                </button>
              </div>
            </div>

            <form className="flex flex-col gap-6 p-6 md:p-8" onSubmit={handleLogin}>
              <Input
                label="Email"
                type="email"
                placeholder="admin@leiloes083.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<span className="material-symbols-outlined text-[20px]">mail</span>}
              />

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">Senha</label>
                  <a className="text-primary text-sm font-semibold hover:underline" href="#">Esqueceu a senha?</a>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<span className="material-symbols-outlined text-[20px]">lock</span>}
                  rightElement={
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#92a4c9] hover:text-white transition-colors cursor-pointer flex items-center"
                    >
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  }
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                fullWidth 
                isLoading={isLoading}
              >
                {isLoading ? 'Acessando...' : 'Acessar Sistema'}
              </Button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#e5e7eb] dark:border-[#324467]"></div>
                <span className="flex-shrink-0 mx-4 text-[#637588] dark:text-[#92a4c9] text-sm">Ou continue com</span>
                <div className="flex-grow border-t border-[#e5e7eb] dark:border-[#324467]"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="secondary" 
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                  }
                >
                  Google
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  leftIcon={<span className="material-symbols-outlined text-[20px]">laptop_mac</span>}
                >
                  Apple
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;