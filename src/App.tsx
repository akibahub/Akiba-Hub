import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ShopPage } from './components/ShopPage';
import { CheckoutFlow } from './components/CheckoutFlow';
import { OrderSuccess } from './components/OrderSuccess';
import { CartDrawer } from './components/CartDrawer';

function AppContent() {
  const { activeView } = useShop();

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
