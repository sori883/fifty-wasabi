import { Hono } from "hono";
import type { Env } from "../load-context";
import { init, inited, unnecessaryLogin, allRoute } from "./middleware";

const app = new Hono<Env>();

app.use("*", allRoute, async(c, next) => {
  
  await next();
});

app.use("/auth/signin", unnecessaryLogin, async(c, next) => {
  await next();
});

app.use("/auth/init", init, async(c, next) => {
  await next();
});

app.use("/appli/*", inited, async(c, next) => {
  await next();
});

export default app;
