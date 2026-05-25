"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Compass, FileText, Send, X, Check, ArrowRight } from 'lucide-react';

export default function EventsPage() {
  const [activeEvent, setActiveEvent] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [selectedPkg, setSelectedPkg] = useState('Standard');
  
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const events = [
    {
      id: 'braj-yatra',
      title: '🐄 Sacred Braj Yatra Pilgrim',
      date: 'Oct 15 - Oct 22, 2026',
      venue: 'Mathura, Govardhan & Vrindavan Dham',
      desc: 'Embark on a guided spiritual yatra exploring the pasturing forests of Lord Krishna, bathing in sacred lakes, and hearing pastimes from resident saints.',
      cover: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600',
      packages: ['Standard (Food + Stay)', 'Premium AC Cottage', 'VIP Acharya Tour']
    },
    {
      id: 'temple-weddings',
      title: '💒 Traditional Vedic Ashram Weddings',
      date: 'Custom Schedules Available',
      venue: 'Sri Radha Krishna Dham Temple Hall',
      desc: 'Conduct your marriage ceremony in a highly holy environment blessed by Vedic fire yajnas, sweet kirtan, and cows seva.',
      cover: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
      packages: ['Vedic Agni Ritual', 'Full Hall + Satsang Prasadam', 'Vrindavan Complete Wedding']
    },
    {
      id: 'corporate-retreats',
      title: '🧘 Mindful Corporate Yoga Retreats',
      date: 'First Weekend of Every Month',
      venue: 'Radha Kund Lake View Sanctuary',
      desc: 'De-stress your workspace teams with divine yoga, mindfulness lectures, fresh organic Vedic foods, and voluntary Gau Seva cow feed tasks.',
      cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600',
      packages: ['Day Workshop', '2-Day Ashram Retreat', '3-Day Complete Nirvana']
    }
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg('Please fill out name, email, and phone.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name,
        email,
        phone,
        interestType: 'event_registration',
        targetId: activeEvent.title,
        message: msg,
        selectedPackage: selectedPkg
      });

      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setActiveEvent(null);
        setName('');
        setEmail('');
        setPhone('');
        setMsg('');
      }, 3000);
    } catch (err) {
      console.error('Lead inquiry submission failed:', err);
      setErrorMsg('Failed to record inquiry. Try again.');
      setIsLoading(false);
    }
  };

  const handleDownloadBrochure = (eventName: string) => {
    // Generate simulated download
    const element = document.createElement("a");
    const file = new Blob([`Official Brochure & Guidelines for ${eventName} at Hare Krishna Dharma Trust.`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `HKD_Trust_${eventName.replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-saffron-dark">Ashram Calendar</span>
        <h1 className="text-4xl font-extrabold text-charcoal-900">Events & Spiritual Programs</h1>
        <p className="text-xs sm:text-sm text-charcoal-700">
          Participate in yatras, holy weddings, or retreats. Register your interest to instantly receive email itineraries and downloadable brochures.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <div 
            key={event.id}
            className="bg-white border border-saffron/10 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between"
          >
            <div>
              <img src={event.cover} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-charcoal-900 leading-tight">{event.title}</h3>
                
                <div className="space-y-2 text-xs text-charcoal-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-saffron" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed">{event.desc}</p>
              </div>
            </div>

            <div className="p-6 border-t border-saffron/10 flex items-center justify-between gap-4">
              <button
                onClick={() => handleDownloadBrochure(event.title)}
                className="flex items-center gap-1 hover:text-saffron-dark text-saffron text-xs font-bold transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Brochure</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveEvent(event);
                  setSelectedPkg(event.packages[0]);
                }}
                className="bg-charcoal-800 hover:bg-saffron text-white px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1"
              >
                <span>Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Inquiry Lead Registration Modal */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-saffron/20 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden glass-card">
            
            <button
              onClick={() => setActiveEvent(null)}
              className="absolute top-4 right-4 text-charcoal-700 hover:text-saffron p-1.5 rounded-full hover:bg-cream-dark"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-charcoal-900">Inquiry Captured!</h3>
                <p className="text-xs text-charcoal-700">An email brochure packet has been sent to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-dark">Registration Lead</span>
                  <h3 className="text-lg font-bold text-charcoal-900">{activeEvent.title}</h3>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-red-600 rounded-lg p-2.5 text-xs font-medium border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* Package Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-700">Select Package Option</label>
                  <select
                    value={selectedPkg}
                    onChange={(e) => setSelectedPkg(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-100 rounded-xl px-3 py-2 text-xs text-charcoal-900"
                  >
                    {activeEvent.packages.map((pkg: string) => (
                      <option key={pkg} value={pkg}>{pkg}</option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-100 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:bg-white"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-100 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:bg-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-100 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:bg-white"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <textarea
                    placeholder="Tell us about special requests (dates, number of guests)..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-100 rounded-xl px-4 py-2 text-xs text-charcoal-900 focus:bg-white"
                    rows={3}
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-saffron hover:bg-saffron-dark text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    {isLoading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Submit Inquiry & Download</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
