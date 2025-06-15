import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy as remixCloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from './load-context'

export default defineConfig(({ mode }) => ({
  plugins: [
    remixCloudflareDevProxy(),
    reactRouter(),
    serverAdapter({
      adapter,
      getLoadContext,
      entry: "server/index.ts",
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  // bugっぽい。`https://github.com/remix-run/remix/issues/9245`
  resolve: {
    alias: {
      ...(mode === "development" && { "postgres": path.resolve(__dirname, "../../node_modules/postgres/src/index.js") })
    }
  },
}));
