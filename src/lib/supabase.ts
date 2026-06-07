import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON);
export const VEHICLE_BUCKET = "vehicle-images";

let browserClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured (missing env vars).");
  }
  if (typeof window !== "undefined") {
    browserClient ??= createClient(SUPABASE_URL!, SUPABASE_ANON!);
    return browserClient;
  }
  return createClient(SUPABASE_URL!, SUPABASE_ANON!);
}
