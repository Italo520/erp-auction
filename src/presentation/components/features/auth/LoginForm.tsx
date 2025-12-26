'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginFormProps, LoginFormData, LoginFormErrors } from './LoginForm.types';
import { isValidEmail, isValidPassword } from '@/shared/utils/validators';
import { Input } from '@/presentation/components/ui/Input/Input';
import { Button } from '@/presentation/components/ui/Button/Button';
import { Card } from '@/presentation/components/ui/Card/Card';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpa erro ao digitar
        if (errors[name as keyof LoginFormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validate = (): boolean => {
        const newErrors: LoginFormErrors = {};
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'E-mail é obrigatório';
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'E-mail inválido';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
            isValid = false;
        } else if (!isValidPassword(formData.password)) {
            newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);

            // Simulação de delay ou chamada real se onSubmit for passado
            try {
                if (onSubmit) {
                    await onSubmit(formData);
                } else {
                    // Comportamento padrão se não houver handler externo
                    console.log('Login data:', formData);
                    // Simula espera
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    // Redireciona para dashboard (simulado)
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrors(prev => ({ ...prev, generic: 'Erro ao conectar com o servidor.' }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto p-6 md:p-8">
            <div className="flex flex-col space-y-2 text-center mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
                <p className="text-sm text-muted-foreground text-slate-500">
                    Entre com seu e-mail e senha para acessar
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="E-mail"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={isLoading || isSubmitting}
                />

                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    disabled={isLoading || isSubmitting}
                />

                {errors.generic && (
                    <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                        {errors.generic}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || isSubmitting}
                >
                    {isLoading || isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
        </Card>
    );
};
