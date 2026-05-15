export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      works: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          image_url: string;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          image_url: string;
          tags?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          image_url?: string;
          tags?: string[];
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          name: string;
          contact: string;
          booking_date: string;
          booking_time: string;
          notes: string | null;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          contact: string;
          booking_date: string;
          booking_time: string;
          notes?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          contact?: string;
          booking_date?: string;
          booking_time?: string;
          notes?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          created_at?: string;
        };
      };
    };
  };
}
