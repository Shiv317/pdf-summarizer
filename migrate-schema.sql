-- Migration script to update pdf_summaries table
-- This script will modify the user_id column to accept Clerk user IDs

-- First, drop the foreign key constraint if it exists
ALTER TABLE pdf_summaries DROP CONSTRAINT IF EXISTS pdf_summaries_user_id_fkey;

-- Change the user_id column type from UUID to VARCHAR(255)
ALTER TABLE pdf_summaries ALTER COLUMN user_id TYPE VARCHAR(255);

-- Add an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_pdf_summaries_user_id ON pdf_summaries(user_id); 