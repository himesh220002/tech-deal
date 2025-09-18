CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"verified" boolean DEFAULT false,
	"liked_items" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" varchar(255) PRIMARY KEY NOT NULL,
	"order_id" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(10) NOT NULL,
	"status" varchar(50) NOT NULL,
	"method" varchar(50),
	"email" varchar(255),
	"contact" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL
);
