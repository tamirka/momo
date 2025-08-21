export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          supplier_id: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          min_order_qty: number
          created_at: string
        }
        Insert: {
          supplier_id: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          min_order_qty: number
        }
        Update: {
          id?: number
          supplier_id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          image_url?: string
          min_order_qty?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          role: "buyer" | "supplier"
          company_name: string | null
        }
        Insert: {
          id: string
          email: string
          role: "buyer" | "supplier"
          company_name?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: "buyer" | "supplier"
          company_name?: string | null
        }
      }
      orders: {
        Row: {
            id: number;
            buyer_id: string;
            supplier_id: string;
            product_id: number;
            total: number;
            status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
            created_at: string;
        }
      }
      quotes: {
        Row: {
            id: number;
            buyer_id: string;
            supplier_id: string;
            product_id: number;
            status: 'Pending' | 'Response Received' | 'Accepted' | 'Expired';
            created_at: string;
        }
      }
      messages: {
        Row: {
          id: number
          sender_id: string
          receiver_id: string
          content: string
          created_at: string
        }
        Insert: {
          sender_id: string
          receiver_id: string
          content: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_conversations: {
        Args: {
          p_user_id: string
        }
        Returns: {
            id: string
            email: string
            role: "buyer" | "supplier"
            company_name: string | null
            last_message: string
            last_message_time: string
        }[]
      }
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Custom types for the application
export type Product = Database['public']['Tables']['products']['Row'] & {
    profiles: Pick<Profile, 'company_name'> | null;
};
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Conversation = {
    participant: Profile;
    messages: Message[];
};