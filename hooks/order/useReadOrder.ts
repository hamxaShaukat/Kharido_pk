import { OrderData } from "@/types/order";
import { GetUserData } from "@/utils/get-session-metadata";
import { createClient } from "@/utils/supabase/client";

export async function GetOrders(): Promise<OrderData[]> {
  const supabase = createClient();

  const { data: orders, error } = await supabase.from("orders").select("*");
  if (error) throw error;
  const enrichedOrder: OrderData[] = [];

  for (const order of orders) {
    const meta = await GetUserData(order.user_id);

    enrichedOrder.push({
      ...order,
      user_name: meta?.user_name,
      user_email: meta?.user_email,
    });
  }

  return enrichedOrder;
}
