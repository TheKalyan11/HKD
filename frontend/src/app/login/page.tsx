"use client";

import React, { useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { useRouter } from 'next/navigation';
import { Sparkles, Shield, User, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useCms();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter email and password.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      // Redirect back home with administration session initialized
      router.push('/');
    } else {
      setErrorMsg(result.error || 'Invalid administrative email address or password.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-36 pb-16">
      <div className="bg-white border border-saffron/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden glass-card">
        
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 bg-saffron/10 text-saffron-dark rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-charcoal-900">Ashram Portal Login</h2>
          <p className="text-xs text-charcoal-700">Enter Admin/Staff credentials to activate visual no-code page editor.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3.5 text-xs font-semibold mb-6">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-saffron" />
            <input
              type="email"
              required
              placeholder="Admin Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream-50 border border-charcoal-100 rounded-xl pl-11 pr-4 py-3 text-xs text-charcoal-900 focus:bg-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-saffron" />
            <input
              type="password"
              required
              placeholder="Security Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream-50 border border-charcoal-100 rounded-xl pl-11 pr-4 py-3 text-xs text-charcoal-900 focus:bg-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Sparkles className="w-4 h-4 fill-white" />
              )}
              <span>Authenticate & Sign In</span>
            </button>
          </div>
        </form>

        {/* Informative defaults helper */}
        <div className="mt-8 border-t border-saffron/10 pt-4 space-y-1.5 text-[10px] text-charcoal-700 leading-normal bg-cream-50 p-4 rounded-xl">
          <span className="font-bold text-charcoal-900 block">Default Dev Credentials:</span>
          <p>• **Admin:** `admin@hkd.org` / `Krishna108` (Full Control)</p>
          <p>• **Staff:** `staff@hkd.org` / `Staff108` (Page Edits Only)</p>
        </div>

      </div>
    </div>
  );
}
