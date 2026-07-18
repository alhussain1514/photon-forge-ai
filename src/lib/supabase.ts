import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // This is intentionally a console warning, not a thrown error, so the UI
  // (which shows its own "not configured" screen) can still render.
  // eslint-disable-next-line no-console
  console.warn(
    '[SunScale Pro] Supabase is not configured. Set VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_ANON_KEY in your .env file. See README.md.'
  );
}

// Fall back to harmless placeholder values so createClient doesn't throw when
// env vars are missing; isSupabaseConfigured gates actual usage in the UI.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
