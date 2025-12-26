'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/hooks/useAuth';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-1 justify-center py-5 md:py-10 px-4 min-h-screen bg-background-light dark:bg-background-dark">
            <div className="layout-content-container flex flex-col max-w-[1200px] w-full flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-start">

                    {/* Left Column: Visual/Marketing */}
                    <div className="hidden lg:flex flex-col gap-6 sticky top-24">
                        <div
                            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[500px] relative group shadow-2xl"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5IkqRrYh2QiMj4_P5lrpwmXgiJOBU8keWREqk_MFWxlX-e2c_sVqZjwasUcydzagzg87ud8SF9TaLUouFbcs8GzISj7u6_EhXf8Dp-yscUYY2xT5_D-7h1nxyQHRvBm99phCxVStJjJI6zUKEGw0Vz18Yv8GDCb_9nxA6IZbjtM7jwvfrs-U01bXoqZyrREdplqRi6TFViyfedEMLz2Xjm-akLi9acBerinIhM3kwFv6TIhufwLzJe852wVKBepueY9baOWOhEVFt")' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="relative p-8 z-10">
                                <h3 className="text-white text-3xl font-black leading-tight mb-2">Encontre seu próximo veículo</h3>
                                <p className="text-[#92a4c9] text-lg">Participe dos maiores leilões de veículos do país com segurança e transparência.</p>
                                <div className="flex gap-4 mt-6">
                                    <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-sm font-medium">Verificado</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
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
                                <button
                                    onClick={() => router.push('/register')}
                                    className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#637588] dark:text-[#92a4c9] hover:text-[#111418] dark:hover:text-white pb-[13px] px-2 cursor-pointer transition-colors"
                                >
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Criar Conta</p>
                                </button>
                            </div>
                        </div>

                        <form className="flex flex-col gap-5 p-6 md:p-8" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">Email</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92a4c9]">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d1d5db] dark:border-[#324467] bg-white dark:bg-[#111722] focus:border-primary h-12 md:h-14 placeholder:text-[#92a4c9] pl-12 pr-4 text-base font-normal leading-normal transition-all"
                                        placeholder="exemplo@email.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">Senha</label>
                                    <a className="text-primary text-sm font-semibold hover:underline cursor-pointer" onClick={() => router.push('/forgot-password')}>Esqueceu a senha?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92a4c9]">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d1d5db] dark:border-[#324467] bg-white dark:bg-[#111722] focus:border-primary h-12 md:h-14 placeholder:text-[#92a4c9] pl-12 pr-12 text-base font-normal leading-normal transition-all"
                                        placeholder="••••••••"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92a4c9] hover:text-[#111418] dark:hover:text-white transition-colors cursor-pointer"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 md:h-14 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-lg shadow-primary/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="truncate">{isLoading ? 'Entrando...' : 'Acessar Sistema'}</span>
                            </button>

                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-[#e5e7eb] dark:border-[#324467]"></div>
                                <span className="flex-shrink-0 mx-4 text-[#637588] dark:text-[#92a4c9] text-sm">Ou continue com</span>
                                <div className="flex-grow border-t border-[#e5e7eb] dark:border-[#324467]"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-[#d1d5db] dark:border-[#324467] bg-white dark:bg-[#111722] hover:bg-[#f3f4f6] dark:hover:bg-[#232f48] text-[#111418] dark:text-white transition-colors" type="button">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-[#d1d5db] dark:border-[#324467] bg-white dark:bg-[#111722] hover:bg-[#f3f4f6] dark:hover:bg-[#232f48] text-[#111418] dark:text-white transition-colors" type="button">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    <span className="text-sm font-medium">Apple</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
