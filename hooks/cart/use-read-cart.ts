// lib/cart/useReadCart.ts
"use client";

import { createClient } from "@/utils/supabase/client";
import { getSessionById } from "@/utils/get-session-id";
import type { CartItem } from "@/types/cart";

export async function readCart(): Promise<CartItem[]> {
  const userId = await getSessionById();
  if (!userId) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return (data || []).map((item) => ({
    id: item.product_id,
    name: item.product_name,
    price: item.price,
    originalPrice: item.original_price ?? undefined,
    thumbnail: item.thumbnail,
    quantity: item.quantity,
    stock: item.stock,
  }));
}
