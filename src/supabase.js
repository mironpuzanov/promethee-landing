import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qnnqnfitlaffcadtunuk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubnFuZml0bGFmZmNhZHR1bnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODk5NjIsImV4cCI6MjA5MDU2NTk2Mn0.ZFQjIWNtjGOLLIz5L17IMd0RPcsJr7wmphwCFcmW23M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export async function claimWaitlistPosition({ email, name, referredBy }) {
  const { data, error } = await supabase.rpc("claim_waitlist_position", {
    p_email: email,
    p_name: name,
    p_referred_by: referredBy || null,
  });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) throw new Error("Empty response from waitlist function");
  return {
    position: row.out_position,
    referralCode: row.out_referral_code,
    isNew: row.out_is_new,
  };
}
