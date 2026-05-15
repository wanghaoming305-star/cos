'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Calendar, Clock, Send, Check, ArrowLeft, Sparkles, User, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    booking_date: '',
    booking_time: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const supabase = createClient() as any;
      const { error } = await supabase.from('bookings').insert({
        name: formData.name,
        contact: formData.contact,
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
        notes: formData.notes || null,
      });

      if (!error) {
        setSuccess(true);
        setFormData({
          name: '',
          contact: '',
          booking_date: '',
          booking_time: '',
          notes: '',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="absolute top-20 left-1/3 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full bg-green-500/10 blur-[80px] md:blur-[100px] animate-float pointer-events-none" />
        <div className="max-w-md w-full relative">
          <div className="gradient-border">
            <div className="gradient-border-inner p-6 md:p-10 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold mb-2 md:mb-3">预约成功！</h2>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed">
                感谢您的预约，我会尽快与您联系确认细节。
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-fuchsia-500/25 hover:opacity-90 transition-opacity text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 relative">
      <ScrollReveal>
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-fuchsia-500 transition-colors mb-6 md:mb-8 group text-sm">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回首页
        </Link>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 glass rounded-full mb-4 md:mb-6 border border-fuchsia-500/20">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-fuchsia-400" />
            <span className="text-xs md:text-sm font-medium text-fuchsia-600 dark:text-fuchsia-300">
              开启你的二次元之旅
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 gradient-text">
              预约拍摄
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            填写以下信息，开启你的二次元摄影之旅
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="gradient-border">
          <div className="gradient-border-inner glass-strong p-5 md:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium mb-2 md:mb-2.5">
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" />
                  你的名字
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 md:px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent outline-none transition-all backdrop-blur-sm text-sm md:text-base"
                  placeholder="请输入名字"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium mb-2 md:mb-2.5">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" />
                  联系方式
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-3.5 md:px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent outline-none transition-all backdrop-blur-sm text-sm md:text-base"
                  placeholder="微信 / QQ / 手机号"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium mb-2 md:mb-2.5">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" />
                    日期
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.booking_date}
                    onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                    className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent outline-none transition-all backdrop-blur-sm text-sm"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium mb-2 md:mb-2.5">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" />
                    时间
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.booking_time}
                    onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                    className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent outline-none transition-all backdrop-blur-sm text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium mb-2 md:mb-2.5">
                  <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" />
                  备注
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-3.5 md:px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent outline-none resize-none transition-all backdrop-blur-sm text-sm md:text-base"
                  placeholder="想要拍摄的角色、风格、地点等..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 md:py-4 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-medium rounded-xl hover:opacity-90 transition-all shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/50 flex items-center justify-center gap-2 text-base md:text-lg active:scale-[0.98]"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                {submitting ? '提交中...' : '提交预约'}
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}