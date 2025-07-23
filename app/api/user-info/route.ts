import { createAdminClient } from "@/utils/supabase/admin"; // your own wrapper
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }
  const supabase = createAdminClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(userId);


  if (error || !user) {
    return Response.json({ error: error?.message || "User not found" }, { status: 404 });
  }

  let user_name = "";
  if (user.app_metadata.provider === "google") {
    user_name = user.user_metadata?.name ?? "Unknown";
  } else if (user.app_metadata.provider === "email") {
    user_name = `${user.user_metadata?.firstName ?? ""} ${user.user_metadata?.lastName ?? ""}`.trim();
  }

  return Response.json({
    user_name,
    user_email: user.email ?? "",
  });
}
