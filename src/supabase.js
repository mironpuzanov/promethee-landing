import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qnnqnfitlaffcadtunuk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubnFuZml0bGFmZmNhZHR1bnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODk5NjIsImV4cCI6MjA5MDU2NTk2Mn0.ZFQjIWNtjGOLLIz5L17IMd0RPcsJr7wmphwCFcmW23M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

// Mirrors the DB-side public.is_junk_email() function. Kept in sync so the
// user gets a friendly error before we even hit the network for obvious junk.
const DISPOSABLE_DOMAINS = new Set([
  // v1
  "mailinator.com", "guerrillamail.com", "guerrillamail.info",
  "guerrillamail.net", "guerrillamail.org", "10minutemail.com",
  "10minutemail.net", "tempmail.com", "temp-mail.org",
  "throwawaymail.com", "yopmail.com", "yopmail.fr", "getairmail.com",
  "sharklasers.com", "maildrop.cc", "spam4.me", "mintemail.com",
  "fakeinbox.com", "mailnesia.com", "trashmail.com", "mohmal.com",
  "dispostable.com", "mytemp.email", "tempr.email", "tmpmail.org",
  "tmpmail.net", "discard.email", "discardmail.com", "fake-mail.net",
  "mvrht.com", "inboxbear.com", "temporary-mail.net",
  // v2: domains used in the Corentin attack
  "scopemail.net", "turboutbox.com", "deltajohnsons.com",
  "fusioninbox.com", "kynninc.com", "wnbaldwy.com", "allfreemail.net",
  "mailmagnet.co", "ignitedock.com",
  // v2: other common disposable services
  "emailondeck.com", "getnada.com", "nada.email", "emailfake.com",
  "tempail.com", "mail-temp.com", "mailtemp.org", "instaddr.com",
  "incognitomail.org", "jetable.org", "mailcatch.com", "mailexpire.com",
  "mailforspam.com", "mailme.lv", "meltmail.com", "mt2014.com",
  "mt2015.com", "no-spam.ws", "objectmail.com", "proxymail.eu",
  "rcpt.at", "sogetthis.com", "soodonims.com", "spambog.com",
  "spambox.us", "thankyou2010.com", "trbvm.com", "trillianpro.com",
  "twinmail.de", "venompen.com", "wegwerfmail.de", "wegwerfmail.net",
  "wegwerfmail.org", "whyspam.me", "willhackforfood.biz",
  "willselfdestruct.com", "wuzup.net", "wuzupmail.net", "xagloo.com",
  "xemaps.com", "xents.com", "xmaily.com", "yapped.net", "zetmail.com",
  "zoemail.org", "zoemail.net", "zoemail.com",
]);

const JUNK_LOCAL_PARTS = new Set([
  "go", "goo", "goog", "googl", "google", "gmail", "test", "tests",
  "testing", "abc", "xyz", "aaa", "asdf", "qwerty", "qwer", "hello",
  "hi", "user", "demo", "admin", "root", "fake", "noreply", "spam",
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","o","p","q","r","s","t","u","v","w","x","y","z",
]);

export function isJunkEmail(email) {
  const e = (email || "").toLowerCase().trim();
  if (!e || !e.includes("@")) return true;
  const [local, domain] = e.split("@");
  if (!local || !domain) return true;
  if (DISPOSABLE_DOMAINS.has(domain)) return true;
  if (JUNK_LOCAL_PARTS.has(local)) return true;
  if (/(.)\1{4,}/.test(local)) return true;
  if (local.length >= 8 && /^(qwe|asd|zxc|wer|ert|sdf|dfg|fgh|xcv|cvb|gojy|sasa|saqq){2,}/.test(local)) return true;
  return false;
}

export async function claimWaitlistPosition({ email, name, referredBy }) {
  // Pre-flight: catch obvious junk before we hit the network.
  if (isJunkEmail(email)) {
    const err = new Error("Please enter a real email address.");
    err.code = "invalid_email";
    throw err;
  }

  const { data, error } = await supabase.rpc("claim_waitlist_position", {
    p_email: email,
    p_name: name,
    p_referred_by: referredBy || null,
  });
  if (error) {
    // Translate Postgres check_violation messages into user-friendly errors
    if (error.message === "invalid email") {
      const e = new Error("Please enter a real email address.");
      e.code = "invalid_email";
      throw e;
    }
    if (error.message === "duplicate signup") {
      const e = new Error("This name is already on the list under that referral.");
      e.code = "duplicate";
      throw e;
    }
    if (error.message === "rate limited") {
      const e = new Error("Too many signups from this referral right now. Please try again later.");
      e.code = "rate_limited";
      throw e;
    }
    throw error;
  }
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) throw new Error("Empty response from waitlist function");
  return {
    position: row.out_position,
    referralCode: row.out_referral_code,
    isNew: row.out_is_new,
  };
}
