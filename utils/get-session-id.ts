import { createClient } from "./supabase/client";

export async function getSessionById() {
    const supabase =  createClient();
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    if (error) {
        console.error("Error fetching session:", error);
        return null;
    }
    console.log(
        "Session fetched successfully:",
        session?.user.user_metadata
    )
    return session?.user.id;
}