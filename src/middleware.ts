import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase credentials missing. Bypassing authentication for testing.');
        return response;
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Proteção de rotas simples
    // Se não estiver logado e tentar acessar qualquer rota que não seja publica (login, etc), redireciona
    // Vamos proteger tudo dentro de (dashboard) basicamente ou todas que não sejam login e assets

    const isLoginPage = request.nextUrl.pathname.startsWith('/login');
    const isPublicResource = request.nextUrl.pathname.includes('.'); // assets, images, etc roughly

    if (!user && !isLoginPage && !isPublicResource) {
        // Redireciona para login se tentar acessar área protegida
        // Protegendo rotas principais
        if (request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/leiloes') || request.nextUrl.pathname.startsWith('/veiculos') || request.nextUrl.pathname.startsWith('/usuarios') || request.nextUrl.pathname.startsWith('/configuracoes')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (user && isLoginPage) {
        // Se já está logado e vai pro login, manda pro dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
