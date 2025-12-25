import { User } from "../entities/User";

export interface IAuthRepository {
  signIn(email: string, password?: string): Promise<void>; // Magic Link ou Senha
  verifyOtp(email: string, token: string): Promise<{ user: User | null; session: any }>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  getSession(): Promise<any>;
}