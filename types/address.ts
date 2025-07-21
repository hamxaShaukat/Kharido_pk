// types/address.ts
export interface Address {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  address_name?: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}
