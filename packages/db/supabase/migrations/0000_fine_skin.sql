CREATE TABLE "study_aws_users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar,
	"display_name" varchar DEFAULT NULL,
	"email" varchar NOT NULL,
	"thumbnail_url" varchar,
	"provider_username" varchar,
	"create_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp DEFAULT NULL,
	CONSTRAINT "study_aws_users_table_username_unique" UNIQUE("username"),
	CONSTRAINT "study_aws_users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "study_aws_projects_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_name" varchar,
	"project_color" varchar,
	"user_id" uuid NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp DEFAULT NULL,
	CONSTRAINT "study_aws_projects_table_project_name_unique" UNIQUE("project_name"),
	CONSTRAINT "study_aws_projects_table_project_color_unique" UNIQUE("project_color")
);
--> statement-breakpoint
CREATE TABLE "study_aws_tasks_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_name" varchar DEFAULT 'gray',
	"task_status" varchar DEFAULT NULL,
	"user_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE "study_aws_timers_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"total_seconds" integer DEFAULT 0 NOT NULL,
	"user_id" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp DEFAULT NULL,
	CONSTRAINT "study_aws_timers_table_task_id_unique" UNIQUE("task_id")
);
--> statement-breakpoint
CREATE TABLE "study_aws_projects_to_weeklys" (
	"project_id" uuid NOT NULL,
	"weekly_id" uuid NOT NULL,
	"scheduled_time" integer DEFAULT 0 NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp DEFAULT NULL,
	CONSTRAINT "study_aws_projects_to_weeklys_project_id_weekly_id_pk" PRIMARY KEY("project_id","weekly_id")
);
--> statement-breakpoint
CREATE TABLE "study_aws_weeklys_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"total_seconds" integer DEFAULT 0 NOT NULL,
	"user_id" uuid NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp DEFAULT NULL
);
