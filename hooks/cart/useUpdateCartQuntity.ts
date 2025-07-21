

import { createClient } from "@/utils/supabase/client";
import { getSessionById } from "@/utils/get-session-id";

// lib/cart/useUpdateCartQuantity.ts
export async function updateCartQuantity(productId: string, newQty: number) {
  const userId = await getSessionById();
  if (!userId) throw new Error("Not logged in");

  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: newQty })
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) throw error;
}

// lib/cart/useDeleteCartItem.ts
export async function deleteCartItem(productId: string) {
  const userId = await getSessionById();
  if (!userId) throw new Error("Not logged in");

  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) throw error;
}
