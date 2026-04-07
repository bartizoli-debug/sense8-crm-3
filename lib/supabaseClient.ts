// ✅ CANONICAL SUPABASE CLIENT — use this everywhere in the app
// Import path: '@/lib/supabaseClient'
// This file is the single source of truth. lib/supabase/client.ts re-exports from here.

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let _client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (_client) return _client;
  _client = createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return _client;
}

// Named export for direct use: import { supabase } from '@/lib/supabaseClient'
export const supabase = getSupabaseClient();