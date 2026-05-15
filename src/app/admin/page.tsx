'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Image, Calendar, TrendingUp, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    worksCount: 0,
    bookingsCount: 0,
    pendingCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();

      const [worksRes, bookingsRes] = await Promise.all([
        supabase.from('works').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
      ]);

      const { count: pendingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        worksCount: worksRes.count || 0,
        bookingsCount: bookingsRes.count || 0,
        pendingCount: pendingCount || 0,
      });

      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: '作品总数',
      value: stats.worksCount,
      icon: Image,
      gradient: 'from-fuchsia-500 to-pink-500',
      shadow: 'shadow-fuchsia-500/25',
    },
    {
      title: '预约总数',
      value: stats.bookingsCount,
      icon: Calendar,
      gradient: 'from-indigo-500 to-blue-500',
      shadow: 'shadow-indigo-500/25',
    },
    {
      title: '待处理',
      value: stats.pendingCount,
      icon: TrendingUp,
      gradient: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/25',
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-display font-bold">概览</h1>
        <Sparkles className="w-5 h-5 text-fuchsia-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          cards.map((_, i) => (
            <div key={i} className="h-36 bg-white/5 dark:bg-white/5 rounded-xl animate-pulse" />
          ))
        ) : (
          cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="gradient-border">
                <div className="gradient-border-inner glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${card.gradient} rounded-xl shadow-lg ${card.shadow}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                    <p className="text-3xl font-bold mt-1">{card.value}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}