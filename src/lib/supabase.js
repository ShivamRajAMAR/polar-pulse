import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://osiztuduzytaaymgxglz.supabase.co";
const supabaseAnonKey = "sb_publishable_swJLf61gXZYzrNM36vDKmg_4vjlEKac";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);