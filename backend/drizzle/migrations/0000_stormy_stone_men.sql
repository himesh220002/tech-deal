CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"verified" boolean DEFAULT false,
	"liked_items" jsonb,
	"created_at" timestamp DEFAULT now()
);
