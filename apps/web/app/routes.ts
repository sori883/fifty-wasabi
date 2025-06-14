import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/signin", "routes/auth/signin.tsx"),
  route("auth/callback", "routes/auth/callback.tsx"),
  route("auth/init", "routes/auth/init.tsx"),
  route("appli/", "routes/appli/index.tsx"),
] satisfies RouteConfig;
