'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Work } from '@/types';
import { ArrowLeft, Calendar, Tag, ChevronRight } from 'lucide-react';

export default function GalleryDetail() {
  const params = useParams();
  const router = useRouter();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('works')
        .select('*')
        .eq('id', params.id)
        .single();

      if (data) {
        setWork(data);
      }
      setLoading(false);
    };

    fetchWork();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="w-full h-48 md:h-64 bg-gray-100 dark:bg-gray-800/50 rounded-2xl animate-pulse mb-6 md:mb-8" />
        <div className="h-6 md:h-8 w-36 md:w-48 bg-gray-100 dark:bg-gray-800/50 rounded-lg animate-pulse mb-3 md:mb-4" />
        <div className="h-4 w-64 md:w-96 bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse" />
      </div>
    );
  }

  if (!work) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
        <p className="text-gray-400 text-base md:text-lg mb-4">作品不存在</p>
        <Link href="/" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-sm md:text-base">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 md:gap-2 text-gray-400 hover:text-fuchsia-400 transition-colors mb-4 md:mb-8 group text-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
        返回
      </button>

      <ScrollReveal>
        <div className="gradient-border">
          <div className="gradient-border-inner glass-strong p-0">
            <div className="relative w-full bg-gray-950/50 flex items-center justify-center rounded-t-[calc(1rem-1px)] overflow-hidden">
              <Image
                src={work.image_url}
                alt={work.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[50vh] md:max-h-[80vh]"
                priority
              />
            </div>

            <div className="p-5 md:p-8 lg:p-10">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 md:mb-4">
                {work.title}
              </h1>

              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                {work.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/20 dark:to-indigo-900/20 rounded-full text-xs md:text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300"
                  >
                    <Tag className="w-2.5 h-2.5 md:w-3 md:h-3 opacity-50" />
                    {tag}
                  </span>
                ))}
              </div>

              {work.description && (
                <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {work.description}
                </p>
              )}

              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/50 transition-all group/btn text-sm md:text-base"
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  预约拍摄
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}