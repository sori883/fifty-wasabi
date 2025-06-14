import { Form, redirect } from "react-router";
import type { Route } from "../../+types/root";
import { signInWithGoogle } from "~/libs/supabase/auth.supabase.server";

export const action = async ({ request, context }: Route.ActionArgs) => {
  const data =  await signInWithGoogle(request, context.cloudflare.env.SUPABASE_URL, context.cloudflare.env.SUPABASE_ANON_KEY, context.cloudflare.env.AUTH_CALLBACK_URL);
  const parsedData = data;

  // リダイレクトURLはdata.urlに格納されている。
  // 自動でリダイレクトはしてくれないので、手動で行う。
  return redirect(parsedData.data.url!, { headers: data.headers });
};


export default function SignIn() {
  return (
    <>
      <Form method="post">
        <button type="submit">Sign In</button>
      </Form>
    </>
  );
}