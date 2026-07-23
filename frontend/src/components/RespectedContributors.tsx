"use client";

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';

interface Donation {
  id: string;
  name: string;
  amount: number;
  timestamp: any; // Firestore Timestamp
}

export default function RespectedContributors() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filter, setFilter] = useState<'recent' | 'generous'>('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If Firebase isn't configured, show an error message
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      setError("Firebase configuration is missing.");
      setIsLoading(false);
      return;
    }

    try {
      const donationsRef = collection(db, 'donations');
      const q = filter === 'recent' 
        ? query(donationsRef, orderBy('timestamp', 'desc'), limit(10))
        : query(donationsRef, orderBy('amount', 'desc'), limit(10));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs: Donation[] = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() } as Donation);
        });
        setDonations(docs);
        setIsLoading(false);
      }, (err) => {
        console.error("Firestore Error:", err);
        setError("Could not connect to the database.");
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error(err);
      setError("Error initializing real-time updates.");
      setIsLoading(false);
    }
  }, [filter]);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10 relative">
        <div className="flex items-center gap-3 text-[#d4af37] mb-3">
          <div className="h-px w-10 bg-current"></div>
          <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">ONLINE DONATIONS</span>
          <div className="h-px w-10 bg-current"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight">
          Recent <span className="text-[#d4af37]">Contributions</span>
        </h2>
      </div>

      <div className="flex justify-center mb-6 sm:mb-10">
        <div className="bg-[#f4f4f5] p-1.5 rounded-full inline-flex border border-gray-200">
          <button
            onClick={() => setFilter('recent')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
              filter === 'recent'
                ? 'bg-[#18181b] text-white shadow-md transform scale-105'
                : 'text-gray-600 hover:text-[#18181b] hover:bg-gray-200'
            }`}
          >
            Latest Donations
          </button>
          <button
            onClick={() => setFilter('generous')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
              filter === 'generous'
                ? 'bg-[#18181b] text-white shadow-md transform scale-105'
                : 'text-gray-600 hover:text-[#18181b] hover:bg-gray-200'
            }`}
          >
            Top Donations
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-[#1e88e5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto">
          {error}
        </div>
      ) : donations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No recent donations found. Be the first!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donations.map((donation) => (
            <div 
              key={donation.id} 
              className="bg-white border border-gray-100 p-5 rounded-[24px] flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] font-sans"
            >
              <div className="w-12 h-12 rounded-full bg-[#faf8f5] flex items-center justify-center border border-[#eae4d5] text-lg font-bold text-[#d4af37] flex-shrink-0 shadow-sm">
                {donation.name ? donation.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="flex flex-col">
                <p className="text-[#18181b] font-bold text-[15px] md:text-[16px]">
                  {donation.name || 'Anonymous'} <span className="font-normal text-gray-500">donated</span> <span className="text-[#d4af37]">₹ {donation.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </p>
                <p className="text-[13px] text-gray-400 mt-1 font-medium tracking-wide uppercase">
                  {donation.timestamp 
                    ? formatDistanceToNow(donation.timestamp.toDate(), { addSuffix: true })
                    : 'Just now'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
