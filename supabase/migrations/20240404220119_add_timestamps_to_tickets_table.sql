-- Add created_at and updated_at columns to the tickets table
ALTER TABLE
  IF EXISTS "public"."tickets"
ADD
  COLUMN created_at TIMESTAMPTZ DEFAULT NOW(),
ADD
  COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();