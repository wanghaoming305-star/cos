'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Booking } from '@/types';
import { Trash2, Calendar, Clock, Mail } from 'lucide-react';

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setBookings(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: Booking['status']) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (!error) {
      fetchBookings();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个预约吗？')) return;

    const supabase = createClient();
    const { error } = await supabase.from('bookings').delete().eq('id', id);

    if (!error) {
      fetchBookings();
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
      confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: '待处理',
      confirmed: '已确认',
      completed: '已完成',
      cancelled: '已取消',
    };
    return texts[status] || '未知';
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">预约管理</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="gradient-border">
              <div className="gradient-border-inner p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold">{booking.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {booking.contact}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {booking.booking_date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {booking.booking_time}
                      </div>
                    </div>

                    {booking.notes && (
                      <p className="mt-3 text-gray-600 dark:text-gray-300">
                        {booking.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(
                          booking.id,
                          e.target.value as Booking['status']
                        )
                      }
                      className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                    >
                      <option value="pending">待处理</option>
                      <option value="confirmed">已确认</option>
                      <option value="completed">已完成</option>
                      <option value="cancelled">已取消</option>
                    </select>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              暂无预约
            </div>
          )}
        </div>
      )}
    </div>
  );
}
