import { createClient } from "@/utils/supabase/client"



export async function GetSpecificOrderItems (orderId:string){
    if(!orderId){
        throw new Error("Order ID is required")
    }
    const supabase = createClient();

    const {data:orderItems,error} = await supabase.from('order_items').select('*').eq('order_id',orderId)

    if(error){
        throw new Error("Failed to fetch order items")
    }
    return orderItems
}