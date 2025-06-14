import { Form, redirect } from "react-router";
import { signOut } from "~/libs/supabase/auth.supabase.server";
import type { Route } from "../../+types/root";
import { AppliBase } from "~/components/layout";

export const action = async ({ request, context }: Route.ActionArgs) => {
  const data =  await signOut(request, context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY, context.cloudflare.env.AUTH_SIGNOUT_URL);
  return redirect(data.data.url, { headers: data.headers });
};

export default function Index() {
  return (
    <AppliBase>
      <div>
        <Form method="post">
          <button type="submit">Sign Out</button>
        </Form>
      </div>
    </AppliBase>
  );
}