export interface Work {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  created_at: string;
  user_id: string;
}

export interface Booking {
  id: string;
  name: string;
  contact: string;
  booking_date: string;
  booking_time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}
