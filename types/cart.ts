export type CartData = {
  id: string; 
  name: string; 
  original_price?: number; 
  thumbnail: string;
  price: number;
  quantity?: number; 
  stock: number;
};

export type Cart = {
  uu_id: string; 
  created_at: string; 
  id: string; 
  name: string; 
  original_price?: number; 
  thumbnail: string; 
  price: number;
  quantity: number; 
  stock: number;
  user_id?: string; 
};
export type  CartItem = {
  id: string; // product_id in DB
  name: string; // product_name
  price: number;
  originalPrice?: number;
  thumbnail: string;
  quantity: number;
  stock: number;
}
