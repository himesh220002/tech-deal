// backend/drizzle/schema/users.js
import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  boolean,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id",{ length:36 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }),
  verified: boolean("verified").default(false),
  liked_items: jsonb("liked_items").$type([]),
  created_at: timestamp("created_at").defaultNow(),
});


