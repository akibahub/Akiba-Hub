import React, { useState, useMemo } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useShop } from '../context/ShopContext';
import { ShippingDetails } from '../types';
import { ChevronRight, CheckCircle, ShoppingBag, Lock, Info, ExternalLink, Code2 } from 'lucide-react';

export function CheckoutFlow() {
  const {
    cart,
    setView,
    getCartSubtotal,
    placeOrder
  } = useShop();

  // Redirect to directory if cart is empty and not on receipt
  if (cart.length === 0) {
    // If we have a successful transaction, we want to stay
  }

  // Funnel steps state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states for unregistered user
  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'standard',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({});
  
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Compute live subtotal details
  const subtotal = getCartSubtotal();
  const shippingCost = useMemo(() => {
    return subtotal >= 50 ? 0 : 3.99;
  }, [subtotal]);
  const taxCost = useMemo(() => 0, []); // VAT/tax is handled server-side later if needed
  const totalCost = useMemo(() => subtotal + shippingCost + taxCost, [subtotal, shippingCost, taxCost]);

  // Handle address/details text changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ShippingDetails]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate step progress
  const validateStep = (step: 1 | 2) => {
    const errors: Partial<Record<keyof ShippingDetails, string>> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid Email is required';
      if (!formData.phone.trim()) errors.phone = 'Mobile Phone is required';
    } else if (step === 2) {
      if (!formData.addressLine1.trim()) errors.addressLine1 = 'Shipping Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.state.trim()) errors.state = 'State / region sequence is required';
      if (!formData.postalCode.trim()) errors.postalCode = 'Postal zip code is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep(1)) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep(2)) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-[#070707] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Indicator Header */}
        <div className="flex items-center gap-2 text-[10px] font-mono mb-8 border-b border-white/10 pb-4 text-gray-400">
          <button onClick={() => setView('landing')} className="hover:text-[#e60012] transition-all cursor-pointer uppercase">HOME</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setView('shop')} className="hover:text-[#e60012] transition-all cursor-pointer uppercase">PRODUCTS</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#e60012] font-bold uppercase">SECURE CHECKOUT</span>
        </div>

        {cart.length === 0 ? (
          <div className="max-w-md mx-auto py-16 text-center bg-[#121215] border border-white/10 rounded-xl p-6 shadow-xl">
            <span className="text-4xl">🛍️</span>
            <h2 className="text-md font-bold text-white font-mono uppercase tracking-widest mt-4">Your cart is empty</h2>
            <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto font-medium leading-relaxed">
              Please add some items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => setView('shop')}
              className="mt-6 px-5 py-3 bg-[#e60012] hover:bg-[#ff1e27] text-white font-mono font-bold text-xs rounded tracking-widest shadow-[0_0_12px_rgba(230,0,18,0.35)] cursor-pointer"
            >
              BROWSE PRODUCTS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Steps Panel */}
            <div className="lg:col-span-7 bg-[#121215] border border-white/10 rounded-xl overflow-hidden shadow-xl">
              
              {/* Step Title ribbon bar */}
              <div className="grid grid-cols-3 border-b border-white/10 bg-[#18181c] text-center text-[9px] font-bold py-3 font-mono">
                <div className={`py-2 rounded mx-1.5 transition-all uppercase tracking-widest border ${currentStep === 1 ? 'bg-[#e60012] border-[#e60012] text-white shadow-[0_0_10px_rgba(230,0,18,0.35)]' : 'border-transparent text-gray-500'}`}>
                  1. ACCOUNT & METHOD
                </div>
                <div className={`py-2 rounded mx-1.5 transition-all uppercase tracking-widest border ${currentStep === 2 ? 'bg-[#e60012] border-[#e60012] text-white shadow-[0_0_10px_rgba(230,0,18,0.35)]' : 'border-transparent text-gray-500'}`}>
                  2. SHIPPING
                </div>
                <div className={`py-2 rounded mx-1.5 transition-all uppercase tracking-widest border ${currentStep === 3 ? 'bg-[#e60012] border-[#e60012] text-white shadow-[0_0_10px_rgba(230,0,18,0.35)]' : 'border-transparent text-gray-500'}`}>
                  3. PAYMENT
                </div>
              </div>

              {/* Step Forms */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Step 1: Unregistered User Account Info */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="bg-[#e60012]/10 p-4 border border-[#e60012]/30 rounded flex items-start gap-3">
                      <div className="p-1.5 bg-[#121215] text-[#e60012] rounded flex items-center justify-center border border-[#e60012]/20">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#e60012] uppercase font-mono tracking-wide">GUEST CHECKOUT ACTIVE</h4>
                        <p className="text-[10.5px] text-gray-300 mt-1 leading-relaxed">
                          No account registration is needed. Settle your transaction securely with standard guest processing in under three minutes.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Full Legal Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Collector brand or legal name (e.g. Ash Ketchum)"
                          className={`w-full bg-[#18181c] text-xs text-white border ${formErrors.fullName ? 'border-[#e60012]' : 'border-white/10'} rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-semibold font-mono`}
                        />
                        {formErrors.fullName && <p className="text-[9px] text-[#e60012] font-mono mt-1">⚠️ ERR: {formErrors.fullName.toUpperCase()}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className={`w-full bg-[#18181c] text-xs text-white border ${formErrors.email ? 'border-[#e60012]' : 'border-white/10'} rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-semibold font-mono`}
                          />
                          {formErrors.email && <p className="text-[9px] text-[#e60012] font-mono mt-1">⚠️ ERR: {formErrors.email.toUpperCase()}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+44 (7700) 900077"
                            className={`w-full bg-[#18181c] text-xs text-white border ${formErrors.phone ? 'border-[#e60012]' : 'border-white/10'} rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-semibold font-mono`}
                          />
                          {formErrors.phone && <p className="text-[9px] text-[#e60012] font-mono mt-1">⚠️ ERR: {formErrors.phone.toUpperCase()}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between font-mono">
                      <span className="text-[9px] text-gray-500 font-bold flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#e60012] animate-pulse" /> SECURE SSL ENCRYPTED TRANSACTION
                      </span>
                      <button
                        id="step1-next-btn"
                        onClick={handleNextStep}
                        className="px-5 py-3 bg-[#e60012] text-white font-bold text-xs rounded shadow-[0_0_12px_rgba(230,0,18,0.35)] cursor-pointer flex items-center gap-1.5 hover:bg-[#ff1e27] transition-all"
                      >
                        CONTINUE TO SHIPPING
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Live Shipping Address & Rate Choice */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Address Line 1</label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={formData.addressLine1}
                          onChange={handleInputChange}
                          placeholder="Street Address, P.O. Box, Company Name"
                          className={`w-full bg-[#18181c] text-xs text-white border ${formErrors.addressLine1 ? 'border-[#e60012]' : 'border-white/10'} rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-mono font-semibold`}
                        />
                        {formErrors.addressLine1 && <p className="text-[9px] text-[#e60012] font-mono mt-1">⚠️ ERR: {formErrors.addressLine1.toUpperCase()}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={formData.addressLine2 || ''}
                          onChange={handleInputChange}
                          placeholder="Apartment, suite, unit, floor"
                          className="w-full bg-[#18181c] text-xs text-white border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-mono font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g. London"
                            className={`w-full bg-[#18181c] text-xs text-white border ${formErrors.city ? 'border-[#e60012]' : 'border-white/10'} rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-mono font-semibold`}
                          />
                          {formErrors.city && <p className="text-[9px] text-[#e60012] font-mono mt-1">⚠️ ERR: {formErrors.city.toUpperCase()}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">State / Region</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="e.g. Greater London"
                            className={`w-full bg-[#18181c] text-xs text-white border ${formErrors.state ? 'border-[#e60012]' : 'border-white/10'} rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-mono font-semibold`}
                          />
                          {formErrors.state && <p className="text-[9px] text-[#e60012] font-mono mt-1">⚠️ ERR: {formErrors.state.toUpperCase()}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Postcode</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="EC1A 1BB"
                            className={`w-full bg-[#18181c] text-xs text-white border ${formErrors.postalCode ? 'border-[#e60012]' : 'border-white/10'} rounded px-4 py-3 focus:outline-none focus:border-[#e60012] placeholder-gray-500 font-mono font-semibold`}
                          />
                          {formErrors.postalCode && <p className="text-[9px] text-[#e60012] font-mono mt-1">⚠️ ERR: {formErrors.postalCode.toUpperCase()}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full bg-[#18181c] text-xs text-white border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-[#e60012] font-semibold font-mono cursor-pointer"
                        >
                          <option value="United Kingdom">United Kingdom (UK)</option>
                          <option value="United States">United States (USA)</option>
                          <option value="Japan">Japan (NIPPON)</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                        </select>
                      </div>
                    </div>

                    {/* Delivery live rate toggling */}
                    <div className="border-t border-white/5 pt-5 space-y-3">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">SELECT SHIPPING METHOD</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <label className={`block p-4 rounded border transition-all cursor-pointer relative font-mono ${formData.shippingMethod === 'standard' ? 'bg-[#e60012]/10 border-[#e60012] text-white shadow-[0_0_10px_rgba(230,0,18,0.15)]' : 'bg-[#18181c] border-white/10 hover:border-white/20'}`}>
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === 'standard'}
                            onChange={() => setFormData((prev) => ({ ...prev, shippingMethod: 'standard' }))}
                            className="absolute top-4 right-4 text-[#e60012] focus:ring-[#e60012] cursor-pointer"
                          />
                          <span className="text-xs font-bold block text-white">STANDARD SHIPPING</span>
                          <span className="text-[9px] text-gray-400 block mt-1 leading-normal font-sans font-semibold">Tracked parcel delivery // 4 - 8 business days</span>
                          <span className="text-xs font-bold text-[#e60012] block mt-3">
                            {subtotal >= 50 ? 'FREE DELIVERY' : '£3.99'}
                          </span>
                        </label>

                        <label className={`block p-4 rounded border transition-all cursor-pointer relative font-mono ${formData.shippingMethod === 'express' ? 'bg-[#e60012]/10 border-[#e60012] text-white shadow-[0_0_10px_rgba(230,0,18,0.15)]' : 'bg-[#18181c] border-white/10 hover:border-white/20'}`}>
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={false}
                            disabled
                            onChange={() => {}}
                            className="absolute top-4 right-4 text-[#e60012] focus:ring-[#e60012] cursor-not-allowed"
                          />
                          <span className="text-xs font-bold block text-white">DHL EXPRESS INTERNATIONAL</span>
                          <span className="text-[9px] text-gray-400 block mt-1 leading-normal font-sans font-semibold">Coming soon // standard shipping is active now</span>
                          <span className="text-xs font-bold text-gray-500 block mt-3">
                            UNAVAILABLE
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center font-mono">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-bold text-gray-500 hover:text-white transition-all cursor-pointer"
                      >
                        &lt;- Back to Details
                      </button>
                      <button
                        id="step2-next-btn"
                        onClick={handleNextStep}
                        className="px-5 py-3 bg-[#e60012] text-white font-bold text-xs rounded shadow-[0_0_12px_rgba(230,0,18,0.35)] cursor-pointer flex items-center gap-1.5 hover:bg-[#ff1e27] transition-all"
                      >
                        CONTINUE TO PAYMENT
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment & Simulated PayPal Smart Button Integration */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-[#18181c] p-4 border border-white/5 rounded font-mono text-[10px]">
                      <h4 className="text-[11px] font-bold text-[#e60012] uppercase tracking-widest mb-2">DELIVERY SUMMARY</h4>
                      <p className="text-gray-300 leading-relaxed font-semibold">
                        Name: <span className="text-white font-black">{formData.fullName}</span> ({formData.email})<br />
                        Address: <span className="text-white">{formData.addressLine1}, {formData.city}, {formData.state} {formData.postalCode}, {formData.country}</span><br />
                        Shipping: <span className="text-[#e60012] font-bold">{formData.shippingMethod === 'express' ? 'DHL Express Priority Air 🚀' : 'Standard Delivery'}</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#e60012] animate-pulse" /> PAYMENT GATEWAY
                      </h4>
                      
                      {/* Integrated PayPal Standard Smart Button */}
                      <div className="bg-[#18181c] border border-white/10 p-6 rounded-lg space-y-4 text-center">
                        <div className="max-w-xs mx-auto mb-1">
                          {/* PayPal SVG styled logo */}
                          <svg viewBox="0 0 100 28" className="w-24 h-7 text-white mx-auto fill-current">
                            <path d="M12.4 3.7c.3.5.4 1.1.2 1.8-.3 1.6-1.5 3.1-3 3.6h-2.2l-.7 4.1h-3.4l1.9-11.2h4.5c1.8-.1 2.3.8 2.7 1.7zm-4.7 3.5h.9c.7 0 1.2-.4 1.3-1 .1-.5-.1-.8-.6-.8h-1l-.6 1.8zm11 1.7c-.5 2.7-2.3 4.2-4.8 4.2H12l-.7 4.1h-3.4l1.9-11.2h4.6c2.7-.1 4.8.8 4.3 2.9zm-4.6 2.3h1c.9 0 1.5-.4 1.6-1.1s-.2-1-.9-1h-1l-.7 2.1zm8.3-4c0-.2.1-.3.1-.3.4-.6.3-1.4-.4-1.8H21.2l-1.9 11.2h3.4l.6-3.7h.9c1.7 0 3-1.4 3.2-3.2.1-1.1-.3-1.8-1-2.2zm-2.4 2.1l-.3 1.9h-.8l.3-1.9h.8zM41 4.7l-1.9 11.2h-3.4l.6-3.7h-.9c-1.8 0-3.1-1.4-3.3-3.2-.1-1.1.3-1.8 1-2.2.3-.2.4-.3.4-.3h5.1c.5.5.4 1.3-.5 1.7h-.8l-.3 1.9h.8c.8.1 1.3-.4 1.4-1 .1-.5-.1-.8-.6-.8h-1l-1 2.9zm6.3-1.2l.6-3.5h-3.4l-.6 3.5h3.4zm-.2.8L45.2 11h-3.4l1.9-5.7H47.1z M52.7 10.7V8.5h2l.3-1.5h-2.3V5.5h2.6l.3-1.5h-2.9c-1.2 0-2 .8-2.2 2v1.2H50l-.3 1.5h1.2v2.2c0 1.2.8 2 2 2h2.9l.3-1.5h-2.6c-.7 0-1.1-.4-1.1-1.2z M65.2 12c-1.2.9-2.6 1.1-4 1.1c-2.3 0-3.8-1.4-3.4-3.5h7.4c.1-.4.1-.7.1-.9c-.1-2.4-1.8-3.6-4.2-3.6s-4.3 1.6-4.6 3.8C56 11.2 57.5 13 60 13c1.7 0 3.1-.4 4-1.2l1.2.2zm-3.1-4c.4 0 .7.3.7.7h-3.4c.1-.5.4-.7.7-.7h2z M71.1 2.3h-3.4v10.3c0 .8.4 1.2 1.2 1.2h2.6l.3-1.5H69c-.4 0-.6-.2-.6-.6V2.3z" />
                          </svg>
                        </div>
                        <p className="text-[11px] text-gray-400 max-w-sm mx-auto font-sans font-medium">
                          Click the smart payment cards below to authorize our integrated sandbox simulation. Works with mock developer test accounts safely.
                        </p>

                        <div className="space-y-3 pt-4 max-w-sm mx-auto font-mono">
                          {paymentError && (
                            <div className="bg-[#e60012]/10 border border-[#e60012]/40 text-[#ff6b73] rounded p-3 text-[10px] font-bold text-left">
                              {paymentError}
                            </div>
                          )}

                          <PayPalScriptProvider
                            options={{
                              clientId: (import.meta as any).env.VITE_PAYPAL_CLIENT_ID || '',
                              currency: 'GBP',
                              intent: 'capture',
                            }}
                          >
                            <PayPalButtons
                              style={{
                                layout: 'vertical',
                                color: 'gold',
                                shape: 'rect',
                                label: 'paypal',
                              }}
                              createOrder={async () => {
                                setPaymentError(null);

                                const safeCart = cart.map((item) => ({
                                  id: item.product.id,
                                  quantity: item.quantity,
                                }));

                                const response = await fetch('/api/paypal/create-order', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({ cart: safeCart }),
                                });

                                const data = await response.json();

                                if (!response.ok) {
                                  const message = data.error || 'Failed to create PayPal order';
                                  setPaymentError(message);
                                  throw new Error(message);
                                }

                                return data.id;
                              }}
                              onApprove={async (data) => {
                                setPaymentError(null);

                                if (!data.orderID) {
                                  const message = 'Missing PayPal order ID';
                                  setPaymentError(message);
                                  throw new Error(message);
                                }

                                const safeCart = cart.map((item) => ({
                                  id: item.product.id,
                                  quantity: item.quantity,
                                }));

                                const response = await fetch('/api/paypal/capture-order', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    orderId: data.orderID,
                                    cart: safeCart,
                                    customer: {
                                      name: formData.fullName,
                                      email: formData.email,
                                    },
                                  }),
                                });

                                const result = await response.json();

                                if (!response.ok) {
                                  const message = result.error || 'Failed to capture payment';
                                  setPaymentError(message);
                                  throw new Error(message);
                                }

                                placeOrder({
                                  id: result.akibaOrderId,
                                  items: [...cart],
                                  shippingDetails: { ...formData },
                                  subtotal: Number(result.calculatedOrder.subtotal),
                                  shippingCost: Number(result.calculatedOrder.shipping),
                                  tax: 0,
                                  total: Number(result.calculatedOrder.total),
                                  paymentId: result.captureId,
                                  date: new Date().toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  }),
                                  status: 'processing',
                                });
                              }}
                              onError={(err) => {
                                console.error('PayPal error:', err);
                                setPaymentError('PayPal checkout failed. Please try again.');
                              }}
                            />
                          </PayPalScriptProvider>
                        </div>

                        <div className="pt-2 text-[9px] text-gray-400 font-mono flex items-center justify-center gap-1.5 font-bold">
                          <CheckCircle className="w-4 h-4 text-[#e60012]" />
                          PayPal Secure Transactions Protected
                        </div>
                      </div>

                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between items-center font-mono">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-bold text-gray-500 hover:text-white transition-all cursor-pointer"
                      >
                        &lt;- Back to Shipping
                      </button>
                      <span className="text-[9px] text-gray-500 font-bold">SECURE SOUVENIR TRANSACTIONS BY AKIBA HUB</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Invoice & Developer Integration Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Receipt Cart breakdown invoice */}
              <div className="bg-[#121215] border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden">
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-white/5 pb-3">
                  <ShoppingBag className="w-4 h-4 text-[#e60012]" /> ORDER SUMMARY
                </h3>
                
                {/* Short scannable checkout preview items list */}
                <div className="max-h-52 overflow-y-auto pr-1 space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-2 p-2.5 bg-[#18181c] rounded border border-white/5 shadow-md">
                      <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded border border-white/10 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-bold text-white truncate font-sans">{item.product.name}</h4>
                        <span className="text-[9px] font-mono text-gray-400 font-bold block mt-0.5">Qty: {item.quantity} × £{item.product.price.toFixed(2)}</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-white self-center">£{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown list */}
                <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs font-mono text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white font-bold">
                      {shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-white font-bold">£{taxCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-xs font-bold text-white">
                    <span>ORDER TOTAL</span>
                    <span className="text-[#e60012] text-sm font-black">£{totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Developer Integration Sandbox Helper Widget Panel */}
              <div className="bg-[#121215] border border-white/5 rounded-xl p-6 shadow-xl leading-normal text-left">
                <div className="flex items-center gap-2 mb-3 text-white font-mono">
                  <Code2 className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold uppercase tracking-wider">DEVELOPER INTEGRATION</span>
                </div>
                <p className="text-[10.5px] text-gray-300 font-semibold mb-3 leading-relaxed">
                  This checkout uses real PayPal buttons connected to your Vercel serverless endpoints. Test with PayPal Sandbox first, then switch your environment variables to live mode.
                </p>

                <div className="bg-[#18181c] p-3 rounded border border-white/5 font-mono text-[9px] text-gray-400 space-y-3">
                  <div>
                    <span className="text-[#e60012] font-bold">1. Embed React Paypal library</span>
                    <pre className="bg-slate-950 p-2 border border-white/5 rounded text-gray-300 mt-1 select-all overflow-x-auto text-[8.5px]">npm install @paypal/react-paypal-js</pre>
                  </div>
                  <div>
                    <span className="text-white font-bold">2. Add the PayPal Provider</span>
                    <div className="bg-slate-950 p-1.5 border border-white/5 rounded text-gray-400 font-bold select-all mt-1 truncate">
                      {"<PayPalScriptProvider options={{ clientId: 'CLIENT_ID' }}>"}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#e60012] font-bold">3. Implement capture payload callback</span>
                    <p className="text-[8px] text-gray-500 mt-1 leading-snug">Attach payment response handlers to standard state dispatchers inside your Shop Context container module.</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] font-mono font-bold text-white hover:text-[#e60012] transition-all">
                  <a href="https://developer.paypal.com/sdk/js/configuration/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Official PayPal SDK Manual
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>


    </div>
  );
}
