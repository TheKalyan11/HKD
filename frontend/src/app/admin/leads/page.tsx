"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestType: string;
  targetId: string;
  message?: string;
  createdAt: { _seconds: number; _nanoseconds: number } | string;
};

export default function LeadsDashboard() {
  const { token } = useCms();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    
    const fetchLeads = async () => {
      try {
        const res = await axios.get('/api/cms/leads', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLeads(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load leads.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, [token]);

  const formatDate = (dateObj: any) => {
    if (!dateObj) return 'N/A';
    if (dateObj._seconds) {
      return new Date(dateObj._seconds * 1000).toLocaleString();
    }
    return new Date(dateObj).toLocaleString();
  };

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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiries & Leads</h1>
      <p className="text-gray-500 mb-8">View and manage all contact requests and volunteer signups.</p>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Interest / Target</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">{lead.email}</div>
                    <div className="text-gray-500 text-sm">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md font-medium mb-1">
                      {lead.interestType}
                    </span>
                    <br />
                    <span className="text-gray-500 text-sm">{lead.targetId}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={lead.message}>
                    {lead.message || '-'}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
