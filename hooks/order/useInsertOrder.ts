import { getSessionById } from "@/utils/get-session-id";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { readCart } from "../cart/use-read-cart";

export const ConfirmOrder = async (addressId: number) => {
  const userId = await getSessionById();
  if (!userId) {
    toast.error("Kindly login first");
    return;
  }

  const items = await readCart();
  if (items.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const afterShippingPrice = totalPrice + 150;
  const supabase = createClient();

  // 1. Create Order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      status: "pending",
      address_id: addressId,
      total_amount: afterShippingPrice,
    })
    .select()
    .single();

  if (orderError || !order) {
    toast.error(orderError?.message || "Order creation failed");
    console.log("order->", orderError);
    return;
  }

  // 2. Insert order_items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    product_name: item.name,
    price: item.price,
    original_price: item.originalPrice ?? null,
    thumbnail: item.thumbnail,
  }));

  const { error: itemInsertError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemInsertError) {
    toast.error(itemInsertError.message);
    console.log(itemInsertError,'error -> order items')
    return;
  }

  // 3. Update product stock
  for (const item of items) {
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("stock")
      .eq("uu_id", item.id)
      .single();

    if (fetchError || !product) {
      toast.error(`Error fetching product ${item.id}`);
      return;
    }

    const newStock = product.stock - item.quantity;
    if (newStock < 0) {
      toast.error(`Insufficient stock for product ${item.name}`);
      return;
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("uu_id", item.id);

    if (updateError) {
      toast.error(`Failed to update stock for ${item.name}`);
      return;
    }
  }

  // 4. Clear Cart
  const { error: cartDeleteError } = await supabase
    .from("cart_items") // corrected table name
    .delete()
    .eq("user_id", userId);

  if (cartDeleteError) {
    toast.error("Failed to clear cart");
    return;
  }

  toast.success("Order placed successfully!");
};
