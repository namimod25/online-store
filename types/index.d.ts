
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    stock: number;
    category_id?: string;
    created_at?: string;
  }
  
  export interface Order {
    id: string;
    user_id: string;
    total_amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at: string;
  }
  
  // Add other types as needed