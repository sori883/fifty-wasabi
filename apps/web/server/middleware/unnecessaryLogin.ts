import type { MiddlewareHandler } from "hono";
import { getUser } from "~/libs/supabase/auth.supabase.server";
import type { Env } from "../../load-context";

export const unnecessaryLogin: MiddlewareHandler<Env> = async (c, next) => {
  console.log("unnecessaryLogin middleware");

  const user = await getUser(c.req.raw, c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);
  if (user) {
    return c.redirect("/appli/", 302);
  }

  await next();
};