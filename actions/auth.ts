"use server";

import { createClient } from "@/utils/supabase/server";

export async function signInWithGoogle(redirectTo: string) {
  const supabase = await createClient();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(baseURL, "🔗 Base URL for Google Sign-In in actions");
  const redirectURL = `${baseURL}/auth/callback?next=${redirectTo}`;
   if (!baseURL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set in env");
  }


  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectURL,
    },
  });
  if (error) {
    console.log("❌ Error during Google Sign-In in actions:", error);
    throw error;
  }
  return data;
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
