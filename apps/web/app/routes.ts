import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("api/auth/signin", "routes/apiv1/auth/signIn.ts"),
  route("api/auth/signout", "routes/apiv1/auth/signOut.ts"),
  route("api/auth/callback", "routes/apiv1/auth/callback.ts"),

  route("auth/signin", "routes/auth/signin.tsx"),

  route("auth/init", "routes/auth/init.tsx"),

  route("appli/", "routes/appli/index.tsx"),

] satisfies RouteConfig;
