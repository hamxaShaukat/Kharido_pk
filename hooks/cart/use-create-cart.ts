// lib/cart/useInsertOrUpdateCartItem.ts
"use client";

import { createClient } from "@/utils/supabase/client";
import { getSessionById } from "@/utils/get-session-id";
import { toast } from "sonner";

type InsertItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  quantity: number;
  stock: number;
};
export async function insertOrUpdateCartItem(item: InsertItem) {
  const userId = await getSessionById();
  if (!userId) throw new Error("You must be logged in");

  const supabase = createClient();

  const { data: status, error } = await supabase.rpc(
    "insert_or_update_cart_item",
    {
      p_user_id: userId,
      p_product_id: item.id,
      p_product_name: item.name,
      p_price: item.price,
      p_original_price: item.originalPrice ?? null,
      p_thumbnail: item.thumbnail,
      p_quantity: item.quantity,
      p_stock: item.stock,
    }
  );

  if (error) {
    console.error("DB Error:", error);
    toast.error("Something went wrong!");
  }

  if (status === "stock_limit_reached") {
    toast.warning("Item already at stock limit");
  } else if (status === "inserted") {
    toast.success("Item added to cart");
  } else if (status === "updated") {
    toast.success("Item quantity updated");
  }
}
