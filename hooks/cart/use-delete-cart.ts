// lib/cart/useDeleteCartItem.ts
"use client";

import { createClient } from "@/utils/supabase/client";
import { getSessionById } from "@/utils/get-session-id";

export async function fullyDeleteCartItem(productId: string) {
  const userId = await getSessionById();
  if (!userId) return;

  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) throw error;
}
