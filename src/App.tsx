import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ShopPage } from './components/ShopPage';
import { CheckoutFlow } from './components/CheckoutFlow';
import { OrderSuccess } from './components/OrderSuccess';
import { CartDrawer } from './components/CartDrawer';
import { Sparkles, BookOpen, AlertTriangle, X } from 'lucide-react';

function AppContent() {
  const { activeView, comingSoonCategory, setComingSoonCategory } = useShop();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#070707] text-gray-200 font-sans antialiased cyber-grid relative overflow-x-hidden">
      <div className="relative z-10">
        {/* Navigation Headings bar */}
        <Header />
        
        {/* Dynamic active screens layout */}
        <div className="transition-all duration-300">
          {activeView === 'landing' && <LandingPage />}
          {activeView === 'shop' && <ShopPage />}
          {activeView === 'checkout' && <CheckoutFlow />}
          {activeView === 'order-success' && <OrderSuccess />}
        </div>
      </div>

      {/* Global screen drawers & borders */}
      <Footer className="relative z-10" />
      <CartDrawer />

      {/* Coming Soon Cybersecurity Style Modal */}
      {comingSoonCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setComingSoonCategory(null)} 
          />
          <div className="relative w-full max-w-md bg-[#121215] border border-[#e60012]/65 rounded-xl p-6 text-center text-white shadow-[0_0_30px_rgba(230,0,18,0.3)] z-10 overflow-hidden">
            {/* Holographic glowing lines */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e60012] to-transparent shadow-[0_0_8px_#e60012]" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e60012] to-transparent shadow-[0_0_8px_#e60012]" />

            <button
              onClick={() => setComingSoonCategory(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-[#18181c]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 inline-flex items-center justify-center p-3 bg-[#e60012]/15 border border-[#e60012] text-white rounded-full animate-pulse shadow-[0_0_20px_rgba(230,0,18,0.2)]">
              <BookOpen className="w-8 h-8 text-[#e60012]" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-[#e60012] font-black uppercase bg-[#e60012]/15 border border-[#e60012]/30 px-3 py-1 rounded inline-block mb-3">
              TOKYO HQ SYSTEM LOGS
            </span>

            <h3 className="text-xl font-display font-medium text-white uppercase tracking-wider mb-2">
              {comingSoonCategory}
            </h3>

            <p className="text-sm text-gray-300 font-sans font-medium mb-6 leading-relaxed max-w-sm mx-auto">
              We are not quite ready for that yet! Our global logistics pipeline for publishers and licenses is in deep integration. Check back shortly for premium direct arrivals.
            </p>

            <div className="bg-[#18181c] border border-white/5 rounded-lg p-3 text-[10px] font-mono text-gray-400 space-y-1 text-left">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-[#e60012]" /> INTERNAL STATUS UPDATE
              </div>
              <p className="pl-5 leading-normal">
                - Sourcing with Shueisha, Kodansha & Kadokawa underway.<br />
                - Dedicated shipping channels securing customs releases.<br />
                - Expected Launch: Q3 2026.
              </p>
            </div>

            <button
              onClick={() => setComingSoonCategory(null)}
              className="mt-6 w-full py-2.5 bg-[#e60012] hover:bg-[#ff1e27] text-white text-xs font-mono font-bold uppercase rounded border border-[#e60012] tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(230,0,18,0.3)] hover:shadow-[0_0_20px_rgba(230,0,18,0.5)]"
            >
              RETURN TO HUB
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
