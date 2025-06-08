import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import serverAdapter from "hono-react-router-adapter/vite";
import adapter from "@hono/vite-dev-server/cloudflare";
import { cloudflareDevProxy as remixCloudflareDevProxy } from "@react-router/dev/vite/cloudflare";

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    serverAdapter({
      adapter,
      entry: "server/index.ts",
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
