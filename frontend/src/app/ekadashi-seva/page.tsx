"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Script from "next/script";
import axios from "axios";

export default function EkadashiSevaPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [claim80G, setClaim80G] = useState(false);
  const [receivePrasadam, setReceivePrasadam] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ── Interactive Background Grid ────────────────────────── */
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 50, stiffness: 400, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const maskImage = useMotionTemplate`radial-gradient(circle 350px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const predefinedAmounts = [
    { id: "gauPoshana", label: "Gau Poshana Seva", value: 501, img: "https://hkmdehradun.org/live-site/assets/12/gau-home.png" },
    { id: "cowMedicines", label: "Cow Medicines", value: 2501, img: "https://hkmdehradun.org/live-site/assets/12/gau-3.png" },
    { id: "annadaan", label: "Annadaan Seva", value: 551, img: "https://hkmdehradun.org/live-site/assets/12/annadanam.jpeg" },
    { id: "brahmanBhojan", label: "Brahman Bhojan", value: 1001, img: "https://hkmdehradun.org/live-site/assets/12/annadaan-1.png" },
    { id: "havan", label: "Nitya Narasimha Havan Seva", value: 1501, img: "https://hkmdehradun.org/live-site/assets/12/ekadashi-home.png" },
    { id: "aradhana", label: "Nitya Sri Vigraha Aradhana Seva", value: 2101, img: "https://hkmdehradun.org/live-site/assets/12/annadaan-2.png" },
  ];

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalAmount = predefinedAmounts.reduce((sum, item) => {
    return sum + (quantities[item.id] || 0) * item.value;
  }, 0) + (parseInt(customAmount) || 0);

  const getSelectedSevaLabel = () => {
    const sevas = predefinedAmounts
      .filter(item => (quantities[item.id] || 0) > 0)
      .map(item => `${item.label} x${quantities[item.id]}`);
    if (customAmount) sevas.push(`Custom (₹${customAmount})`);
    return sevas.length > 0 ? sevas.join(", ") : "None";
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalAmount = totalAmount;

    try {
      const orderRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`, {
        amount: finalAmount,
        currency: "INR",
        receipt: `receipt_ekadashi_${Date.now()}`
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag",
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "Hare Krishna Movement Dehradun",
        description: "Ekadashi Seva Donation",
        order_id: orderRes.data.id,
        handler: async function (response: any) {
          try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorData: {
                ...formData,
                amount: finalAmount,
                seva: getSelectedSevaLabel()
              }
            });
            alert("Payment Successful! Thank you for your Ekadashi Seva.");
            setFormData({ name: "", email: "", phone: "", pan: "" });
            setCustomAmount("");
          } catch (err) {
            console.error(err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0A0A0A",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-white relative z-0">
      
      {/* ── INTERACTIVE GRID BACKGROUND ────────────────────── */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#FAFAFA]">
        {/* Base faint grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0A0A0A 1px, transparent 1px),
              linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem'
          }}
        />
        {/* Hover revealing grid */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0A0A0A 1px, transparent 1px),
              linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage,
            WebkitMaskImage: maskImage
          }}
        />
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <section className="relative w-full pt-0 px-6 sm:px-10 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full overflow-hidden rounded-b-2xl md:rounded-2xl"
        >
          <img 
            src="https://hkmdehradun.org/live-site/assets/12/ekadashi-home.png" 
            alt="Ekadashi Seva Banner" 
            className="w-full h-auto max-h-[70vh] object-cover"
          />
        </motion.div>
      </section>

      {/* ── QUOTE SECTION ───────────────────────────────────── */}
      <section className="py-12 lg:py-20 px-6 sm:px-10 max-w-[1440px] mx-auto border-b border-gray-200">
        <div className="max-w-4xl">
          <p className="text-xl lg:text-3xl font-light leading-snug mb-8">
            "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे। देशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम्॥"<br/><br/>
            "कर्तव्यबुद्धि, प्रतिफल की आशा के बिना दिया गया दान सात्त्विक माना जाता है।"
          </p>
          <p className="text-sm uppercase tracking-widest font-semibold text-gray-400">
            — Bhagavad Gita 17.20
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT & DONATION ──────────────────────────── */}
      <section className="py-12 lg:py-20 px-6 sm:px-10 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Information */}
          <div className="lg:w-1/2 space-y-12">
            
            {/* Title & Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-8">
                <span className="relative inline-block pb-2">
                  Blessings Multiply on Ekadashi
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0A0A0A] origin-left rounded-full"
                  />
                </span>
              </h2>
              
              <p className="text-xl font-light mb-12 text-gray-600 leading-relaxed">
                Ekadashi donation is considered highly auspicious, a day of immense spiritual significance dedicated to devotion, fasting, and seva. At Hare Krishna Mandir, Bhadraj – ISKCON Dehradun, we observe each Ekadashi with heartfelt offerings, prayers, and sacred services.
              </p>

              <h3 className="text-xl font-medium text-[#0A0A0A] mb-4">
                <span className="relative inline-block pb-1">
                  1. Gau Poshana Seva – Care for the Cows
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A] origin-left rounded-full"
                  />
                </span>
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-10">
                Cows, revered by Lord Krishna and honored as Gaumata, hold a special place in Vedic culture. Through your spiritual contributions, you can support the upcoming Gaushala project in Rishikesh, which aims to provide a safe, clean, and caring environment for indigenous cows. Your support will help in developing proper shelters, arranging nutritious fodder, and ensuring medical care for the cows.
              </p>

              <h3 className="text-xl font-medium text-[#0A0A0A] mb-4">
                <span className="relative inline-block pb-1">
                  2. Khichdi Prasadam Seva – Share Krishna’s Mercy
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A] origin-left rounded-full"
                  />
                </span>
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-10">
                Support Khichdi Prasadam Seva at ISKCON Dehradun by helping distribute sanctified vegetarian meals to devotees, visitors, and the underprivileged. Your contribution allows us to serve thousands with warm, nutritious prasadam on this sacred day.
              </p>

              <h3 className="text-xl font-medium text-[#0A0A0A] mb-4">
                <span className="relative inline-block pb-1">
                  3. Nitya Bhog Seva – Daily Offerings
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A] origin-left rounded-full"
                  />
                </span>
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-10">
                By joining Nitya Bhog Seva, you help prepare and offer fresh bhoga daily to Sri Sri Nitai Gauranga. This seva brings divine blessings and ensures the continuity of daily worship.
              </p>

              <h3 className="text-xl font-medium text-[#0A0A0A] mb-4">
                <span className="relative inline-block pb-1">
                  Why Donate on Ekadashi?
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A] origin-left rounded-full"
                  />
                </span>
              </h3>
              <div className="space-y-4 mb-10">
                <blockquote className="border-l-4 border-[#1A82D6] pl-5 py-2 italic text-gray-600 font-light bg-gray-50 rounded-r-lg leading-relaxed">
                  Scriptures declare that donations on Ekadashi bring eternal blessings and spiritual merit. By supporting Ekadashi Annadana Seva and contributing to ISKCON temple donations, you not only serve the deities but also uplift your soul through devotion and compassion.
                </blockquote>
              </div>
            </div>

          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:w-1/2 relative">
            <div className="bg-[#2A91D9] rounded-2xl p-4 sm:p-6 sticky top-32 shadow-md border border-white/20">
              
              <div className="bg-[#1A77BB] rounded-xl py-3 px-4 mb-4 text-center shadow-inner">
                <h2 className="text-white font-bold sm:text-lg tracking-wide drop-shadow-sm">
                  Blessings Multiply on Ekadashi – Contribute to Sacred Sevas
                </h2>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-white font-black text-xl sm:text-2xl drop-shadow-sm">
                  Total Donation Amount: ₹ {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              
              <form onSubmit={handlePayment} className="space-y-4">
                
                {/* Seva Cards */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {predefinedAmounts.map((opt) => (
                    <div key={opt.id} className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-100">
                          <img src={opt.img} alt={opt.label} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm pt-4 pb-1 px-1 text-center">
                            <span className="text-[9px] text-white font-medium leading-none block line-clamp-2">{opt.label}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-[#0A0A0A] font-bold text-sm sm:text-base leading-tight mb-1">{opt.label}</h3>
                          <p className="text-gray-500 font-medium text-sm">₹ {opt.value}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(opt.id, -1)}
                          className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold transition-colors"
                        >
                          -
                        </button>
                        <div className="w-8 text-center font-bold border border-gray-300 rounded-md py-1">
                          {quantities[opt.id] || 0}
                        </div>
                        <button
                          type="button"
                          onClick={() => updateQuantity(opt.id, 1)}
                          className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="bg-white rounded-xl p-3 shadow-sm mt-4">
                  <input
                    type="number"
                    placeholder="Enter Choice Amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A91D9]"
                  />
                </div>

                {/* Donor Details */}
                <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">Donor Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2A91D9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">Mobile*</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2A91D9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">Email*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2A91D9]"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={claim80G}
                        onChange={(e) => setClaim80G(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#2A91D9] focus:ring-[#2A91D9]"
                      />
                      <span className="text-[#0A0A0A] text-sm group-hover:text-black transition-colors font-medium">I wish to receive 80G certificate</span>
                    </label>
                    
                    {claim80G && (
                      <div className="mt-3">
                        <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">PAN Card Number*</label>
                        <input
                          type="text"
                          required
                          value={formData.pan}
                          onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2A91D9] uppercase"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="font-bold text-[#0A0A0A] text-sm mb-2">Receive Prasadam?</p>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="prasadam"
                          checked={receivePrasadam}
                          onChange={() => setReceivePrasadam(true)}
                          className="w-4 h-4 text-[#2A91D9] focus:ring-[#2A91D9]"
                        />
                        <span className="text-sm font-medium">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="prasadam"
                          checked={!receivePrasadam}
                          onChange={() => setReceivePrasadam(false)}
                          className="w-4 h-4 text-[#2A91D9] focus:ring-[#2A91D9]"
                        />
                        <span className="text-sm font-medium">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || totalAmount === 0}
                  className="w-full py-4 mt-4 rounded-full bg-[#EAEAEA] text-[#2A91D9] font-bold text-lg hover:bg-white hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center uppercase"
                >
                  {loading ? (
                    <span className="w-6 h-6 border-2 border-[#2A91D9]/30 border-t-[#2A91D9] rounded-full animate-spin"></span>
                  ) : (
                    `DONATE ₹ ${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
