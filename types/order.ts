export enum ORDERSTATUS {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export type Order = {
  id: string;
  address_id: number;
  order_num: string;
  user_id: string;
  total_amount: number;
  status: ORDERSTATUS;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  original_price: number;
  thumbnail: string;
};

export type OrderData = {
  id: string;
  address_id: number;
  order_num: string;
  user_id: string;
  total_amount: number;
  status: ORDERSTATUS;
  user_name: string;
  user_email: string;
  created_at:string;
};
