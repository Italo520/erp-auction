import React, { createContext, useState, useEffect, useMemo } from 'react';
import { User } from '../../core/entities/User';
import { LoginUseCase } from '../../core/usecases/auth/LoginUseCase';
import { LogoutUseCase } from '../../core/usecases/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '../../core/usecases/auth/GetCurrentUserUseCase';
import { useRepositories } from '../../core/contexts/RepositoryContext';

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { authRepo } = useRepositories();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializa os UseCases com o repositório injetado
  const loginUseCase = useMemo(() => new LoginUseCase(authRepo), [authRepo]);
  const logoutUseCase = useMemo(() => new LogoutUseCase(authRepo), [authRepo]);
  const getCurrentUserUseCase = useMemo(() => new GetCurrentUserUseCase(authRepo), [authRepo]);

  useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUserUseCase.execute();
        if (mounted) setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    loadUser();
    return () => { mounted = false; };
  }, [getCurrentUserUseCase]);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      await loginUseCase.execute(email);
      // Após o login, buscamos os dados do usuário atualizados
      const currentUser = await getCurrentUserUseCase.execute();
      setUser(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUseCase.execute();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};