'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { WorkCard } from '@/components/WorkCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Work } from '@/types';
import { Camera, Sparkles, ChevronDown } from 'lucide-react';

export default function Home() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setWorks(data);
      }
      setLoading(false);
    };

    fetchWorks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 relative">
      {/* Animated background orbs - smaller on mobile */}
      <div className="absolute top-10 md:top-20 left-0 md:left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-500/5 blur-[80px] md:blur-[120px] animate-float pointer-events-none" />
      <div className="absolute top-20 md:top-40 right-0 md:right-1/4 w-[150px] md:w-[300px] h-[150px] md:h-[300px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[60px] md:blur-[100px] animate-float-delayed pointer-events-none" />

      {/* Hero Section */}
      <section className="text-center mb-12 md:mb-20 relative">
        <ScrollReveal>
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 glass rounded-full mb-6 md:mb-8 border border-fuchsia-500/20">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-fuchsia-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-fuchsia-600 dark:text-fuchsia-300">
              二次元人像摄影
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 tracking-tight leading-tight">
            <span className="relative">
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 gradient-text animate-gradient-pan bg-[length:200%_auto]">
                往往如此
              </span>
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-md md:max-w-xl mx-auto leading-relaxed px-4">
            用镜头记录最美好的你，每一帧都是属于你的二次元幻想
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href="/booking"
              className="w-full sm:w-auto px-8 py-3 md:py-3.5 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/50 transition-all active:scale-95 text-center"
            >
              预约拍摄
            </a>
            <a
              href="#gallery"
              className="w-full sm:w-auto px-6 py-3 md:py-3.5 glass rounded-xl border border-white/20 dark:border-white/10 font-medium text-gray-700 dark:text-gray-200 hover:border-fuchsia-500/50 transition-all flex items-center justify-center gap-2"
            >
              浏览作品
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <ScrollReveal>
          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
            <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest">
              Gallery
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full min-h-[250px] bg-gray-100 dark:bg-gray-800/50 rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        ) : works.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {works.map((work, index) => (
              <WorkCard key={work.id} work={work} index={index} />
            ))}
          </div>
        ) : (
          <ScrollReveal direction="scale">
            <div className="text-center py-16 md:py-20">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-fuchsia-400" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-base md:text-lg">暂无作品，敬请期待</p>
              <p className="text-gray-300 dark:text-gray-600 text-xs md:text-sm mt-2">精彩内容即将上线</p>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 pb-6 md:pb-8 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent mb-6 md:mb-8" />
        <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} 往往如此 &middot; 二次元人像摄影
        </p>
      </footer>
    </div>
  );
}