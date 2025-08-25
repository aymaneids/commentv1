/*
  # Create testimonials system schema

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `client_name` (text)
      - `client_email` (text)
      - `content` (text)
      - `rating` (integer, 1-5)
      - `source` (text, enum-like)
      - `status` (text, enum-like)
      - `created_at` (timestamp)
      - `collection_link_id` (uuid, optional foreign key)
    
    - `collection_links`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text, optional)
      - `url` (text)
      - `is_active` (boolean)
      - `allow_video` (boolean)
      - `require_rating` (boolean)
      - `collect_email` (boolean)
      - `custom_message` (text, optional)
      - `submissions_count` (integer)
      - `views_count` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Add policy for public access to collection links for testimonial submission
*/

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_name text NOT NULL,
  client_email text DEFAULT '',
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  source text DEFAULT 'direct' CHECK (source IN ('direct', 'instagram', 'facebook', 'x', 'youtube')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'hidden')),
  collection_link_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Create collection_links table
CREATE TABLE IF NOT EXISTS collection_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  url text NOT NULL,
  is_active boolean DEFAULT true,
  allow_video boolean DEFAULT false,
  require_rating boolean DEFAULT true,
  collect_email boolean DEFAULT true,
  custom_message text DEFAULT '',
  submissions_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key constraint for collection_link_id
ALTER TABLE testimonials 
ADD CONSTRAINT fk_testimonials_collection_link 
FOREIGN KEY (collection_link_id) REFERENCES collection_links(id) ON DELETE SET NULL;

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_links ENABLE ROW LEVEL SECURITY;

-- Policies for testimonials table
CREATE POLICY "Users can read own testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anonymous users to insert testimonials via collection links
CREATE POLICY "Anonymous users can submit testimonials"
  ON testimonials
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policies for collection_links table
CREATE POLICY "Users can read own collection links"
  ON collection_links
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own collection links"
  ON collection_links
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own collection links"
  ON collection_links
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own collection links"
  ON collection_links
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anonymous users to read active collection links for testimonial submission
CREATE POLICY "Anonymous users can read active collection links"
  ON collection_links
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Allow anonymous users to update view/submission counts
CREATE POLICY "Anonymous users can update collection link counters"
  ON collection_links
  FOR UPDATE
  TO anon
  USING (is_active = true)
  WITH CHECK (is_active = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON testimonials(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_collection_link_id ON testimonials(collection_link_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_collection_links_user_id ON collection_links(user_id);
CREATE INDEX IF NOT EXISTS idx_collection_links_active ON collection_links(is_active);