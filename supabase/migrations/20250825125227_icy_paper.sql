/*
  # Add username and slug columns for custom URLs

  1. New Columns
    - `users.username` - unique username for each user (lowercase, alphanumeric + hyphens only)
    - `collection_links.slug` - custom slug for each collection link (unique per user)
  
  2. Security
    - Add constraints to ensure data integrity
    - Add indexes for performance
    - Add validation functions
  
  3. Changes
    - Users table gets username column with unique constraint
    - Collection links table gets slug column
    - Add validation functions for username and slug formats
*/

-- Add username column to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'username'
  ) THEN
    ALTER TABLE users ADD COLUMN username text UNIQUE;
  END IF;
END $$;

-- Add slug column to collection_links table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'collection_links' AND column_name = 'slug'
  ) THEN
    ALTER TABLE collection_links ADD COLUMN slug text;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_collection_links_user_slug ON collection_links(user_id, slug);

-- Add unique constraint for slug per user
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'collection_links_user_slug_unique'
  ) THEN
    ALTER TABLE collection_links ADD CONSTRAINT collection_links_user_slug_unique UNIQUE(user_id, slug);
  END IF;
END $$;

-- Create validation function for username format
CREATE OR REPLACE FUNCTION validate_username(username_input text)
RETURNS boolean AS $$
BEGIN
  -- Check if username is lowercase, alphanumeric with hyphens only, 3-30 characters
  RETURN username_input ~ '^[a-z0-9-]{3,30}$' AND username_input NOT LIKE '--%' AND username_input NOT LIKE '%--';
END;
$$ LANGUAGE plpgsql;

-- Create validation function for slug format
CREATE OR REPLACE FUNCTION validate_slug(slug_input text)
RETURNS boolean AS $$
BEGIN
  -- Check if slug is lowercase, alphanumeric with hyphens only, 1-50 characters
  RETURN slug_input ~ '^[a-z0-9-]{1,50}$' AND slug_input NOT LIKE '--%' AND slug_input NOT LIKE '%--';
END;
$$ LANGUAGE plpgsql;

-- Add check constraints
ALTER TABLE users ADD CONSTRAINT users_username_format_check 
  CHECK (username IS NULL OR validate_username(username));

ALTER TABLE collection_links ADD CONSTRAINT collection_links_slug_format_check 
  CHECK (slug IS NULL OR validate_slug(slug));

-- Update RLS policies to include username access
CREATE POLICY "Public can read usernames for URL resolution"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (username IS NOT NULL);