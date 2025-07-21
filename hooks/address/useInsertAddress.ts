// lib/address/useInsertAddress.ts
"use client";

import { createClient } from "@/utils/supabase/client";
import { getSessionById } from "@/utils/get-session-id";
import type { Address } from "@/types/address";

export async function insertAddress(payload: Omit<Address, "id" | "user_id" | "created_at" | "updated_at">) {
  const userId = await getSessionById();
  if (!userId) throw new Error("User must be logged in");

  const supabase = createClient();

  const { error } = await supabase.from("address_book").insert({
    ...payload,
    user_id: userId,
  });

  if (error) throw error;
}
