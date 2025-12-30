import { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export interface AuthUser {
    id: string;
    email: string;
    role?: string;
}

/**
 * Valida a autenticação e retorna o usuário autenticado
 */
export async function validateAuth(request: NextRequest): Promise<AuthUser | null> {
    try {
        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    },
                },
            }
        );

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email!,
            role: user.user_metadata?.role,
        };
    } catch (error) {
        console.error('Error validating auth:', error);
        return null;
    }
}

/**
 * Verifica se o usuário tem permissão de admin
 */
export function isAdmin(user: AuthUser): boolean {
    return user.role === 'ADMIN';
}

/**
 * Middleware que requer autenticação
 * Retorna o usuário ou null se não autenticado
 */
export async function requireAuth(request: NextRequest): Promise<AuthUser | null> {
    const user = await validateAuth(request);
    return user;
}

/**
 * Middleware que requer permissão de admin
 * Retorna o usuário admin ou null se não for admin
 */
export async function requireAdmin(request: NextRequest): Promise<AuthUser | null> {
    const user = await validateAuth(request);

    if (!user) {
        return null;
    }

    if (!isAdmin(user)) {
        return null;
    }

    return user;
}
