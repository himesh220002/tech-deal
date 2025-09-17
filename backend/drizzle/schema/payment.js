// backend/drizzle/schema/payment.js

import { pgTable, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  payment_id: varchar("payment_id", { length: 255 }).primaryKey(),
  order_id: varchar("order_id", { length: 255 }).notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  method: varchar("method", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  contact: varchar("contact", { length: 20 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
