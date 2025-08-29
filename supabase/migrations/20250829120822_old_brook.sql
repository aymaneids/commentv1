/*
  # Update widget types constraint

  1. Changes
    - Update the widget_type check constraint to include all widget types used in the application
    - Add support for: wall, carousel, single, masonry, list, floating, featured, awards, infinite-scroll

  2. Security
    - Maintains existing RLS policies
    - No changes to existing data
*/

-- Drop the existing constraint
ALTER TABLE widgets DROP CONSTRAINT IF EXISTS widgets_widget_type_check;

-- Add the updated constraint with all widget types
ALTER TABLE widgets ADD CONSTRAINT widgets_widget_type_check 
  CHECK (widget_type = ANY (ARRAY[
    'wall'::text, 
    'carousel'::text, 
    'single'::text, 
    'masonry'::text, 
    'list'::text, 
    'floating'::text, 
    'featured'::text, 
    'awards'::text,
    'infinite-scroll'::text
  ]));