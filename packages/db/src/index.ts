import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export * as schema from "./db/schema";

// 別パッケージで使用するものをexport
export * from "drizzle-orm"; 

export const db = (DATABASE_URL: string) => drizzle(postgres(DATABASE_URL, { prepare: false }));
export type DbType = ReturnType<typeof db>;