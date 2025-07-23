import { Address } from "@/types/address";
import { createClient } from "@/utils/supabase/client";

export async function GetSpecificAddress(id: number): Promise<Address> {

  const supabase = createClient();
  const { data, error } = await supabase
    .from("address_book")
    .select('*')
    .eq("id", id)
    .single()


  if (error) {
    throw error;
  }
  return data;
}
