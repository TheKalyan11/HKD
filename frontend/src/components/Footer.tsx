import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 text-charcoal-100 border-t border-saffron/20 pt-16 pb-24 relative overflow-hidden">
      
      {/* Decorative background lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-saffron/5 rounded-full filter blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-saffron p-2 rounded-xl text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-wider text-white">
                HKD TRUST
              </span>
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Serving the holy land of Vraja, establishing exemplary standards for animal welfare (Gau Seva), hot prasadam distribution, and spiritual development.
            </p>
            <div className="bg-saffron/10 border border-saffron/20 p-3.5 rounded-xl">
              <span className="block text-[10px] text-saffron uppercase font-bold tracking-widest mb-1">
                Vedic Verse
              </span>
              <p className="text-[11px] font-medium text-cream italic leading-normal">
                &ldquo;gāvo bandhūr manuṣyāṇām, gāvaḥ kṣema-karāḥ sadā&rdquo; <br />
                (Cows are relatives of humans, cows bring supreme auspiciousness always.)
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 border-l-2 border-saffron pl-2">
              Quick Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-saffron transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-saffron transition-colors">Seva & Donations</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-saffron transition-colors">Events & Programs</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-saffron transition-colors">Blogs & Articles</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-saffron transition-colors">Media Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 border-l-2 border-saffron pl-2">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-xs text-charcoal-700">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                <span>Sector 5, Sri Radha Krishna Dham, Chaitanya Marg, Vrindavan, Mathura, UP, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-saffron" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-saffron" />
                <span>seva@hkdtrust.org</span>
              </li>
            </ul>
          </div>

          {/* Tax info */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 border-l-2 border-saffron pl-2">
              Tax Exemption
            </h4>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Donations to Hare Krishna Dharma Trust are eligible for tax deductions under **Section 80G** of the Income Tax Act. Receipts are generated automatically.
            </p>
            <div className="border border-charcoal-700 rounded-xl p-3 text-[11px] text-charcoal-100 flex items-center justify-between">
              <span>80G REG NO:</span>
              <span className="font-mono font-bold text-saffron">AATH1088GDF2</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-charcoal-700 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-charcoal-700 gap-4">
          <p>© {new Date().getFullYear()} Hare Krishna Dharma Trust. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-saffron">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-saffron">Terms of Seva</Link>
            <Link href="/login" className="text-saffron hover:underline">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
