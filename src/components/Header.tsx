import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import { ShoppingCart, Menu, X, ChevronDown, BookOpen, MessageSquare, Flame, Pocket } from 'lucide-react';

export function Header() {
  const { getCartItemsCount, activeView, setView, setCartOpen, setCategoryAndGroup } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTcgDropdownOpen, setIsTcgDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'landing' | 'shop', sectionId?: string) => {
    setView(view);
    setIsMobileMenuOpen(false);
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

  const handleCategorySelect = (category: string) => {
    setCategoryAndGroup(category);
    setIsMobileMenuOpen(false);
    setIsTcgDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#0a0a0c]/90 border-b border-[#e60012]/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] ${
        isScrolled ? 'py-1.5' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* logo */}
          <div className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handleNavClick('landing')}>
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono">
            <button
              id="nav-home"
              onClick={() => handleNavClick('landing')}
              className={`text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                activeView === 'landing' ? 'text-[#e60012] glow-pink-text' : 'text-gray-400 hover:text-white'
              }`}
            >
              HOME
            </button>

            {/* shop with dropdown catalog category filter links */}
            <div className="relative group">
              <button
                id="nav-shop-menu"
                onMouseEnter={() => setIsTcgDropdownOpen(true)}
                onClick={() => handleNavClick('shop')}
                className={`flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  activeView === 'shop' ? 'text-[#e60012] glow-pink-text' : 'text-gray-400 hover:text-white'
                }`}
              >
                PRODUCTS
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTcgDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Flyout dropdown menu */}
              <div
                className="absolute left-0 mt-3 w-60 rounded-lg bg-[#121215] border border-[#e60012]/40 shadow-[0_10px_35px_rgba(0,0,0,0.7)] p-2 transition-all duration-250 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto text-white backdrop-blur-lg"
                onMouseLeave={() => setIsTcgDropdownOpen(false)}
              >
                <div className="text-[9px] font-mono font-bold tracking-widest text-[#e60012] px-3 py-1.5 uppercase border-b border-white/5">
                  TRADING CARD PACKS
                </div>
                <button
                  id="dropdown-poke-en"
                  onClick={() => handleCategorySelect('pokemon-english')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-md hover:bg-[#e60012]/10 hover:text-white text-gray-300 transition-all flex items-center justify-between cursor-pointer"
                >
                  Pokémon Packs (English)
                  <span className="text-[9px] bg-[#e60012] text-white px-1.5 py-0.25 rounded-md font-mono font-bold">USA</span>
                </button>
                <button
                  id="dropdown-poke-jp"
                  onClick={() => handleCategorySelect('pokemon-japanese')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-md hover:bg-[#e60012]/10 hover:text-white text-gray-300 transition-all flex items-center justify-between cursor-pointer"
                >
                  Pokémon Packs (Japanese)
                  <span className="text-[9px] bg-white text-slate-950 px-1.5 py-0.25 rounded-md font-mono font-black border border-white">JPN</span>
                </button>
                <button
                  id="dropdown-op-en"
                  onClick={() => handleCategorySelect('onepiece-english')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-md hover:bg-[#e60012]/10 hover:text-white text-gray-300 transition-all flex items-center justify-between cursor-pointer"
                >
                  One Piece (English)
                  <span className="text-[9px] bg-[#e60012] text-white px-1.5 py-0.25 rounded-md font-mono font-bold">USA</span>
                </button>
                <button
                  id="dropdown-op-jp"
                  onClick={() => handleCategorySelect('onepiece-japanese')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-md hover:bg-[#e60012]/10 hover:text-white text-gray-300 transition-all flex items-center justify-between cursor-pointer"
                >
                  One Piece (Japanese)
                  <span className="text-[9px] bg-white text-slate-950 px-1.5 py-0.25 rounded-md font-mono font-black border border-white">JPN</span>
                </button>
 
                <div className="text-[9px] font-mono font-bold tracking-widest text-[#e60012] px-3 py-1.5 mt-2 uppercase border-b border-white/5">
                  ANIME FIGURES
                </div>
                <button
                  id="dropdown-figures"
                  onClick={() => handleCategorySelect('action-fig')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-md hover:bg-[#e60012]/10 hover:text-white text-gray-300 transition-all flex items-center justify-between cursor-pointer"
                >
                  Action Figures (PVCs)
                  <span className="text-[9px] bg-white text-slate-950 px-1.5 py-0.25 rounded-md font-mono font-bold border border-white">SCALE</span>
                </button>
              </div>
            </div>
 
            <button
              id="nav-about"
              onClick={() => handleNavClick('landing', 'about-section')}
              className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              OUR STORY
            </button>
 
            <button
              id="nav-contact"
              onClick={() => handleNavClick('landing', 'contact-section')}
              className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </nav>
 
          {/* Cart & Mobile menu controller right icons */}
          <div className="flex items-center gap-4">
            
            {/* Cart trigger button styling from layout */}
            <button
              id="header-cart-btn"
              onClick={() => setCartOpen(true)}
              className="relative bg-transparent text-white px-5 py-2.5 rounded-lg font-mono font-bold border border-white/50 hover:bg-[#e60012] hover:border-[#e60012] hover:text-white shadow-[0_0_8px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(230,0,18,0.5)] transition-all cursor-pointer text-xs uppercase tracking-widest flex items-center gap-2 group"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-white" />
              <span>CART ({getCartItemsCount()})</span>
            </button>
 
            {/* mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-transparent border border-[#e60012] text-[#e60012] hover:bg-[#e60012]/10 cursor-pointer flex items-center justify-center w-10 h-10 shadow-[0_0_8px_rgba(230,0,18,0.2)]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0c]/98 border-b border-[#e60012]/50 border-t border-[#e60012]/30 px-4 pt-3 pb-6 flex flex-col gap-3 shadow-2xl max-h-[85vh] overflow-y-auto text-gray-100 backdrop-blur-lg">
          <button
            onClick={() => handleNavClick('landing')}
            className="text-left px-4 py-2.5 font-bold text-xs tracking-wider font-mono text-white hover:bg-[#e60012]/10 rounded-lg transition-all"
          >
            HOME
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className="text-[#e60012] text-left px-4 py-2.5 font-bold text-xs tracking-wider font-mono hover:bg-[#e60012]/10 rounded-lg transition-all"
          >
            ALL PRODUCTS
          </button>

          <div className="border-t border-white/5 pt-3 pl-3">
            <span className="text-[10px] font-mono tracking-widest text-[#e60012] font-bold uppercase block py-1">
              POKÉMON BOOSTER PACKS
            </span>
            <div className="grid grid-cols-2 gap-2 mt-1 pr-3">
              <button
                onClick={() => handleCategorySelect('pokemon-english')}
                className="text-left px-3 py-2 text-xs font-bold bg-[#121215] hover:bg-[#e60012]/10 border border-white/5 hover:border-[#e60012]/30 text-gray-300 rounded-md transition-all font-mono"
              >
                + English TCG
              </button>
              <button
                onClick={() => handleCategorySelect('pokemon-japanese')}
                className="text-left px-3 py-2 text-xs font-bold bg-[#121215] hover:bg-[#e60012]/10 border border-white/5 hover:border-[#e60012]/30 text-gray-300 rounded-md transition-all font-mono"
              >
                + Japanese TCG
              </button>
            </div>
            
            <span className="text-[10px] font-mono tracking-widest text-white font-bold uppercase block py-1 mt-3">
              ONE PIECE CARD GAME
            </span>
            <div className="grid grid-cols-2 gap-2 mt-1 pr-3">
              <button
                onClick={() => handleCategorySelect('onepiece-english')}
                className="text-left px-3 py-2 text-xs font-bold bg-[#121215] hover:bg-[#e60012]/10 border border-white/5 hover:border-[#e60012]/30 text-gray-300 rounded-md transition-all font-mono"
              >
                + English OPC
              </button>
              <button
                onClick={() => handleCategorySelect('onepiece-japanese')}
                className="text-left px-3 py-2 text-xs font-bold bg-[#121215] hover:bg-[#e60012]/10 border border-white/5 hover:border-[#e60012]/30 text-gray-300 rounded-md transition-all font-mono"
              >
                + Japanese OPC
              </button>
            </div>

            <span className="text-[10px] font-mono tracking-widest text-white font-bold uppercase block py-1 mt-3">
              ANIME FIGURES
            </span>
            <button
              onClick={() => handleCategorySelect('action-fig')}
              className="w-[calc(100%-12px)] text-left px-3 py-2 text-xs font-bold bg-[#121215] hover:bg-[#e60012]/10 border border-white/5 hover:border-[#e60012]/30 text-gray-300 rounded-lg flex items-center justify-between transition-colors font-mono hover:text-white"
            >
              + PVC Scale Figures
            </button>
          </div>

          <div className="border-t border-white/5 pt-3 flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('landing', 'about-section')}
              className="text-left px-4 py-2.5 text-xs font-mono font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              OUR STORY
            </button>
            <button
              onClick={() => handleNavClick('landing', 'contact-section')}
              className="text-left px-4 py-2.5 text-xs font-mono font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              CONTACT US
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
