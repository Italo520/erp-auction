import { IAuthRepository } from '@/core/repositories/IAuthRepository';
import { User } from '@/core/entities/User';
import { supabase } from '@/infrastructure/api/supabaseClient';

export class SupabaseAuthRepository implements IAuthRepository {
    async signIn(email: string, password?: string): Promise<void> {
        if (password) {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
        } else {
            const { error } = await supabase.auth.signInWithOtp({
                email
            });
            if (error) throw error;
        }
    }

    async verifyOtp(email: string, token: string): Promise<{ user: User | null; session: any }> {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
        });

        if (error) throw error;

        let user: User | null = null;
        if (data.user) {
            user = {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata?.name || 'User',
                role: data.user.user_metadata?.role || 'BIDDER',
                isActive: data.user.user_metadata?.isActive ?? true,
                createdAt: new Date(data.user.created_at),
                updatedAt: new Date(data.user.updated_at || data.user.created_at)
            };
        }

        return { user, session: data.session };
    }

    async signOut(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return null;

        return {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || 'User',
            role: user.user_metadata?.role || 'BIDDER',
            isActive: user.user_metadata?.isActive ?? true,
            createdAt: new Date(user.created_at),
            updatedAt: new Date(user.updated_at || user.created_at)
        };
    }

    async getSession(): Promise<any> {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    }
}
