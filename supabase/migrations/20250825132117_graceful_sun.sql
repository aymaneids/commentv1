/*
  # Fix user creation trigger and RLS policies

  1. Updates
    - Fix the handle_new_user trigger function to properly handle user creation
    - Ensure RLS policies allow the trigger to work correctly
    - Add proper error handling for username conflicts

  2. Security
    - Maintain existing RLS policies
    - Ensure trigger runs with proper permissions
*/

-- Drop existing trigger and function to recreate them
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    first_name,
    last_name,
    company,
    username,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'company', ''),
    CASE 
      WHEN NEW.raw_user_meta_data->>'username' IS NOT NULL 
           AND NEW.raw_user_meta_data->>'username' != '' 
      THEN NEW.raw_user_meta_data->>'username'
      ELSE NULL
    END,
    NOW(),
    NOW()
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- If username is taken, set it to null and continue
    INSERT INTO public.users (
      id,
      email,
      first_name,
      last_name,
      company,
      username,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'company', ''),
      NULL, -- Set username to null if there's a conflict
      NOW(),
      NOW()
    );
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth signup
    RAISE WARNING 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure the function can bypass RLS
ALTER FUNCTION public.handle_new_user() SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT ALL ON public.users TO supabase_auth_admin;