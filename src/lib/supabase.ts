import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ## Auth helper functions
// --------------------

export const signUp = async (email: string, password: string, userData?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// ## User/Profile helper functions
// -------------------------

/**
 * Checks if a username is already taken in the 'users' table.
 */
export const checkUsernameAvailability = async (username: string) => {
  try {
    const { data, error } = await supabase
      .from('users') // Or 'profiles', depending on your table name
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error checking username:', error);
      throw error;
    }

    // If `data` is null, the username is available.
    return { available: !data, error: null };
  } catch (error: any) {
    console.error('Error checking username:', error.message);
    return { available: false, error };
  }
};

/**
 * Validates that the username format is correct.
 */
export const validateUsernameFormat = (username: string) => {
  const regex = /^[a-z0-9-]{3,20}$/;
  if (username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters.' };
  }
  if (username.length > 20) {
    return { valid: false, message: 'Username cannot be more than 20 characters.' };
  }
  if (!regex.test(username)) {
    return { valid: false, message: 'Use only lowercase letters, numbers, and hyphens.' };
  }
  return { valid: true, message: '' };
};