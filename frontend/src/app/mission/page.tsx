"use client";

import React from 'react';
import { Target, Heart, BookOpen, Sun, Sparkles } from 'lucide-react';
import Link from 'next/link';
import MissionBook from '@/components/MissionBook';

export default function OurMissionPage() {
  return (
    <div className="w-full bg-[#faf8f5]" style={{ backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgdmlld0JveD0nMCAwIDgwMCA0MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2NjYTc1Yicgc3Ryb2tlLXdpZHRoPScxLjUnIG9wYWNpdHk9JzAuMyc+CjxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE2MCwgNjApIHNjYWxlKDEuNSknPgo8cGF0aCBkPSdNMjAgNUMyMCA1IDEwIDE1IDIwIDM1QzMwIDE1IDIwIDUgMjAgNVonLz4KPHBhdGggZD0nTTIwIDM1QzEwIDMwIDUgMjAgMTAgMTJDMTUgMTIgMTggMjUgMjAgMzVaJy8+CjxwYXRoIGQ9J00yMCAzNUMzMCAzMCAzNSAyMCAzMCAxMkMyNSAxMiAyMiAyNSAyMCAzNVonLz4KPC9nPgo8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NjAsIDI2MCkgc2NhbGUoMS41KSc+CjxsaW5lIHgxPSc1JyB5MT0nMzUnIHgyPSczNScgeTI9JzUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPgo8Y2lyY2xlIGN4PScxMicgY3k9JzI4JyByPScxJyBmaWxsPScjY2NhNzViJyBzdHJva2U9J25vbmUnLz4KPGNpcmNsZSBjeD0nMTcnIGN5PScyMycgcj0nMScgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJy8+CjxjaXJjbGUgY3g9JzIyJyBjeT0nMTgnIHI9JzEnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMzUgNSBRIDQwIC01IDQ1IDUgUSA0MCAxNSAzNSA1JyBzdHJva2Utd2lkdGg9JzEnLz4KPGNpcmNsZSBjeD0nNDAnIGN5PSc1JyByPScxLjUnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMTAgMzAgUSAxNSAzNSAxMCA0MCBNIDE1IDI1IFEgMjAgMzUgMTUgNDAnIHN0cm9rZS13aWR0aD0nMScvPgo8L2c+CjwvZz4KPHRleHQgeD0nNDAwJyB5PScxODAnIGZvbnQtZmFtaWx5PSdHZW9yZ2lhLCBzZXJpZicgZm9udC1zaXplPScyMCcgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBvcGFjaXR5PScwLjMnIGxldHRlci1zcGFjaW5nPScyJyBmb250LXN0eWxlPSdpdGFsaWMnPkhhcmUgS3Jpc2huYSBIYXJlIEtyaXNobmEsIEtyaXNobmEgS3Jpc2huYSBIYXJlIEhhcmU8L3RleHQ+Cjx0ZXh0IHg9JzQwMCcgeT0nMjEwJyBmb250LWZhbWlseT0nR2VvcmdpYSwgc2VyaWYnIGZvbnQtc2l6ZT0nMjAnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScgdGV4dC1hbmNob3I9J21pZGRsZScgb3BhY2l0eT0nMC4zJyBsZXR0ZXItc3BhY2luZz0nMicgZm9udC1zdHlsZT0naXRhbGljJz5IYXJlIFJhbWEgSGFyZSBSYW1hLCBSYW1hIFJhbWEgSGFyZSBIYXJlPC90ZXh0Pgo8L3N2Zz4=\")", backgroundRepeat: 'repeat', backgroundSize: '800px 400px' }}>
      <section className="relative w-full z-10">
        <img 
          src="/ourmission.webp" 
          alt="Our Mission" 
          className="w-full h-auto max-h-[40vh] object-cover"
        />
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-28 relative z-10 overflow-hidden">
        {/* Subtle Background Effects for Main Content */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-orange-200/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[40rem] h-[40rem] bg-blue-200/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="prose prose-lg md:prose-xl prose-orange max-w-none text-gray-800">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#072149] mb-8 text-center">
              What is the mission of human life?
            </h2>

            <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://hkmdehradun.org/assets/images/s01-our-mission.jpg" 
                alt="Our Mission" 
                className="w-full h-auto object-cover max-h-[500px] hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <p className="mb-6 leading-relaxed font-body">
              The mission of human life is to end the miseries of material existence and attain a blissful life. We are constantly searching after happiness, but we often fail in our pursuit. We may get a glimpse of happiness, but it does not last forever. We do not want miseries, but we cannot avoid them.
            </p>
            
            <p className="mb-10 leading-relaxed font-body">
              Scriptures inform us that we are spiritual beings, part and parcel of the Supreme Lord Sri Krishna, and by nature we are full of happiness – <em>ānandamayo ‘bhyāsāt</em> (vedānta-sūtra). Then, why do we suffer? How do we rediscover the lost happiness and lead a blissful life?
            </p>

            <MissionBook />

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#072149] mb-6">
              How does this work?
            </h2>
            
            <p className="mb-6 leading-relaxed font-body">
              First, let us understand the root cause of our problems that makes our life miserable. We are entrapped in this material world from time immemorial and the happiness we pursue here is temporary and illusory. In the pursuit of such happiness, we engage in various activities, pious and sinful, that bind us more and more in this material world.
            </p>
            
            <p className="mb-8 leading-relaxed font-body">
              Our miseries are due to sinful reactions, and when we follow these three principles, all the material contaminations and sins are washed away; consequently, we are reestablished in our real constitutional position of unlimited bliss and happiness.
            </p>

            <blockquote className="border-l-4 border-orange-500 pl-4 md:pl-6 py-2 my-8 bg-orange-50/50 rounded-r-xl italic font-balaram">
              <p className="mb-2 md:mb-4 text-lg md:text-xl text-gray-800">
                <strong>Sri Chaitanya Mahaprabhu said:</strong> <em className="tracking-wide text-2xl font-balaram">ceto-darpaëa-märjanam bhava-mahä-dävägni-nirväpaëaà</em>
              </p>
              <p className="text-base md:text-lg text-gray-700 m-0">
                "Chanting the holy names of the Lord cleanses the mirror of the heart and stops the miseries of the blazing fire of material existence."
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-blue-500 pl-4 md:pl-6 py-2 my-8 bg-blue-50/50 rounded-r-xl italic font-balaram">
              <p className="mb-2 md:mb-4 text-lg md:text-xl text-gray-800">
                <strong>Srimad Bhagavatam says:</strong> <em className="tracking-wide text-2xl font-balaram">nañöa-präyeñv abhadreñu nityaà bhägavata-sevayä</em>
              </p>
              <p className="text-base md:text-lg text-gray-700 m-0">
                "All the inauspicious things in our heart are completely destroyed by reading Srimad Bhagavatam every day. The darkness of ignorance is dissipated and we become situated in the mode of goodness and develop all good qualities equivalent to that of the demigods."
              </p>
            </blockquote>

            <p className="mb-6 leading-relaxed font-body">
              By honoring prasadam (food offered to the Lord) we do not incur further sinful reactions. Krishna says in the Bhagavad-gita (3.13): <em>"The devotees of the Lord are released from all kinds of sins because they eat food which is offered first for sacrifice. Others, who prepare food for personal sense enjoyment, verily eat only sin."</em>
            </p>

            
          </div>
        </div>
      </section>
    </div>
  );
}
