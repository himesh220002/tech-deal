ALTER TABLE "payments" ALTER COLUMN "payment_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "order_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "currency" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "currency" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "currency" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "method" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "method" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "contact" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "created_at" SET NOT NULL;