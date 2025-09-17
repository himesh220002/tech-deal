// backend/drizzle/schema/payment.js

import { pgTable, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  payment_id: varchar("payment_id", { length: 64 }).primaryKey(),
  order_id: varchar("order_id", { length: 64 }).notNull(),
  amount: integer("amount").notNull(), // INR
  currency: varchar("currency", { length: 8 }).default("INR"),
  status: varchar("status", { length: 32 }).notNull(),
  method: varchar("method", { length: 32 }),
  email: varchar("email", { length: 128 }),
  contact: varchar("contact", { length: 32 }),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
});
