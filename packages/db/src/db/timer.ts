import { relations, sql } from "drizzle-orm";
import { integer, timestamp, uuid } from "drizzle-orm/pg-core";

import { createTable } from "./_table";
import { tasksTable } from "./tasks";
import { usersTable } from "./users";

export const timersTable = createTable("timers_table", {
  id: uuid("id").defaultRandom().primaryKey(),
  totalSeconds: integer("total_seconds").default(0).notNull(),

  userId: uuid("user_id").notNull(),
  taskId: uuid("task_id").notNull().unique(),
  createdAt: timestamp("create_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at").default(sql`NULL`),
});

export const timerRelations = relations(timersTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [timersTable.userId],
    references: [usersTable.id],
  }),
  task: one(tasksTable, {
    fields: [timersTable.taskId],
    references: [tasksTable.id],
  }),
}));
