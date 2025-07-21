// lib/address/useDeleteAddress.ts
"use client";

import { createClient } from "@/utils/supabase/client";

export async function deleteAddress(id: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("address_book")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
