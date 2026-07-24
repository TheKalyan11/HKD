"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Users, FileText, IndianRupee, Loader2 } from 'lucide-react';
import axios from 'axios';

type DashboardStats = {
  totalLeads: number;
  totalBlogs: number;
  totalDonations: number;
};

export default function AdminDashboard() {
  const { token } = useCms();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/cms/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#d4af37]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leads Stat Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Inquiries</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{stats?.totalLeads || 0}</h2>
          </div>
        </div>

        {/* Blogs Stat Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-green-100 text-green-600 p-4 rounded-xl">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Published Blogs</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{stats?.totalBlogs || 0}</h2>
          </div>
        </div>

        {/* Donations Stat Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-amber-100 text-amber-600 p-4 rounded-xl">
            <IndianRupee className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Successful Donations</p>
            <h2 className="text-3xl font-extrabold text-gray-900">{stats?.totalDonations || 0}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
