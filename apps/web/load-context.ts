import type { Context } from "hono";
import type { PlatformProxy } from "wrangler";
import type { User } from "@supabase/supabase-js";
import type { DbType } from "@acme/db";

export type Env = {
  Bindings: {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    AUTH_CALLBACK_URL: string;
    AUTH_REDIRECT_URL: string;
    AUTH_SIGNOUT_URL: string;
    DATABASE_URL: string;
  };
  Variables: {
    user: User;
    db: DbType
  }
};

type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Omit<
      PlatformProxy<Env["Bindings"]>,
      "dispose" | "caches" | "cf"
    > & {
      caches: PlatformProxy<Env>["caches"] | CacheStorage;
      cf: Request["cf"];
    };
    hono: {
      context: Context<Env>;
    };
  };
};

declare module "react-router" {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
    hono: {
      context: Context<Env>;
    };
  }
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  console.log(context.cloudflare.env.DATABASE_URL);
  return {
    ...context
  };
}
