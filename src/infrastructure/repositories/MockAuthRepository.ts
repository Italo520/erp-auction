import { IAuthRepository } from "@/core/repositories/IAuthRepository";
import { User } from "@/core/entities/User";

const MOCK_USER: User = {
  id: 'user-123',
  name: 'Admin User',
  email: 'admin@leiloes083.com',
  role: 'ADMIN',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVK4IJfncfhL_25Eq0T7DWIWBhcRywdPro73gr3cybjfflGzyEVZtICR2w8aLUlqGZpqsFz3Xbt-7LhmLGXMQx6LBW2pixE3l6tgPlz8dGr8hEhKKYVdvfw70kSO6_oeynpOZmy34yy1-cjJxbpx0f0QaE5ou8utQ8qxDkedyn5juhAkFpzf_NoJ54gevbAId7-al_sgxEuR3MGkv9twQ080Hc5ZBuZ-tpmdeBqz6O_de4Uim36cmmOStXfUiOkWvMNye1dH0LJjlc',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

export class MockAuthRepository implements IAuthRepository {
  async signIn(email: string): Promise<void> {
    console.log(`[MockAuth] SignIn requested for ${email}`);
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simula sucesso armazenando token fake
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', 'mock-jwt-token');
      localStorage.setItem('user_data', JSON.stringify(MOCK_USER));
    }
  }

  async verifyOtp(email: string, token: string): Promise<{ user: User | null; session: any }> {
    console.log(`[MockAuth] Verify OTP: ${token} for ${email}`);
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      user: MOCK_USER,
      session: { access_token: 'mock-jwt-token' }
    };
  }

  async signOut(): Promise<void> {
    console.log('[MockAuth] SignOut');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user_data');
      if (stored) {
        return JSON.parse(stored) as User;
      }
    }
    return null;
  }

  async getSession(): Promise<any> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      return token ? { access_token: token } : null;
    }
    return null;
  }
}