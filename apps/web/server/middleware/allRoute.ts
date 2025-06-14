import type { MiddlewareHandler } from "hono";
import { getUser } from "~/libs/supabase/auth.supabase.server";
import type { Env } from "../../load-context";
import { db } from "@acme/db";

/**
 * RemixのContextから参照出来るようにする
 */
export const allRoute: MiddlewareHandler<Env> = async (c, next) => {
  c.set("db", db(c.env.DATABASE_URL));
  const user = await getUser(c.req.raw, c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);
  if (user) {
    c.set("user", user);
  }

  await next();
};