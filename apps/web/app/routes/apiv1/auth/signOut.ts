import type { Route } from ".react-router/types/app/+types/root";
import { redirect } from "react-router";
import { signOut } from "~/libs/supabase/auth.supabase.server";

export const action = async ({ request, context }: Route.ActionArgs) => {
  const data =  await signOut(request, context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY, context.cloudflare.env.AUTH_SIGNOUT_URL);
  return redirect(data.data.url, { headers: data.headers });
};
