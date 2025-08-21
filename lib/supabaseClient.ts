import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// IMPORTANT: These variables are loaded from environment variables.
// Make sure to set them in your Vercel project settings.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key are required. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);