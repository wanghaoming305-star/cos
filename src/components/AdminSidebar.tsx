'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image, Calendar, LogOut, Sparkles, Menu, X } from 'lucide-react';

interface AdminSidebarProps {
  onLogout?: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '/admin', label: '概览', icon: Home },
    { href: '/admin/works', label: '作品管理', icon: Image },
    { href: '/admin/bookings', label: '预约管理', icon: Calendar },
  ];

  const sidebarContent = (
    <>
      <div className="p-4 md:p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 md:p-2 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          </div>
          <h2 className="font-display text-base md:text-lg font-bold bg-gradient-to-r from-fuchsia-400 to-indigo-400 gradient-text">
            管理后台
          </h2>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-2 md:p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all text-sm md:text-base ${
                isActive
                  ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-500/25'
                  : 'hover:bg-white/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {onLogout && (
        <div className="p-2 md:p-3 border-t border-white/10 dark:border-white/5">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 md:gap-3 w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm md:text-base"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden glass border-b border-white/10 dark:border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display text-base font-bold bg-gradient-to-r from-fuchsia-400 to-indigo-400 gradient-text">
            管理后台
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          aria-label="菜单"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden glass border-b border-white/10 dark:border-white/5 animate-fade-in-up">
          {sidebarContent}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-56 lg:w-64 glass border-r border-white/10 dark:border-white/5 min-h-screen">
        {sidebarContent}
      </aside>
    </>
  );
}