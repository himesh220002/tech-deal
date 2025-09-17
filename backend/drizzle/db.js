//drizzle/db.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema/index.js";

import ws from "ws";

neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL); 
export const db = drizzle(sql, { schema });
