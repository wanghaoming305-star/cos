'use client';

import { useMouse } from './MouseContext';

export function CursorGlow() {
  const { x, y } = useMouse();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] dark:opacity-[0.04] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.4) 40%, transparent 70%)',
          left: x - 300,
          top: y - 300,
          transition: 'left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.08] dark:opacity-[0.05] blur-[60px]"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)',
          left: x - 150,
          top: y - 150,
          transition: 'left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
    </div>
  );
}