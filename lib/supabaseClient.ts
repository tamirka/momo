import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// IMPORTANT: These variables are loaded from environment variables.
// In a modern frontend project (using a tool like Vite), variables exposed to the browser
// must be prefixed (e.g., VITE_). Make sure to set these in your Vercel project settings.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key are required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);