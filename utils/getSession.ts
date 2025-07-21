import { createClient } from "./supabase/client";

export async function getSession() {
    const supabase = await createClient();
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    if (error) {
        console.error("Error fetching session:", error);
        return null;
    }
  
    return session?.user.user_metadata;
}