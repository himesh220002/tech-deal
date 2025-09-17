CREATE TABLE "payments" (
	"payment_id" varchar(64) PRIMARY KEY NOT NULL,
	"order_id" varchar(64) NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(8) DEFAULT 'INR',
	"status" varchar(32) NOT NULL,
	"method" varchar(32),
	"email" varchar(128),
	"contact" varchar(32),
	"created_at" timestamp DEFAULT now()
);
