CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT
);

CREATE TABLE IF NOT EXISTS "pdf_exports" (
  "id" TEXT PRIMARY KEY,
  "status" VARCHAR(20) NOT NULL,
  "source_url" TEXT,
  "temp_url" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "expires_at" TIMESTAMP,
  "error" TEXT
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_pdf_exports_status" ON "pdf_exports"("status");
CREATE INDEX IF NOT EXISTS "idx_pdf_exports_created_at" ON "pdf_exports"("created_at");
