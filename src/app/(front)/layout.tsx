'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Navbar } from '@/components/Navbar';

const DotField = dynamic(() => import('@/components/DotField'), { ssr: false });
const HeroBand = dynamic(() => import('@/components/HeroBand'), { ssr: false });

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="min-h-screen bg-dots relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <DotField
          dotRadius={isDark ? 1.2 : 1.8}
          dotSpacing={isDark ? 18 : 16}
          cursorRadius={450}
          bulgeStrength={isDark ? 70 : 90}
          sparkle={true}
          waveAmplitude={isDark ? 0.5 : 1.0}
          gradientFrom={isDark ? 'rgba(168, 85, 247, 0.45)' : 'rgba(168, 85, 247, 0.6)'}
          gradientTo={isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.45)'}
        />
        <HeroBand
          color="#A855F7"
          speed={0.15}
          scale={1.2}
          frequency={1.1}
          warpStrength={isDark ? 9 : 12}
          noise={isDark ? 0.03 : 0.06}
          bandWidth={isDark ? 1.2 : 1.6}
          intensity={isDark ? 0.85 : 1.2}
          mouseInfluence={0.25}
        />
      </div>
      <Navbar />
      <main className="pt-24 relative z-10">{children}</main>
    </div>
  );
}