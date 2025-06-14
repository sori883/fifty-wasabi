import type { DbType } from "@acme/db";
import { schema, eq } from "@acme/db";
import { z } from "zod";

export const updateInitUserSchema = z.object({
  username: z.string(),
  displayName: z.string(),
  email : z.string(),
});

export async function updateInitUser(db: DbType, data: z.infer<typeof updateInitUserSchema>) {
  try {
    const v = updateInitUserSchema.parse(data);

    await db
      .update(schema.usersTable)
      .set({
        username: v.username,
        displayName: v.displayName,
      })
      .where(eq(schema.usersTable.email, v.email));
  } catch (error) {
    console.error("Error inserting user:", error);
  };
}