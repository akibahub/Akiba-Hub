import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import { ShoppingCart, Menu, X, ChevronDown, BookOpen, Layers, ShieldCheck, Heart, Sparkles, Filter } from 'lucide-react';

export function Header() {
  const { 
    getCartItemsCount, 
    activeView, 
    setView, 
    setCartOpen, 
    setAdvancedFilters
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  // For mobile collapses
  const [mobileTcgOpen, setMobileTcgOpen] = useState(false);
  const [mobileFiguresOpen, setMobileFiguresOpen] = useState(false);
  const [mobileMangaOpen, setMobileMangaOpen] = useState(false);

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

  const handleTcgSelect = (subCategory: string, language: string | null = null) => {
    setAdvancedFilters({
      category: 'trading-cards',
      subCategory,
      language,
      productLine: null,
      anime: 'All Anime'
    });
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  };

  const handleFigureSelect = (subCategory: string | null, productLine: string | null = null) => {
    setAdvancedFilters({
      category: 'anime-figures',
      subCategory,
      language: null,
      productLine,
      anime: 'All Anime'
    });
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  };

  const handleGeneralCategorySelect = (category: string) => {
    setAdvancedFilters({
      category,
      subCategory: null,
      language: null,
      productLine: null,
      anime: 'All Anime'
    });
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
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
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onClick={() => handleNavClick('shop')}
                className={`flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  activeView === 'shop' ? 'text-[#e60012] glow-pink-text' : 'text-gray-400 hover:text-white'
                }`}
              >
                PRODUCTS
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Flyout dropdown menu */}
              <div
                className="absolute left-1/2 -translate-x-[45%] mt-3 w-[880px] rounded-lg bg-[#121215] border border-[#e60012]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] p-6 transition-all duration-250 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto text-white backdrop-blur-lg grid grid-cols-3 gap-6 text-left"
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                {/* COLUMN 1: TRADING CARD GAMES */}
                <div className="space-y-3.5 border-r border-white/5 pr-4">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-[#e60012] pb-1 uppercase border-b border-white/5 flex items-center justify-between">
                    <span>⚡ TRADING CARD GAMES</span>
                    <span className="text-[8px] bg-[#e60012]/10 border border-[#e60012]/30 text-[#e60012] px-1 py-0.25 rounded">TCG</span>
                  </div>
                  
                  <div className="space-y-2 text-xs font-mono font-bold">
                    {/* Pokémon */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">// POKÉMON TCG</span>
                      <div className="flex flex-wrap gap-1">
                        {['EN', 'JP', 'CN', 'KR', 'Other'].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => handleTcgSelect('pokemon', lang as any)}
                            className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] px-1.5 py-0.75 rounded transition-all cursor-pointer"
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* One Piece */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">// ONE PIECE CARD GAME</span>
                      <div className="flex flex-wrap gap-1">
                        {['EN', 'JP', 'KR', 'Other'].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => handleTcgSelect('onepiece', lang as any)}
                            className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] px-1.5 py-0.75 rounded transition-all cursor-pointer"
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Weiss Schwarz & Yu-Gi-Oh */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 mt-1">
                      <div>
                        <span className="text-[9px] text-gray-400 block mb-1">YU-GI-OH!</span>
                        <div className="flex gap-1">
                          {['EN', 'JP'].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => handleTcgSelect('yugioh', lang as any)}
                              className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[8px] px-1 py-0.5 rounded transition-all cursor-pointer"
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 block mb-1">WEISS SCHWARZ</span>
                        <div className="flex gap-1">
                          {['EN', 'JP'].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => handleTcgSelect('weiss-schwarz', lang as any)}
                              className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[8px] px-1 py-0.5 rounded transition-all cursor-pointer"
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* English Only TCGs */}
                    <div className="pt-2 border-t border-white/5 mt-1 space-y-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">// WESTERN PRINT TCG</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button onClick={() => handleTcgSelect('mtg', 'EN')} className="text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] p-1 rounded transition-all cursor-pointer">
                          + Magic (MTG)
                        </button>
                        <button onClick={() => handleTcgSelect('lorcana', 'EN')} className="text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] p-1 rounded transition-all cursor-pointer">
                          + Lorcana
                        </button>
                        <button onClick={() => handleTcgSelect('digimon', 'EN')} className="text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] p-1 rounded transition-all cursor-pointer">
                          + Digimon
                        </button>
                        <button onClick={() => handleTcgSelect('rift-bound', 'EN')} className="text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] p-1 rounded transition-all cursor-pointer">
                          + Rift Bound
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* COLUMN 2: ANIME FIGURES & PLUSHIES */}
                <div className="space-y-3.5 border-r border-white/5 pr-4">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-[#e60012] pb-1 uppercase border-b border-white/5 flex items-center justify-between">
                    <span>👾 FIGURES & PLUSHIES</span>
                    <span className="text-[8px] bg-white text-slate-950 px-1 py-0.25 rounded font-bold border border-white">SCALE</span>
                  </div>

                  <div className="space-y-3 text-xs font-mono font-bold">
                    {/* Banpresto */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 block">// BANPRESTO</span>
                      <div className="flex flex-wrap gap-1">
                        {['Ichibansho', 'Grandline Series', 'Vibration Stars'].map((pLine) => (
                          <button
                            key={pLine}
                            onClick={() => handleFigureSelect('banpresto', pLine)}
                            className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-[8px] text-gray-300 hover:text-white px-1.5 py-0.5 rounded transition-all cursor-pointer"
                          >
                            {pLine}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Kotobukiya */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 block">// KOTOBUKIYA</span>
                      <div className="flex flex-wrap gap-1">
                        {['ARTFX J', 'Bishoujo Statue'].map((pLine) => (
                          <button
                            key={pLine}
                            onClick={() => handleFigureSelect('kotobukiya', pLine)}
                            className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-[8px] text-gray-300 hover:text-white px-1.5 py-0.5 rounded transition-all cursor-pointer"
                          >
                            {pLine}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bandai */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 block">// BANDAI</span>
                      <div className="flex flex-wrap gap-1">
                        {['S.H.Figuarts', 'Figuarts ZERO'].map((pLine) => (
                          <button
                            key={pLine}
                            onClick={() => handleFigureSelect('bandai', pLine)}
                            className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-[8px] text-gray-300 hover:text-white px-1.5 py-0.5 rounded transition-all cursor-pointer"
                          >
                            {pLine}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Good Smile */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 block">// GOOD SMILE COMPANY</span>
                      <div className="flex flex-wrap gap-1">
                        {['Nendoroid', 'figma', 'POP UP PARADE'].map((pLine) => (
                          <button
                            key={pLine}
                            onClick={() => handleFigureSelect('good-smile', pLine)}
                            className="bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-[8px] text-gray-300 hover:text-white px-1.5 py-0.5 rounded transition-all cursor-pointer"
                          >
                            {pLine}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Funko & Plushies */}
                    <div className="pt-2 border-t border-white/5 flex gap-2">
                      <button
                        onClick={() => handleFigureSelect('funko', 'Funko Pop!')}
                        className="flex-1 text-center bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-[9px] text-gray-300 hover:text-white py-1 rounded transition-all cursor-pointer"
                      >
                        Funko Pops 🎁
                      </button>
                      <button
                        onClick={() => handleFigureSelect('plushies', 'Plushies')}
                        className="flex-1 text-center bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-[9px] text-gray-300 hover:text-white py-1 rounded transition-all cursor-pointer"
                      >
                        Soft Plushies 🧸
                      </button>
                    </div>

                  </div>
                </div>

                {/* COLUMN 3: MANGA / COMIC / ACCESSORIES */}
                <div className="space-y-5">
                  {/* Comic Books & Manga */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-[#e60012] pb-1 uppercase border-b border-white/5 flex items-center justify-between">
                      <span>📖 MANGA & COMICS</span>
                      <span className="text-[7px] bg-[#e60012]/20 text-[#e60012] border border-[#e60012]/30 px-1.5 rounded uppercase font-bold">SOON</span>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono font-bold">
                      <button
                        onClick={() => handleGeneralCategorySelect('manga')}
                        className="w-full text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-400 hover:text-white text-[9px] p-2 rounded transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>Manga / Light Novels</span>
                        <span className="text-[7px] border border-white/10 px-1 py-0.1 text-gray-500 rounded font-bold">LOADING</span>
                      </button>
                      <button
                        onClick={() => handleGeneralCategorySelect('comic-books')}
                        className="w-full text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-400 hover:text-white text-[9px] p-2 rounded transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>Comic Books</span>
                        <span className="text-[7px] border border-white/10 px-1 py-0.1 text-gray-500 rounded font-bold">LOADING</span>
                      </button>
                    </div>
                  </div>

                  {/* Accessories */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-[#e60012] pb-1 uppercase border-b border-white/5 flex items-center justify-between">
                      <span>🛡️ HOBBY ACCESSORIES</span>
                      <span className="text-[8px] bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 px-1.5 rounded uppercase font-bold">LIVE</span>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono font-bold">
                      <button
                        onClick={() => handleGeneralCategorySelect('accessories')}
                        className="w-full text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] p-2 rounded transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>Trading Card Protectors</span>
                        <span className="text-[8px] text-emerald-500 font-bold">IN STOCK</span>
                      </button>
                      <button
                        onClick={() => handleGeneralCategorySelect('accessories')}
                        className="w-full text-left bg-[#18181c] border border-white/5 hover:border-[#e60012]/40 text-gray-300 hover:text-white text-[9px] p-2 rounded transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>Figurine Protectors & Acrylics</span>
                        <span className="text-[8px] text-emerald-500 font-bold">IN STOCK</span>
                      </button>
                    </div>
                  </div>

                  {/* Wholesale / Custom order hint */}
                  <div className="border border-white/5 bg-[#18181c] rounded-lg p-2.5 text-[9px] text-gray-400 font-mono leading-relaxed space-y-1">
                    <div className="text-white hover:text-[#e60012] transition-colors font-bold uppercase block">⚡ DIRECT SHIP CHANNELS</div>
                    <p>All items undergo video-recorded double archival packaging prior to premium Tokyo / air transit departures.</p>
                  </div>

                </div>
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
            
            {/* Cart trigger button</h1> */}
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

          {/* Expandable TCG block */}
          <div className="border-t border-white/5 pt-3 pl-2">
            <button 
              onClick={() => setMobileTcgOpen(!mobileTcgOpen)}
              className="w-full text-left font-mono text-xs font-bold text-white flex items-center justify-between py-1.5 uppercase"
            >
              <span>⚡ TRADING CARD GAMES</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileTcgOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileTcgOpen && (
              <div className="grid grid-cols-2 gap-2 mt-2 pr-3 pl-2">
                <button onClick={() => handleTcgSelect('pokemon')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Pokémon TCG</button>
                <button onClick={() => handleTcgSelect('onepiece')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ One Piece TCG</button>
                <button onClick={() => handleTcgSelect('mtg', 'EN')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Magic (MTG)</button>
                <button onClick={() => handleTcgSelect('yugioh')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Yu-Gi-Oh!</button>
                <button onClick={() => handleTcgSelect('weiss-schwarz')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Weiss Schwarz</button>
                <button onClick={() => handleTcgSelect('lorcana')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Lorcana</button>
              </div>
            )}
          </div>

          {/* Expandable Figures block */}
          <div className="border-t border-white/5 pt-2 pl-2">
            <button 
              onClick={() => setMobileFiguresOpen(!mobileFiguresOpen)}
              className="w-full text-left font-mono text-xs font-bold text-white flex items-center justify-between py-1.5 uppercase"
            >
              <span>👾 FIGURES & PLUSHIES</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileFiguresOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileFiguresOpen && (
              <div className="grid grid-cols-2 gap-2 mt-2 pr-3 pl-2">
                <button onClick={() => handleFigureSelect('banpresto')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Banpresto</button>
                <button onClick={() => handleFigureSelect('kotobukiya')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Kotobukiya</button>
                <button onClick={() => handleFigureSelect('bandai')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Bandai</button>
                <button onClick={() => handleFigureSelect('good-smile')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Good Smile</button>
                <button onClick={() => handleFigureSelect('funko')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Funko Pops</button>
                <button onClick={() => handleFigureSelect('plushies')} className="text-left text-[11px] font-mono p-1 text-gray-300 hover:text-white">+ Plushies</button>
              </div>
            )}
          </div>

          {/* Expandable Manga/Comics block */}
          <div className="border-t border-white/5 pt-2 pl-2">
            <button 
              onClick={() => setMobileMangaOpen(!mobileMangaOpen)}
              className="w-full text-left font-mono text-xs font-bold text-white flex items-center justify-between py-1.5 uppercase"
            >
              <span>📖 MANGA & GRAPHICS</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileMangaOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileMangaOpen && (
              <div className="flex flex-col gap-1.5 mt-2 pr-3 pl-2">
                <button onClick={() => handleGeneralCategorySelect('manga')} className="text-left text-[11px] font-mono p-1 text-gray-400 hover:text-white flex items-center justify-between">
                  <span>+ Manga & Light Novels</span>
                  <span className="text-[7px] border border-white/10 px-1 py-0.1 text-gray-500 rounded font-bold">SOON</span>
                </button>
                <button onClick={() => handleGeneralCategorySelect('comic-books')} className="text-left text-[11px] font-mono p-1 text-gray-400 hover:text-white flex items-center justify-between">
                  <span>+ Comic Books</span>
                  <span className="text-[7px] border border-white/10 px-1 py-0.1 text-gray-500 rounded font-bold">SOON</span>
                </button>
              </div>
            )}
          </div>

          {/* General category links - Accessories */}
          <div className="border-t border-white/5 pt-2 pl-2">
            <button 
              onClick={() => handleGeneralCategorySelect('accessories')}
              className="w-full text-left font-mono text-xs font-bold text-white flex items-center justify-between py-1.5 uppercase"
            >
              <span>🛡️ HOBBY ACCESSORIES</span>
              <span className="text-[8px] bg-[#10b981]/15 text-[#10b981] px-1.5 py-0.25 rounded">LIVE</span>
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
