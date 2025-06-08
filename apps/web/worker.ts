import handle from "hono-react-router-adapter/cloudflare-workers";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as build from "./build/server";
import { getLoadContext } from "./load-context";
import app from "./server";

export default handle(build, app, { getLoadContext });
