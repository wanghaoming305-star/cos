'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const { x: pmx, y: pmy } = prevMouseRef;

      // Spawn ripples based on mouse movement distance
      const dx = mx - pmx;
      const dy = my - pmy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const now = performance.now();

      if (dist > 8 && now - lastSpawnRef.current > 60) {
        lastSpawnRef.current = now;
        ripplesRef.current.push({
          x: mx,
          y: my,
          radius: 0,
          maxRadius: 200 + Math.random() * 100,
          opacity: 0.7,
          speed: 2 + Math.random() * 1.5,
        });
      }
      prevMouseRef.current = { x: mx, y: my };

      // Update & draw ripples
      const alive: Ripple[] = [];
      for (const r of ripplesRef.current) {
        r.radius += r.speed;
        r.opacity *= 0.985;

        if (r.opacity < 0.01 || r.radius > r.maxRadius) continue;

        const progress = r.radius / r.maxRadius;
        const alpha = r.opacity * (1 - progress);

        // Draw ripple as a glowing ring
        // Outer glow ring
        const outerGrad = ctx.createRadialGradient(r.x, r.y, r.radius - 4, r.x, r.y, r.radius);
        outerGrad.addColorStop(0, `rgba(168, 85, 247, 0)`);
        outerGrad.addColorStop(0.6, `rgba(168, 85, 247, ${alpha * 0.5})`);
        outerGrad.addColorStop(1, `rgba(168, 85, 247, 0)`);

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bright inner edge
        const innerEdge = r.radius - 8;
        if (innerEdge > 0) {
          const innerGrad = ctx.createRadialGradient(r.x, r.y, innerEdge, r.x, r.y, r.radius - 2);
          innerGrad.addColorStop(0, 'rgba(168, 85, 247, 0)');
          innerGrad.addColorStop(0.7, `rgba(168, 85, 247, ${alpha * 0.25})`);
          innerGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 2, 0, Math.PI * 2);
          ctx.fillStyle = innerGrad;
          ctx.fill();
        }

        alive.push(r);
      }
      ripplesRef.current = alive;

      // Persistent subtle glow at mouse position
      if (mx > 0 && my > 0) {
        const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.02)');
        glowGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.015)');
        glowGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}