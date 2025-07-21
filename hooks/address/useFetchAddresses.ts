// lib/address/useFetchAddresses.ts
"use client";

import { createClient } from "@/utils/supabase/client";
import { getSessionById } from "@/utils/get-session-id";
import type { Address } from "@/types/address";

export async function fetchAddresses(): Promise<Address[]> {
  const userId = await getSessionById();
  if (!userId) return [];

  const supabase = createClient();

  const { data, error } = await supabase
    .from("address_book")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Address[];
}
