"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCms } from '@/components/CmsContext';
import { LayoutDashboard, Users, FileText, LogOut, Settings, IndianRupee } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, token, logout } = useCms();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Hide standard body styling for admin mode
    document.body.style.backgroundColor = '#f9fafb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  if (!token || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 fixed inset-0 z-[99999]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
          <p className="mb-4 text-gray-600">Please log in to access the CMS Dashboard.</p>
          <Link href="/login" className="bg-[#d4af37] text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-yellow-600 transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries & Leads', href: '/admin/leads', icon: Users },
    { name: 'Manage Blogs', href: '/admin/blogs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex fixed inset-0 z-[99999] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f2937] text-white flex flex-col h-full shadow-2xl flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-[#d4af37] tracking-wide">HKD CMS</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Role: {role}</p>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#d4af37] text-white font-semibold shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 relative overflow-y-auto bg-gray-50 h-full">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
