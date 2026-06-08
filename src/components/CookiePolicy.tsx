import React from 'react';
import { useShop } from '../context/ShopContext';
import { openCookiePreferences } from '../utils/cookieConsent';
import { Shield, Settings, HelpCircle, Check, ArrowLeft } from 'lucide-react';

export function CookiePolicy() {
  const { setView } = useShop();

  const handleReturn = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 font-sans">
      {/* Back to Hub navigation */}
      <div className="mb-8">
        <button
          onClick={handleReturn}
          className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 hover:text-[#e60012] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>&lt;= BACK TO HUB TERMINAL</span>
        </button>
      </div>

      {/* Header Panel */}
      <div className="text-center space-y-3 mb-12 border-b border-white/5 pb-8">
        <span className="text-[10px] font-mono tracking-widest text-white font-black uppercase bg-white/5 border border-white/20 px-3.5 py-1.5 rounded-md inline-block">
          COOKIE TRANSPARENCY
        </span>
        <h1 className="text-3xl font-display font-medium text-white tracking-widest uppercase">
          COOKIE POLICY
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto font-semibold">
          Last Updated: June 8, 2026. UK GDPR & PECR Compliant Information.
        </p>
      </div>

      {/* Interactive Controller call-out */}
      <div className="bg-[#18181c] border border-white/10 p-6 rounded-xl mb-12 text-center space-y-4">
        <div className="inline-flex p-3 bg-[#e60012]/10 rounded-full text-[#e60012]">
          <Settings className="w-6 h-6 animate-spin-slow" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-white font-mono text-xs uppercase tracking-wider font-bold">MANAGE YOUR COOKIE PREFERENCES</h3>
          <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
            Want to adjust or withdraw your consent? Click the button below to display the CookieYes preferences banner instantly.
          </p>
        </div>
        <button
          onClick={openCookiePreferences}
          className="px-5 py-2.5 bg-[#e60012] hover:bg-[#e60012]/95 text-white font-mono font-bold text-[10px] uppercase rounded shadow-[0_0_15px_rgba(230,0,18,0.2)] tracking-widest transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <Settings className="w-3.5 h-3.5" />
          OPEN COOKIE SETTINGS
        </button>
      </div>

      {/* Policy Text Grid */}
      <div className="space-y-8 text-gray-300 font-medium text-xs leading-relaxed max-w-3xl mx-auto">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-[#e60012] pl-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#e60012]" /> 1. WHAT ARE COOKIES?
          </h2>
          <p className="pl-4">
            Cookies are very small text files saved in your browser directory when you load a web application. They are used extensively to register settings, help checkout carts retain selected items, track analytical visitation timelines, of which most are essential for secure user-requested services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-[#e60012] pl-3">
            2. COOKIE CLASSIFICATIONS
          </h2>
          <p className="pl-4">
            Under United Kingdom legislation (the UK GDPR and PECR), cookies are classified under two main compliance parameters:
          </p>

          <div className="space-y-3 pl-4">
            {/* Class A: Necessary */}
            <div className="bg-[#121215] border border-white/5 rounded-lg p-4 space-y-1.5">
              <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">
                Necessary (Active by Default)
              </span>
              <p className="text-[11px] text-gray-400 font-semibold leading-relaxed pt-1">
                These are strictly required to operate features requested explicitly by the customer:
              </p>
              <ul className="list-disc pl-5 text-[11px] text-gray-500 font-mono space-y-1">
                <li><strong className="text-white">localStorage State:</strong> Used to temporarily store items in your Cart, latest guest billing addresses, and order references.</li>
                <li><strong className="text-white">CookieYes configurations:</strong> Stores your accepted/rejected categories safely so we don't prompt on every page.</li>
                <li><strong className="text-white">Secure Gateway Tokens:</strong> When you proceeding to Payment (Step 3), the secure PayPal Smart Button places dynamic cookies necessary for payment.</li>
              </ul>
            </div>

            {/* Class B: Optional */}
            <div className="bg-[#121215] border border-white/5 rounded-lg p-4 space-y-1.5">
              <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-[#e60012] bg-[#e60012]/10 border border-[#e60012]/20 px-2 py-0.5 rounded">
                Optional Analytics & Marketing (Disabled by Default)
              </span>
              <p className="text-[11px] text-gray-400 font-semibold leading-relaxed pt-1">
                These are code scripts and tracking identifiers that measure user behaviour, loading, and advertising trends. These <span className="text-white">remain blocked</span> from loading until you explicitly accept them:
              </p>
              <ul className="list-disc pl-5 text-[11px] text-gray-500 font-mono space-y-1">
                <li><strong className="text-white">Analytics:</strong> Google Analytics pixel logs measuring general clicks or popular product metrics.</li>
                <li><strong className="text-white">Advertisement Trackers:</strong> TikTok Pixel or Meta Advertising structures mapping marketing clicks.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-white pl-3">
            3. THIRD-PARTY PAYMENT INTEGRATIONS
          </h2>
          <p className="pl-4">
            Our checkout uses official <span className="text-white font-semibold">PayPal Standard APIs</span> for transaction safety. To ensure optimum user compliance:
          </p>
          <ul className="list-disc pl-9 space-y-1">
            <li>PayPal scripts do not load globally on our homepage, cart views, or product grid screens.</li>
            <li>The PayPal SDK mounts only after you supply shipping coordinates and proceed intentionally to Step 3 of the secure checkout.</li>
            <li>Rejecting optional analytics cookies in the banner does not block or impair PayPal payments.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-white pl-3">
            4. HOW TO REMOVE OR REJECT COOKIES
          </h2>
          <p className="pl-4">
            If you wish to block all cookie storage from your computer entirely, you may do so through your physical browser preferences. Note that this may impair your ability to complete guest checkouts:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-4 font-mono text-[11px] text-gray-400">
            <div className="bg-[#121215] border border-white/5 p-3 rounded">
              <span className="text-white font-bold block mb-1">Google Chrome</span>
              Settings &gt; Privacy and security &gt; Third-party cookies &gt; Block all.
            </div>
            <div className="bg-[#121215] border border-white/5 p-3 rounded">
              <span className="text-white font-bold block mb-1">Apple Safari</span>
              Settings &gt; Privacy &gt; Prevent cross-site tracking.
            </div>
            <div className="bg-[#121215] border border-white/5 p-3 rounded">
              <span className="text-white font-bold block mb-1">Mozilla Firefox</span>
              Settings &gt; Privacy & Security &gt; Enhanced Tracking Protection.
            </div>
          </div>
        </section>

      </div>

      {/* Bottom controls */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <button
          onClick={handleReturn}
          className="px-6 py-3 bg-[#e0e0e0] hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded transition-colors cursor-pointer"
        >
          RETURN TO HUB TERMINAL
        </button>
      </div>
    </div>
  );
}
