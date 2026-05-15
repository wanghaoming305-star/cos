'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full bg-white/10 border border-white/10"
        disabled
      >
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-full border border-white/10 dark:border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 relative z-10" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-400 relative z-10" />
      )}
    </button>
  );
}