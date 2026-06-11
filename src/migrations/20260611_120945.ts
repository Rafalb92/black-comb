import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_realizations_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum_realizations_category" AS ENUM('haircut', 'beard', 'combo', 'styling', 'other');
  CREATE TABLE "realizations_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "realizations_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "realizations_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "realizations_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_realizations_blocks_gallery_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "realizations_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"author_context" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "realizations_blocks_before_after" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before_id" integer NOT NULL,
  	"after_id" integer NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "realizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"category" "enum_realizations_category" DEFAULT 'haircut' NOT NULL,
  	"short_description" varchar NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"is_featured" boolean DEFAULT false,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "realizations_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "footer_tagline" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "copyright_text" varchar DEFAULT 'Black Comb. Wszelkie prawa zastrzeżone.' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "show_opening_hours_in_footer" boolean DEFAULT true;
  ALTER TABLE "homepage" ADD COLUMN "realizations_section_is_enabled" boolean DEFAULT true;
  ALTER TABLE "homepage" ADD COLUMN "realizations_section_eyebrow" varchar;
  ALTER TABLE "homepage" ADD COLUMN "realizations_section_title" varchar DEFAULT 'Realizacje' NOT NULL;
  ALTER TABLE "homepage" ADD COLUMN "realizations_section_description" varchar;
  ALTER TABLE "homepage" ADD COLUMN "realizations_section_display_limit" numeric DEFAULT 4;
  ALTER TABLE "homepage" ADD COLUMN "realizations_section_cta_label" varchar DEFAULT 'Zobacz wszystkie realizacje';
  ALTER TABLE "realizations_gallery" ADD CONSTRAINT "realizations_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "realizations_gallery" ADD CONSTRAINT "realizations_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realizations_blocks_paragraph" ADD CONSTRAINT "realizations_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realizations_blocks_gallery_images" ADD CONSTRAINT "realizations_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "realizations_blocks_gallery_images" ADD CONSTRAINT "realizations_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realizations_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realizations_blocks_gallery" ADD CONSTRAINT "realizations_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realizations_blocks_quote" ADD CONSTRAINT "realizations_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realizations_blocks_before_after" ADD CONSTRAINT "realizations_blocks_before_after_before_id_media_id_fk" FOREIGN KEY ("before_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "realizations_blocks_before_after" ADD CONSTRAINT "realizations_blocks_before_after_after_id_media_id_fk" FOREIGN KEY ("after_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "realizations_blocks_before_after" ADD CONSTRAINT "realizations_blocks_before_after_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realizations" ADD CONSTRAINT "realizations_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "realizations" ADD CONSTRAINT "realizations_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_legal_links" ADD CONSTRAINT "site_settings_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "realizations_gallery_order_idx" ON "realizations_gallery" USING btree ("_order");
  CREATE INDEX "realizations_gallery_parent_id_idx" ON "realizations_gallery" USING btree ("_parent_id");
  CREATE INDEX "realizations_gallery_image_idx" ON "realizations_gallery" USING btree ("image_id");
  CREATE INDEX "realizations_blocks_paragraph_order_idx" ON "realizations_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "realizations_blocks_paragraph_parent_id_idx" ON "realizations_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "realizations_blocks_paragraph_path_idx" ON "realizations_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "realizations_blocks_gallery_images_order_idx" ON "realizations_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "realizations_blocks_gallery_images_parent_id_idx" ON "realizations_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "realizations_blocks_gallery_images_image_idx" ON "realizations_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "realizations_blocks_gallery_order_idx" ON "realizations_blocks_gallery" USING btree ("_order");
  CREATE INDEX "realizations_blocks_gallery_parent_id_idx" ON "realizations_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "realizations_blocks_gallery_path_idx" ON "realizations_blocks_gallery" USING btree ("_path");
  CREATE INDEX "realizations_blocks_quote_order_idx" ON "realizations_blocks_quote" USING btree ("_order");
  CREATE INDEX "realizations_blocks_quote_parent_id_idx" ON "realizations_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "realizations_blocks_quote_path_idx" ON "realizations_blocks_quote" USING btree ("_path");
  CREATE INDEX "realizations_blocks_before_after_order_idx" ON "realizations_blocks_before_after" USING btree ("_order");
  CREATE INDEX "realizations_blocks_before_after_parent_id_idx" ON "realizations_blocks_before_after" USING btree ("_parent_id");
  CREATE INDEX "realizations_blocks_before_after_path_idx" ON "realizations_blocks_before_after" USING btree ("_path");
  CREATE INDEX "realizations_blocks_before_after_before_idx" ON "realizations_blocks_before_after" USING btree ("before_id");
  CREATE INDEX "realizations_blocks_before_after_after_idx" ON "realizations_blocks_before_after" USING btree ("after_id");
  CREATE UNIQUE INDEX "realizations_slug_idx" ON "realizations" USING btree ("slug");
  CREATE INDEX "realizations_cover_image_idx" ON "realizations" USING btree ("cover_image_id");
  CREATE INDEX "realizations_og_image_idx" ON "realizations" USING btree ("og_image_id");
  CREATE INDEX "realizations_updated_at_idx" ON "realizations" USING btree ("updated_at");
  CREATE INDEX "realizations_created_at_idx" ON "realizations" USING btree ("created_at");
  CREATE INDEX "site_settings_legal_links_order_idx" ON "site_settings_legal_links" USING btree ("_order");
  CREATE INDEX "site_settings_legal_links_parent_id_idx" ON "site_settings_legal_links" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_realizations_fk" FOREIGN KEY ("realizations_id") REFERENCES "public"."realizations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_realizations_id_idx" ON "payload_locked_documents_rels" USING btree ("realizations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "realizations_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "realizations_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "realizations_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "realizations_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "realizations_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "realizations_blocks_before_after" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "realizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_legal_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "realizations_gallery" CASCADE;
  DROP TABLE "realizations_blocks_paragraph" CASCADE;
  DROP TABLE "realizations_blocks_gallery_images" CASCADE;
  DROP TABLE "realizations_blocks_gallery" CASCADE;
  DROP TABLE "realizations_blocks_quote" CASCADE;
  DROP TABLE "realizations_blocks_before_after" CASCADE;
  DROP TABLE "realizations" CASCADE;
  DROP TABLE "site_settings_legal_links" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_realizations_fk";
  
  DROP INDEX "payload_locked_documents_rels_realizations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "realizations_id";
  ALTER TABLE "site_settings" DROP COLUMN "footer_tagline";
  ALTER TABLE "site_settings" DROP COLUMN "copyright_text";
  ALTER TABLE "site_settings" DROP COLUMN "show_opening_hours_in_footer";
  ALTER TABLE "homepage" DROP COLUMN "realizations_section_is_enabled";
  ALTER TABLE "homepage" DROP COLUMN "realizations_section_eyebrow";
  ALTER TABLE "homepage" DROP COLUMN "realizations_section_title";
  ALTER TABLE "homepage" DROP COLUMN "realizations_section_description";
  ALTER TABLE "homepage" DROP COLUMN "realizations_section_display_limit";
  ALTER TABLE "homepage" DROP COLUMN "realizations_section_cta_label";
  DROP TYPE "public"."enum_realizations_blocks_gallery_layout";
  DROP TYPE "public"."enum_realizations_category";`)
}
