/*
  # Create widget_previews table

  1. New Tables
    - `widget_previews`
      - `id` (uuid, primary key)
      - `widget_id` (uuid, references widgets)
      - `user_id` (uuid, references auth.users)
      - `preview_data` (jsonb, stores widget and testimonials data)
      - `preview_url` (text, unique URL for preview access)
      - `is_active` (boolean, controls preview availability)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `widget_previews` table
    - Add policies for authenticated users to manage their own previews
    - Allow anonymous users to read active previews by URL

  3. Indexes
    - Index on user_id for efficient user queries
    - Index on preview_url for fast URL lookups
    - Index on is_active for filtering active previews
*/

CREATE TABLE IF NOT EXISTS widget_previews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  widget_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  preview_data jsonb NOT NULL,
  preview_url text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE widget_previews ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_widget_previews_user_id ON widget_previews (user_id);
CREATE INDEX IF NOT EXISTS idx_widget_previews_preview_url ON widget_previews (preview_url);
CREATE INDEX IF NOT EXISTS idx_widget_previews_active ON widget_previews (is_active);
CREATE INDEX IF NOT EXISTS idx_widget_previews_widget_id ON widget_previews (widget_id);

-- RLS Policies for authenticated users
CREATE POLICY "Users can read own widget previews"
  ON widget_previews
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own widget previews"
  ON widget_previews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own widget previews"
  ON widget_previews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own widget previews"
  ON widget_previews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anonymous users to read active previews by URL (for public preview access)
CREATE POLICY "Anonymous users can read active previews"
  ON widget_previews
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_widget_previews_updated_at'
  ) THEN
    CREATE TRIGGER update_widget_previews_updated_at
      BEFORE UPDATE ON widget_previews
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;