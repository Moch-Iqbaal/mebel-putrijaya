import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const CACHE_HEADERS = ['cache-control', 'expires', 'pragma'];

function isLoginPath(pathname: string): boolean {
  return pathname === '/admin/login' || pathname === '/admin/login/';
}

function redirectTo(request: NextRequest, pathname: string, session: NextResponse): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';
  const redirect = NextResponse.redirect(url);
  session.cookies.getAll().forEach((cookie) => {
    redirect.cookies.set(cookie);
  });
  for (const name of CACHE_HEADERS) {
    const value = session.headers.get(name);
    if (value) redirect.headers.set(name, value);
  }
  return redirect;
}

/**
 * Validates the Supabase session cookie and gates /admin.
 * Login stays public so the browser can establish the cookie, then
 * navigation to /admin is checked again on the next request.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const loginPath = isLoginPath(pathname);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (loginPath) return NextResponse.next({ request });
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // getClaims() must run immediately after the client is created so refreshed
  // auth cookies are written onto this response.
  let authenticated = false;
  try {
    const { data } = await supabase.auth.getClaims();
    authenticated = Boolean(data?.claims);
  } catch {
    authenticated = false;
  }

  if (!authenticated && !loginPath) {
    return redirectTo(request, '/admin/login', response);
  }

  if (authenticated && loginPath) {
    return redirectTo(request, '/admin', response);
  }

  return response;
}
