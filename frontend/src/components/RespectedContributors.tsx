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
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-section-heading text-[#0c4a8a] text-center mb-6 sm:mb-8">
        Respected Contributors
      </h2>

      <div className="flex justify-center mb-6 sm:mb-10">
        <div className="bg-[#e8f4fd] p-1 rounded-full inline-flex">
          <button
            onClick={() => setFilter('recent')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'recent'
                ? 'bg-[#1e88e5] text-white shadow-md'
                : 'text-[#0c4a8a] hover:bg-[#d0e9fc]'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setFilter('generous')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'generous'
                ? 'bg-[#1e88e5] text-white shadow-md'
                : 'text-[#0c4a8a] hover:bg-[#d0e9fc]'
            }`}
          >
            Most Generous
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
              className="bg-[#eef6fc] p-4 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-lg font-bold text-[#0c4a8a] flex-shrink-0">
                {donation.name ? donation.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="flex flex-col">
                <p className="text-[#0c4a8a] font-medium text-sm md:text-base">
                  {donation.name || 'Anonymous'} <span className="font-normal text-gray-600">donated</span> ₹ {donation.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
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
