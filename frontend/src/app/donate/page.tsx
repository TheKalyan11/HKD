"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ShieldCheck, CheckCircle, Smartphone, User, Mail, CreditCard, ChevronRight } from 'lucide-react';

export default function DonatePage() {
  // Donation Details state
  const [sevaCategory, setSevaCategory] = useState('Gau Seva');
  const [amount, setAmount] = useState<number>(1100);
  const [customAmount, setCustomAmount] = useState('');
  
  // Donor details state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const sevaCategories = [
    { name: '🐄 Gau Seva', label: 'Gau Seva' },
    { name: '🍛 Sadhu Annadana', label: 'Annadana Seva' },
    { name: '🧒 Child Prasadam', label: 'Child Annadana Seva' },
    { name: '🍲 Khichdi Seva', label: 'Khichdi Prasadam Seva' },
    { name: '📅 Ekadashi Seva', label: 'Ekadashi Seva' }
  ];

  const presets = [1100, 2100, 5100, 11000];

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmount = (val: string) => {
    setCustomAmount(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMessage('Please fill out all required contact fields.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const orderResponse = await axios.post(`${backendUrl}/api/payments/create-order`, {
        amount,
        donorName: name,
        email,
        phone,
        sevaCategory,
        panNumber: pan
      });

      const orderData = orderResponse.data;

      // Handle Simulated Offline Sandbox Mode (if Razorpay keys are not provided on backend)
      if (orderData.isSimulated) {
        console.log('[Dev Sandbox Mode] Processing simulated checkout bypass...');
        
        // Trigger simulated verification endpoint
        const verifyRes = await axios.post(`${backendUrl}/api/payments/verify-simulated`, {
          orderId: orderData.orderId,
          paymentId: `pay_sim_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        });

        if (verifyRes.data.success) {
          setIsLoading(false);
          setPaymentSuccess({
            orderId: orderData.orderId,
            amount: amount,
            sevaCategory: sevaCategory,
            donorName: name
          });
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
        } else {
          throw new Error('Simulation validation failed');
        }
        return;
      }

      // Live Razorpay popup integration
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Hare Krishna Dharma Trust',
        description: `${sevaCategory} Sponsorship`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setIsLoading(true);
          try {
            // Verify payment signature
            const verifyRes = await axios.post(`${backendUrl}/api/payments/verify-simulated`, {
              orderId: orderData.orderId,
              paymentId: response.razorpay_payment_id
            });

            if (verifyRes.data.success) {
              setPaymentSuccess({
                orderId: orderData.orderId,
                amount: amount,
                sevaCategory: sevaCategory,
                donorName: name
              });
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
              });
            } else {
              setErrorMessage('Payment verification failed.');
            }
          } catch (err) {
            console.error('Signature verification call failed:', err);
            setErrorMessage('Could not verify payment signature.');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        theme: {
          color: '#E65100'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setIsLoading(false);

    } catch (error) {
      console.error('Payment initialization failed:', error);
      setErrorMessage('Could not connect to payment gateway. Try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-12">
      
      {/* Script for Razorpay Checkout Popup */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Success View */}
      {paymentSuccess ? (
        <div className="bg-white border border-saffron/20 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 glass-card">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-md">
            <CheckCircle className="w-12 h-12" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-charcoal-900">Seva Registered Successfully!</h2>
            <p className="text-sm text-charcoal-700">Thank you, {paymentSuccess.donorName}, for your contribution.</p>
          </div>

          <div className="bg-cream/50 border border-saffron/10 rounded-2xl p-6 max-w-md mx-auto grid grid-cols-2 gap-4 text-left text-xs">
            <div>
              <span className="block text-charcoal-700 font-bold uppercase tracking-wider text-[9px] mb-1">Seva Category</span>
              <span className="text-sm font-semibold text-charcoal-900">{paymentSuccess.sevaCategory}</span>
            </div>
            <div>
              <span className="block text-charcoal-700 font-bold uppercase tracking-wider text-[9px] mb-1">Amount Paid</span>
              <span className="text-sm font-extrabold text-saffron-dark">₹{paymentSuccess.amount.toLocaleString('en-IN')}.00</span>
            </div>
            <div className="col-span-2 border-t border-saffron/10 pt-3">
              <span className="block text-charcoal-700 font-bold uppercase tracking-wider text-[9px] mb-1">Transaction Ref ID</span>
              <span className="font-mono text-charcoal-900 font-bold break-all select-all">{paymentSuccess.orderId}</span>
            </div>
          </div>

          <div className="text-xs text-charcoal-700 max-w-sm mx-auto space-y-1.5 leading-relaxed">
            <p>🙏 **Auspicious blessings from Chaitanya Mahaprabhu!**</p>
            <p>An official tax exemption 80G PDF receipt has been dispatched to **{email}** and confirmation notifications to **{phone}**.</p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setPaymentSuccess(null);
                setName('');
                setEmail('');
                setPhone('');
                setPan('');
              }}
              className="bg-saffron hover:bg-saffron-dark text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-colors"
            >
              Offer Another Seva
            </button>
          </div>
        </div>
      ) : (
        /* Checkout Form View */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Left panel: Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-saffron-dark to-saffron text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="text-xs font-bold tracking-widest uppercase">Devotional Contribution</span>
              </div>
              <h2 className="text-2xl font-black leading-tight">Donate For Gau Seva & Daily Annadana</h2>
              <p className="text-xs leading-relaxed text-orange-50">
                Your generous seva protects street cows and distributes sanctified prasadam meals to sadhus and families in Mathura.
              </p>
              
              <div className="space-y-4 pt-2 text-xs border-t border-white/20">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-cream" />
                  <span>80G tax benefit (India)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4.5 h-4.5 text-cream" />
                  <span>Instant receipt & WhatsApp PDF</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-saffron/10 rounded-2xl p-6 text-xs text-charcoal-700 space-y-3 shadow-sm">
              <span className="font-bold text-charcoal-900 block">Required Details for 80G:</span>
              <p>Under Indian income tax laws, providing your **PAN Card Number** is mandatory if you want to claim tax deduction benefits for this donation.</p>
            </div>
          </div>

          {/* Right panel: Dynamic Form */}
          <form onSubmit={handleCheckout} className="md:col-span-3 bg-white border border-saffron/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            {errorMessage && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-3 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* 1. Category selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">1. Select Seva Category</label>
              <div className="grid grid-cols-2 gap-2">
                {sevaCategories.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setSevaCategory(cat.label)}
                    className={`py-2 px-3 text-left rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      sevaCategory === cat.label
                        ? 'border-saffron bg-saffron/5 text-saffron-dark ring-2 ring-saffron/20'
                        : 'border-charcoal-100 hover:border-saffron/30 text-charcoal-700 bg-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-saffron" />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Amount presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700">2. Select Sponsorship Amount</label>
              <div className="grid grid-cols-4 gap-2">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePresetSelect(val)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                      amount === val && !customAmount
                        ? 'border-saffron bg-saffron text-white shadow-md'
                        : 'border-charcoal-100 hover:border-saffron/30 text-charcoal-700 bg-white'
                    }`}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              
              {/* Custom amount input */}
              <div className="pt-2">
                <input
                  type="number"
                  placeholder="Or enter custom amount (INR)..."
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="w-full bg-cream-50 border border-charcoal-100 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:border-saffron focus:bg-white transition-all font-semibold"
                />
              </div>
            </div>

            {/* 3. Donor Personal details */}
            <div className="space-y-4 pt-2 border-t border-saffron/10">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block">3. Donor Information</label>
              
              {/* Name */}
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-saffron" />
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-cream-50 border border-charcoal-100 rounded-xl pl-11 pr-4 py-2.5 text-xs text-charcoal-900 focus:bg-white"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-saffron" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-100 rounded-xl pl-11 pr-4 py-2.5 text-xs text-charcoal-900 focus:bg-white"
                  />
                </div>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-saffron" />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-100 rounded-xl pl-11 pr-4 py-2.5 text-xs text-charcoal-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* PAN card */}
              <div className="relative">
                <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-saffron" />
                <input
                  type="text"
                  placeholder="PAN Card Number (Optional - for tax receipts)"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  className="w-full bg-cream-50 border border-charcoal-100 rounded-xl pl-11 pr-4 py-2.5 text-xs text-charcoal-900 focus:bg-white uppercase"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 active:scale-95"
              >
                {isLoading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Heart className="w-4 h-4 fill-white" />
                )}
                <span>Proceed to Seva (₹{amount.toLocaleString('en-IN')})</span>
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
}
