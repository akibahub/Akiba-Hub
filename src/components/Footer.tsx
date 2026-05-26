import React from 'react';
import { Logo } from './Logo';
import { useShop } from '../context/ShopContext';
import { MapPin, Mail, Phone, Flame, Trophy, Shield, HelpCircle } from 'lucide-react';

export function Footer({ className = '' }: { className?: string }) {
  const { setCategoryAndGroup, setView } = useShop();

  const handleCategorySelect = (category: string) => {
    setCategoryAndGroup(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: 'landing' | 'shop', sectionId?: string) => {
    setView(view);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`bg-[#070707] border-t border-[#e60012]/40 text-gray-400 text-sm font-sans ${className}`}>
      
      {/* Upper features container */}
      <div className="border-b border-white/5 bg-[#121215] p-6 md:p-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-[#18181c] p-4 rounded-xl border border-white/10 hover:border-[#e60012] transition-all">
            <div className="p-3 bg-[#e60012]/10 rounded-full text-[#e60012]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold font-mono tracking-wider uppercase">100% AUTHENTIC GUARANTEED</h4>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium leading-relaxed">Every pack, booster box, and action figure is imported from official Tokyo publishers directly.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#18181c] p-4 rounded-xl border border-white/10 hover:border-white transition-all">
            <div className="p-3 bg-white/10 rounded-full text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold font-mono tracking-wider uppercase">COLLECTOR GRADE PACKAGING</h4>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium leading-relaxed">We double-wrap and box all card packs and figures with ultimate caution to guarantee mint arrivals.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#18181c] p-4 rounded-xl border border-white/10 hover:border-[#e60012] transition-all">
            <div className="p-3 bg-[#e60012]/10 rounded-full text-[#e60012]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold font-mono tracking-wider uppercase">WORLDWIDE EXPEDITED SHIPPING</h4>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium leading-relaxed">Full international tracking on all orders with live status emails and PayPal Buyer Protection.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About column */}
         <div className="space-y-4">
          <Logo />
          <p className="text-xs text-gray-400 mt-2 leading-relaxed font-semibold">
            Based in Sotokanda, Tokyo, Akiba Hub is your premier direct pipeline to pristine Japanese and English trading card game packs and high-quality anime collectibles. We source directly so you can pull your absolute holy grail.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#e60012] pt-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#e60012] animate-pulse shadow-[0_0_8px_#e60012]"></span>
            <span className="font-mono text-[10px]">LONDON & TOKYO PIPELINE LIVE</span>
          </div>
        </div>

        {/* Categories helper column */}
        <div>
          <h3 className="text-white font-display font-medium text-xs uppercase tracking-widest border-l-2 border-[#e60012] pl-2 mb-4">
            Collections
          </h3>
          <ul className="space-y-2 text-xs font-semibold text-gray-400 font-mono">
            <li>
              <button onClick={() => handleCategorySelect('pokemon-english')} className="hover:text-white hover:underline text-left cursor-pointer transition-colors">
                Pokémon Packs (English)
              </button>
            </li>
            <li>
              <button onClick={() => handleCategorySelect('pokemon-japanese')} className="hover:text-white hover:underline text-left cursor-pointer transition-colors">
                Pokémon Packs (Japanese)
              </button>
            </li>
            <li>
              <button onClick={() => handleCategorySelect('onepiece-english')} className="hover:text-white hover:underline text-left cursor-pointer transition-colors">
                One Piece English TCG
              </button>
            </li>
            <li>
              <button onClick={() => handleCategorySelect('onepiece-japanese')} className="hover:text-white hover:underline text-left cursor-pointer transition-colors">
                One Piece Japanese TCG
              </button>
            </li>
            <li>
              <button onClick={() => handleCategorySelect('action-fig')} className="hover:text-white hover:underline text-left cursor-pointer transition-colors">
                Anime Figures (Scale PVCs)
              </button>
            </li>
          </ul>
        </div>

        {/* Support links column */}
        <div>
          <h3 className="text-white font-display font-medium text-xs uppercase tracking-widest border-l-2 border-white pl-2 mb-4">
            Customer Care
          </h3>
          <ul className="space-y-2 text-xs font-semibold text-gray-400 font-mono">
            <li>
              <button onClick={() => handleNavClick('landing')} className="hover:text-[#e60012] hover:underline text-left cursor-pointer transition-colors">
                Home Matrix
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('landing', 'about-section')} className="hover:text-[#e60012] hover:underline text-left cursor-pointer transition-colors">
                Our Akiba Mission
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('landing', 'contact-section')} className="hover:text-[#e60012] hover:underline text-left cursor-pointer transition-colors">
                Support Terminal
              </button>
            </li>
            <li>
              <span className="text-white flex items-center gap-1 font-semibold border-t border-white/5 pt-2 mt-2">
                <HelpCircle className="w-3.5 h-3.5" />
                PayPal Sandbox Secured
              </span>
            </li>
          </ul>
        </div>

        {/* Contact information column */}
        <div>
          <h3 className="text-white font-display font-medium text-xs uppercase tracking-widest border-l-2 border-[#e60012] pl-2 mb-4">
            Akibahub headquarters
          </h3>
          <ul className="space-y-3 text-xs font-semibold text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#e60012] flex-shrink-0 mt-0.5" />
              <span className="font-mono text-xs text-gray-400">
                Suite RA01 195-197 Wood Street<br />London, E17 3NU
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white flex-shrink-0" />
              <span className="hover:text-[#e60012] transition-colors font-mono">info@akibahub.co.uk</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#e60012] flex-shrink-0" />
              <span className="font-mono">+44 7440074149</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal copy block */}
      <div className="bg-[#050505] border-t border-white/5 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
          <p>© {new Date().getFullYear()} Akiba Hub Collectibles. London Tokyo Specialty Imports.</p>
          <p className="max-w-md text-center sm:text-right leading-relaxed text-gray-600">
            All Pokémon, Pikachu, and One Piece artwork and trademarks remain property of Nintendo, Game Freak, Bandai Namco, Shueisha, or Toei Animation. No corporate affiliation implied.
          </p>
        </div>
      </div>
    </footer>
  );
}
