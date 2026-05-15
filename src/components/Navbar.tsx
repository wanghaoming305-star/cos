'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Camera, Calendar, Menu, X } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />

      <div className="glass border-b border-white/10 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-fuchsia-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative p-1.5 md:p-2 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-lg">
                  <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
              </div>
              <span className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-indigo-400 gradient-text">
                往往如此
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="relative px-4 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors"
              >
                作品
              </Link>
              <Link
                href="/booking"
                className="relative px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-shadow flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                预约
              </Link>
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile nav */}
            <div className="flex md:hidden items-center gap-1">
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="菜单"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden glass border-t border-white/10 dark:border-white/5 animate-fade-in-up">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-white/10 transition-colors"
              >
                作品
              </Link>
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                预约拍摄
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}