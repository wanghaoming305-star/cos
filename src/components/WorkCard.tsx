'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Work } from '@/types';

interface WorkCardProps {
  work: Work;
  index?: number;
}

export function WorkCard({ work, index = 0 }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;

    setRotation({
      y: ((x - centerX) / centerX) * 5,
    });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotation({ y: 0 });
  }, []);

  return (
    <Link
      href={`/gallery/${work.id}`}
      className="group block"
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: 'fade-in-up 0.6s ease-out both',
      }}
    >
      <div
        ref={cardRef}
        className="gradient-border cursor-pointer"
        style={{ perspective: '1200px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="gradient-border-inner p-0 overflow-hidden"
          style={{
            transform: `rotateY(${rotation.y}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div className="relative w-full bg-gray-950/50 flex items-center justify-center overflow-hidden">
            <Image
              src={work.image_url}
              alt={work.title}
              width={600}
              height={400}
              className="w-full h-auto object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Radial glow overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle 300px at ${glowPos.x}% ${glowPos.y}%, rgba(168,85,247,0.25) 0%, transparent 60%)`,
              }}
            />

            {/* Shine stripe */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
              style={{
                background: `linear-gradient(${rotation.y > 0 ? '105' : '75'}deg, transparent 35%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 55%, transparent 65%)`,
              }}
            />

            {/* Bottom info overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {work.title}
                </h3>
                <div className="flex flex-wrap gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {work.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}