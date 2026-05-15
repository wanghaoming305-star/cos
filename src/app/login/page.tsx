'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { ArrowLeft, LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/admin/works');
      }
    } catch (err) {
      setError('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute top-1/4 left-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full bg-fuchsia-500/10 blur-[80px] md:blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[150px] md:w-[250px] h-[150px] md:h-[250px] rounded-full bg-indigo-500/10 blur-[60px] md:blur-[100px] animate-float-delayed pointer-events-none" />

      <div className="w-full max-w-md relative">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-fuchsia-500 transition-colors mb-6 md:mb-8 group text-sm">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
          返回首页
        </Link>

        <div className="gradient-border">
          <div className="gradient-border-inner glass-strong p-6 md:p-10">
            <div className="text-center mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-fuchsia-500/25">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-display font-bold">管理员登录</h1>
              <p className="text-xs md:text-sm text-gray-400 mt-1.5 md:mt-2">登录以管理作品和预约</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
              <div>
                <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium mb-2 md:mb-2.5">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" />
                  邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 md:px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent outline-none transition-all backdrop-blur-sm text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium mb-2 md:mb-2.5">
                  <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400" />
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 md:px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent outline-none transition-all backdrop-blur-sm text-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-2.5 md:p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-red-500 text-xs md:text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 md:py-3.5 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-medium rounded-xl hover:opacity-90 transition-all shadow-lg shadow-fuchsia-500/25 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                {loading ? '登录中...' : '登录'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}