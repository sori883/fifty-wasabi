import type { MiddlewareHandler } from "hono";
import { getUser } from "~/libs/supabase/auth.supabase.server";
import type { Env } from "../../load-context";
import { getUser as getUserDb } from "~/repos/user";


export const inited: MiddlewareHandler<Env> = async (c, next) => {
  console.log("inited middleware");

  const user = await getUser(c.req.raw, c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);

  if (!user) {
    return c.redirect("/auth/signin", 302);
  }

  const isUserInit = await getUserDb(c.get("db"), { email: user.email! });
  if (!isUserInit?.username && !isUserInit?.displayName) {
    return c.redirect("/auth/init", 302);
  }

  await next();
};