import { OrderData } from "@/types/order";
import { UserMetadata } from "@/types/user";
import { GetUserData } from "@/utils/get-session-metadata";
import { createClient } from "@/utils/supabase/client";

export async function FetchSpecificOrder(orderId: string): Promise<OrderData> {
  if (!orderId) {
    throw new Error("Id is required");
  }
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    throw error;
  }

  const user:UserMetadata = await GetUserData(data.user_id);

  const enrichedData: OrderData = {
    ...data,
    user_email: user.user_email,
    user_name: user.user_name,
  };

  return enrichedData;
}
