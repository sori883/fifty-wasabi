import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

// see: https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=remix&queryGroups=package-manager&package-manager=pnpm&queryGroups=environment&environment=remix-loader

export function createSupabaseServerClient(
  request: Request,
  SUPABASE_URL: string,
  SUPABASE_ANON_KEY: string,
) {
  const headers = new Headers();

  const client = createServerClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    {
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
      },
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
          return cookies.map(cookie => ({
            name: cookie.name,
            value: cookie.value ?? "" // undefinedの場合は空文字にする
          }));
        },
        setAll(cookiesToSet) {
					for (const cookie of cookiesToSet) {
						const { name, value, options } = cookie;
						headers.append(
							"Set-Cookie",
							serializeCookieHeader(name, value, options),
						);
					}
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      },
  });

  return { 
    client,
    headers,
  };
}