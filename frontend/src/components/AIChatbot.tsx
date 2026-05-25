"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hare Krishna! 🙏 Welcome to Hare Krishna Dharma Trust support. How may we assist your seva journey today?',
      timestamp: new Date()
    }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickReplies = [
    { label: '🐄 Gau Seva', query: 'Tell me about Cow Protection and Gau Seva packages.' },
    { label: '🍛 Annadana Seva', query: 'How does the daily Hot Prasadam feeding work?' },
    { label: '📅 Ekadashi Fast', query: 'When is the next Ekadashi and how do I participate?' },
    { label: '📄 Get Brochure', query: 'How can I download the spiritual program brochures?' }
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Trigger smart response simulation (simulates the AI server model response)
    setTimeout(() => {
      let reply = "Thank you for reaching out! One of our temple administrators will assist you in detail shortly. Please use the 'Donate' button to browse our active Gau Seva and Annadana packages, or fill out the Inquiry Form to download our program brochure.";
      const query = textToSend.toLowerCase();

      if (query.includes('cow') || query.includes('gau') || query.includes('go')) {
        reply = "🐄 **Gau Seva (Cow Protection):** We currently house over 250 rescued cows. You can sponsor fodder for a day (₹1,100), full medical checkups (₹2,500), or adopt a cow (₹11,000/year). All sponsorships receive visual WhatsApp confirmations and tax receipts!";
      } else if (query.includes('annadana') || query.includes('feed') || query.includes('food') || query.includes('khichdi')) {
        reply = "🍛 **Daily Annadana Seva:** We cook hot organic khichdi prasadam daily for 500+ sadhus, children, and poor families. Sponsoring a festival feast is ₹5,100, and feeding 100 children is ₹2,100. Choose your category on our Donation Flow to contribute!";
      } else if (query.includes('ekadashi') || query.includes('calendar') || query.includes('date')) {
        reply = "📅 **Ekadashi Seva:** Ekadashi is the most auspicious day for spiritual fasting and charity. Sponsoring special Ekadashi dry-fruits and grain-free prasadam is ₹3,100. The next Ekadashi falls this coming week!";
      } else if (query.includes('brochure') || query.includes('download') || query.includes('program')) {
        reply = "📄 **Brochure Download:** You can explore our events, weddings, and Braj Yatra pilgrim schedules by filling out the Inquiry Form on our 'Events & Programs' section. You will instantly receive an automated email containing the PDF download links!";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Chat Bubble Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center bg-saffron hover:bg-saffron-dark text-white rounded-full w-14 h-14 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="Chat with AI"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Modern Glass Chat Box Overlay */}
      {isOpen && (
        <div className="bg-white border border-saffron/20 rounded-2xl w-80 sm:w-96 h-[480px] shadow-2xl flex flex-col overflow-hidden glass-card transition-all duration-300 transform scale-100 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-saffron-dark to-saffron text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Ashram AI Sevadar</h3>
                <span className="text-[10px] text-orange-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" /> Online Support
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-cream/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div className={`p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' ? 'bg-saffron text-white' : 'bg-charcoal-700 text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-saffron-dark text-white rounded-tr-none' 
                    : 'bg-white text-charcoal-900 border border-charcoal-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Chip Actions */}
          <div className="px-4 py-2 border-t border-saffron/10 bg-cream-50 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickReplies.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="bg-white border border-saffron/20 hover:bg-saffron/10 text-charcoal-800 text-[10px] font-medium px-2.5 py-1.5 rounded-full shadow-sm flex-shrink-0 transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <div className="p-3 border-t border-saffron/10 bg-white flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask anything about our sevas..."
              className="flex-1 bg-charcoal-50 text-xs border border-charcoal-100 rounded-full px-4 py-2.5 focus:border-saffron text-charcoal-900"
            />
            <button
              onClick={() => handleSend(input)}
              className="bg-saffron hover:bg-saffron-dark text-white p-2.5 rounded-full shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
