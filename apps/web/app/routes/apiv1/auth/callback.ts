import { redirect } from "react-router";
import { createSupabaseServerClient } from "~/libs/supabase/supabase.server";
import type { Route } from "../../../+types/root";

export async function loader({ request, context }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? context.cloudflare.env.AUTH_REDIRECT_URL;
  const { client, headers } = createSupabaseServerClient(request, context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY);

  if (code) {
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error) {
      return redirect(next, { headers });
    }
  }

  // return the user to an error page with instructions
  return redirect("/error", { headers });
}