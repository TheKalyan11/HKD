"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Script from "next/script";
import axios from "axios";

export default function GauSevaPage() {
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [isMonthly, setIsMonthly] = useState(false);
  const [donationPeriod, setDonationPeriod] = useState("12 Months");
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
    { label: "Feed 4 Cows", value: 500 },
    { label: "Medicines", value: 1000 },
    { label: "Feed 2 Cows", value: 1500 },
    { label: "Feed 3 Cows", value: 2000 },
    { label: "Feed a Cow", value: 2500 },
  ];

  const getSelectedSevaLabel = () => {
    if (customAmount || amount === 0) return "Other";
    const found = predefinedAmounts.find(a => a.value === amount);
    return found ? found.label : "Select a Seva";
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalAmount = customAmount ? parseInt(customAmount) : amount;

    try {
      const orderRes = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: finalAmount,
        currency: "INR",
        receipt: `receipt_gau_${Date.now()}`
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag",
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "Hare Krishna Movement Dehradun",
        description: "Gau Seva Donation",
        order_id: orderRes.data.id,
        handler: async function (response: any) {
          try {
            await axios.post("http://localhost:5000/api/payments/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorData: {
                ...formData,
                amount: finalAmount,
                seva: getSelectedSevaLabel()
              }
            });
            alert("Payment Successful! Thank you for your Gau Seva.");
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
            src="https://hkmdehradun.org/live-site/assets/12/gau-home.png" 
            alt="Gau Seva Banner" 
            className="w-full h-auto max-h-[70vh] object-cover"
          />
        </motion.div>
      </section>

      {/* ── QUOTE SECTION ───────────────────────────────────── */}
      <section className="py-12 lg:py-20 px-6 sm:px-10 max-w-[1440px] mx-auto border-b border-gray-200">
        <div className="max-w-4xl">
          <p className="text-2xl lg:text-4xl font-light leading-snug mb-8">
            "Whoever feeds the cow with grass and water every day derives the benefit equivalent to performing Ashwamedha Yajna. There is no doubt about this."
          </p>
          <p className="text-sm uppercase tracking-widest font-semibold text-gray-400">
            — Brhat Parasara Smriti 5.26–27
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT & DONATION ──────────────────────────── */}
      <section className="py-12 lg:py-20 px-6 sm:px-10 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Information */}
          <div className="lg:w-1/2 space-y-12">
            
            {/* Facilities */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-8">
                <span className="relative inline-block pb-2">
                  Gaushala Facilities
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0A0A0A] origin-left rounded-full"
                  />
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
                <div>
                  <h3 className="text-lg font-medium mb-3">Care & Medical</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Daily cow care, medical care, once a month routine check-up, emergency care.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">Nutritious Food</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Green grass, dry grass, jaggery, grains, chana churi, mung daal churi, toor daal churi, urad daal churi, and more.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">Additional Nutrition</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Herbs such as satavari, amla, harde, giloy, ashwagandha, brahmi, and tulsi leaves.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">Equipment</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Grass shredding machines, clean hygienic sheds, 24 hours clean water, and large grazing fields.
                  </p>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-8">
                <span className="relative inline-block pb-2">
                  Sponsorship Details
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0A0A0A] origin-left rounded-full"
                  />
                </span>
              </h2>
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-medium text-gray-400 mb-6">Food Items (per kg)</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Green fodder: ₹5", "Mung daal: ₹25", "Wheat: ₹20", "Barley: ₹23", 
                      "Taramira: ₹50", "Groundnut cake: ₹60", "Jaggery: ₹40", 
                      "Dry fodder: ₹10", "Toor daal: ₹25", "Rice: ₹20", 
                      "Cottonseeds: ₹45", "Ajwain: ₹100", "Sesame cake: ₹40", 
                      "Sprout chana: ₹100", "Chana churi: ₹25", "Urad daal: ₹25", 
                      "Corn: ₹22", "Haldi: ₹125", "Coconut cake: ₹60", "Mustard cake: ₹30"
                    ].map((item, idx) => (
                      <span key={idx} className="px-4 py-2 bg-gray-50 rounded-md text-sm font-light">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-[#0A0A0A] mb-6">
                    <span className="relative inline-block pb-1">
                      Medical Care
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A] origin-left rounded-full"
                      />
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "First Aid Kit", cost: "₹300 / cow" },
                      { title: "OPD Kit", cost: "₹1,500 / cow" },
                      { title: "Yearly Treatment", cost: "₹1,80,000" },
                      { title: "Surgical Cost", cost: "₹3,000 / cow" },
                      { title: "Routine Check-up", cost: "₹1,500 / visit" },
                      { title: "Gynaecological Kit", cost: "₹2,000 / cow" },
                      { title: "Monthly Treatment", cost: "₹15,000" },
                    ].map((med, idx) => (
                      <div key={idx} className="border-b border-gray-200 py-3 flex justify-between items-center">
                        <span className="font-light text-gray-600">{med.title}</span>
                        <span className="font-medium">{med.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:w-1/2 relative">
            <div className="bg-[#E2F1F8] rounded-2xl p-6 sm:p-8 sticky top-32 shadow-sm border border-white/50">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5A9CEC] text-center mb-6 drop-shadow-sm">
                Contribute To Nurture Cows
              </h2>
              
              <form onSubmit={handlePayment} className="space-y-6">
                
                {/* One Time / Monthly Toggle */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-full p-1 inline-flex shadow-sm">
                    <button
                      type="button"
                      onClick={() => setIsMonthly(false)}
                      className={`px-8 py-2 rounded-full font-bold text-sm transition-colors ${
                        !isMonthly ? "bg-[#1A82D6] text-white" : "text-black bg-transparent hover:bg-gray-50"
                      }`}
                    >
                      One Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMonthly(true)}
                      className={`px-8 py-2 rounded-full font-bold text-sm transition-colors ${
                        isMonthly ? "bg-[#1A82D6] text-white" : "text-black bg-transparent hover:bg-gray-50"
                      }`}
                    >
                      Monthly Donation
                    </button>
                  </div>
                </div>

                {/* PAN Banner */}
                <div className="bg-[#1A82D6] text-white text-center py-3 px-4 rounded-md font-bold text-sm sm:text-base shadow-sm">
                  Hare Krishna Mandir Dehradun Pan No: AAAAH0992Q
                </div>
                
                {/* Amount Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-2">
                  {predefinedAmounts.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setAmount(opt.value); setCustomAmount(""); }}
                      className={`py-2 sm:py-2.5 px-2 rounded-[0.85rem] text-center transition-all border-2 ${
                        amount === opt.value && !customAmount
                          ? "border-black bg-[#EAF4FB] shadow-md"
                          : "border-transparent bg-white shadow-sm hover:border-gray-200"
                      }`}
                    >
                      <div className="text-[#1A82D6] font-bold text-[13px] sm:text-sm leading-tight mb-0.5">{opt.label}</div>
                      <div className="text-[#1A82D6] font-black text-base">₹ {opt.value}</div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => { setAmount(0); setCustomAmount(""); }}
                    className={`py-2 sm:py-2.5 px-2 rounded-[0.85rem] text-center transition-all border-2 flex items-center justify-center ${
                      customAmount || amount === 0
                        ? "border-black bg-[#EAF4FB] shadow-md"
                        : "border-transparent bg-white shadow-sm hover:border-gray-200"
                    }`}
                  >
                    <div className="text-[#1A82D6] font-bold text-base">Other</div>
                  </button>
                </div>

                {/* Seva Dynamic Text */}
                <div className="text-gray-700 text-sm">
                  Seva: {getSelectedSevaLabel()}
                </div>
                
                {isMonthly && (
                  <div className="space-y-1">
                    <label className="text-gray-700 text-sm">Donation Period</label>
                    <select 
                      value={donationPeriod}
                      onChange={(e) => setDonationPeriod(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A82D6]/20"
                    >
                      <option>12 Months</option>
                      <option>24 Months</option>
                      <option>36 Months</option>
                    </select>
                  </div>
                )}

                {customAmount !== "" || amount === 0 ? (
                  <input
                    type="number"
                    placeholder="Enter Custom Amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A82D6]/20"
                  />
                ) : null}

                {/* User Details */}
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A82D6]/20"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="+91 Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A82D6]/20"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A82D6]/20"
                  />
                  {claim80G && (
                    <input
                      type="text"
                      required
                      placeholder="PAN Card Number"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A82D6]/20 uppercase"
                    />
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 mt-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={claim80G}
                      onChange={(e) => setClaim80G(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[#1A82D6] focus:ring-[#1A82D6]"
                    />
                    <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">Claim 80G Certificate</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={receivePrasadam}
                      onChange={(e) => setReceivePrasadam(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[#1A82D6] focus:ring-[#1A82D6]"
                    />
                    <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">Receive Prasadam (only in India)</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || (!amount && !customAmount)}
                  className="w-full py-4 mt-4 rounded-full border-[3px] border-[#1A82D6] bg-[#F5F5F5] text-[#1A82D6] font-bold text-lg hover:bg-white hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center uppercase"
                >
                  {loading ? (
                    <span className="w-6 h-6 border-2 border-[#1A82D6]/30 border-t-[#1A82D6] rounded-full animate-spin"></span>
                  ) : (
                    `Donate ₹ ${(customAmount ? parseInt(customAmount) : amount).toLocaleString()}`
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ── IMAGE GALLERY ───────────────────────────────────── */}
      <section className="py-10 pb-32 px-6 sm:px-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl aspect-[4/3]"
          >
            <img src="https://hkmdehradun.org/live-site/assets/12/gau-1.png" alt="Gau Seva" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-2xl aspect-[4/3]"
          >
            <img src="https://hkmdehradun.org/live-site/assets/12/gau-2.png" alt="Gau Seva" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-2xl aspect-[4/3]"
          >
            <img src="https://hkmdehradun.org/live-site/assets/12/gau-3.png" alt="Gau Seva" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
