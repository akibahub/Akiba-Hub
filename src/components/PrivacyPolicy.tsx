import React from 'react';
import { useShop } from '../context/ShopContext';
import { Shield, Eye, Lock, ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
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
        <span className="text-[10px] font-mono tracking-widest text-[#e60012] font-black uppercase bg-[#e60012]/10 border border-[#e60012]/30 px-3.5 py-1.5 rounded-md inline-block">
          LEGAL FRAMEWORK
        </span>
        <h1 className="text-3xl font-display font-medium text-white tracking-widest uppercase">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-gray-400 max-w-lg mx-auto font-semibold">
          Last Updated: June 8, 2026. UK GDPR & PECR Data Protection & Sovereignty Logs.
        </p>
      </div>

      {/* Warning/Disclaimer bar */}
      <div className="bg-[#18181c] border border-white/10 p-5 rounded-xl mb-10 flex gap-4 items-start">
        <div className="p-2.5 bg-yellow-400/10 rounded border border-yellow-400/20 text-yellow-500">
          <Shield className="w-5 h-5 animate-pulse" />
        </div>
        <div className="text-xs space-y-1 font-semibold leading-relaxed">
          <h4 className="text-white font-mono text-[11px] uppercase tracking-wider">NOTICE TO ADMINISTRATORS & CUSTOMERS</h4>
          <p className="text-gray-400 font-medium">
            This document sets out how Akiba Hub (akibahub.co.uk) handles personal data on our direct import channel. This template is designed for compliant disclosure; customize specific addresses and data controllers inside the source as necessary.
          </p>
        </div>
      </div>

      {/* Document Body */}
      <div className="space-y-8 text-gray-300 font-medium text-xs leading-relaxed max-w-3xl mx-auto">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-[#e60012] pl-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#e60012]" /> 1. OVERVIEW & SCOPE
          </h2>
          <p className="pl-4">
            Akiba Hub (“we”, “us”, or “our”) operates the digital web portal <span className="text-white font-semibold">akibahub.co.uk</span>. We are deeply committed to respecting the privacy of our visitors under the UK General Data Protection Regulation (UK GDPR) and the Privacy and Electronic Communications Regulations (PECR). 
          </p>
          <p className="pl-4">
            We use a CookieYes cookie consent platform to manage preferences, allowing you complete discretion regarding optional cookie categories. Essential operational processes (such as processing cart states and submitting secure PayPal checkout) continue to operate safely for service delivery.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-[#e60012] pl-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#e60012]" /> 2. WHAT PERSONAL DATA WE COLLECT
          </h2>
          <div className="pl-4 space-y-2">
            <p>During your interaction with our collector hub, you may provide several types of data:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 font-mono text-[11px]">
              <li><strong className="text-white">Checkout Details:</strong> Name, physical shipping address, phone number, and email address to process and fulfill your imported collectibles.</li>
              <li><strong className="text-white">Transaction Logs:</strong> Secure PayPal payment references (the full checkout session is hosted end-to-end securely by PayPal).</li>
              <li><strong className="text-white">Interactive Help Desk:</strong> Contact form entries (including name, email address, message body, unique MSG reference identifier, and automated timestamp).</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-white pl-3">
            3. HOW WE USE YOUR INFORMATION
          </h2>
          <div className="pl-4 space-y-2">
            <p>Your raw personal records are never sold, rented, or distributed to data brokers. They are used exclusively for:</p>
            <ul className="list-decimal pl-5 space-y-1.5 text-gray-400">
              <li>Executing contract terms requested by you (calculating shipping, generating invoices, checking regional stocks, and dispatching your orders).</li>
              <li>Delivering secure order transaction confirmation and priority dispatch alerts via our Resend API integrations.</li>
              <li>Archiving verified customer queries within our private, dedicated Support Sheets system to resolve collector tickets quickly.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-white pl-3">
            4. THIRD-PARTY DISCLOSURES & CHANNELS
          </h2>
          <p className="pl-4">
            To coordinate direct Tokyo imports to your doorstep, we utilize industry-standard, fully audited cloud partners. All data transfers remain protected by secure HTTPS/TLS encryption channels:
          </p>
          <div className="pl-4 border border-white/5 bg-[#121215] rounded-lg p-4 font-mono text-[11px] text-gray-400 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-white font-bold">PayPal SDK Integration:</span>
                <p className="mt-0.5">Loads and handles card entries or account checkouts with real-time merchant encryption. No card details ever hit Akiba Hub servers.</p>
              </div>
              <div>
                <span className="text-white font-bold">Google Sheets API:</span>
                <p className="mt-0.5">Saves order dispatch histories and contact-message spreadsheets directly in private Google Workspace vaults using server-side service credentials.</p>
              </div>
              <div>
                <span className="text-white font-bold">Resend API Provider:</span>
                <p className="mt-0.5">Dispatches customer checkout notices and relays contact.tsx customer notifications safely using secure API relays.</p>
              </div>
              <div>
                <span className="text-white font-bold">CookieYes Banner:</span>
                <p className="mt-0.5">Saves your specific consent configurations directly in your secure client browser for up to one calendar year.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest border-l-2 border-white pl-3">
            5. YOUR RIGHTS UNDER UK GDPR
          </h2>
          <p className="pl-4">
            Under data protection rules, you have absolute ownership over your metadata. You can exercise any of the following rights at any time:
          </p>
          <ul className="list-disc pl-9 space-y-1">
            <li>The right to access and copy your personal records.</li>
            <li>The right to request immediate correction or erasure of your historical details.</li>
            <li>The right to withdraw optional cookie consent instantly.</li>
          </ul>
          <p className="pl-4">
            For any data requests, contact us immediately at <span className="text-[#e60012] font-mono">info@akibahub.co.uk</span> with your message references. We will fulfill all valid information requests within one calendar month.
          </p>
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
