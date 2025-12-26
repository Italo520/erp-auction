'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, CheckCircle, Gavel } from 'lucide-react';
import { useAuth } from '@/presentation/hooks/useAuth';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-600 to-blue-700 p-12 flex-col justify-between overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Encontre seu próximo veículo
                    </h1>
                    <p className="text-purple-100 text-lg">
                        Participe dos maiores leilões de veículos do país com segurança e transparência.
                    </p>

                    {/* Features */}
                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <CheckCircle size={20} />
                            </div>
                            <span>Verificado e Seguro</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Gavel size={20} />
                            </div>
                            <span>Lances Online em Tempo Real</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="relative z-10 flex items-center gap-6">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white"></div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white"></div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white"></div>
                    </div>
                    <p className="text-white text-sm">
                        Junte-se a mais de <span className="font-bold">2.000 compradores</span>
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Bem-vindo de volta
                            </h2>
                            <p className="text-slate-400">
                                Acesse sua conta para gerenciar lances e veículos.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 mb-8 border-b border-slate-700">
                            <button className="pb-3 px-1 text-purple-400 border-b-2 border-purple-400 font-medium">
                                Entrar
                            </button>
                            <button
                                className="pb-3 px-1 text-slate-400 hover:text-slate-300 transition-colors"
                                onClick={() => router.push('/register')}
                            >
                                Criar Conta
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        placeholder="exemplo@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Senha
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs text-purple-400 hover:text-purple-300"
                                        onClick={() => router.push('/forgot-password')}
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Entrando...' : 'Acessar Sistema'}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-800/50 text-slate-400">Ou continue com</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 bg-slate-900/50 border border-slate-700 hover:border-slate-600 text-white py-3 rounded-lg transition-all"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 bg-slate-900/50 border border-slate-700 hover:border-slate-600 text-white py-3 rounded-lg transition-all"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    Apple
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer Text */}
                    <p className="text-center text-slate-500 text-sm mt-6">
                        Ao continuar, você concorda com nossos{' '}
                        <a href="#" className="text-purple-400 hover:text-purple-300">Termos de Serviço</a>
                        {' '}e{' '}
                        <a href="#" className="text-purple-400 hover:text-purple-300">Política de Privacidade</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
