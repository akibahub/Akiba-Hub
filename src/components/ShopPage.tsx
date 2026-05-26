import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, ANIME_CATEGORIES } from '../data';
import { Product } from '../types';
import { Search, SlidersHorizontal, ShoppingCart, Star, HelpCircle, Eye, Check, X, Sparkles, Filter, ShieldCheck, ChevronRight } from 'lucide-react';

export function ShopPage() {
  const {
    addToCart,
    selectedCategory,
    selectedAnime,
    selectedSubCategory,
    selectedLanguage,
    selectedProductLine,
    setAdvancedFilters,
    setCategoryAndGroup,
    cart
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating-desc'>('default');
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Matches active category
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // 2. Matches active subCategory (manufacturer or TCG game name)
      const matchSubCategory =
        !selectedSubCategory || product.subCategory === selectedSubCategory;

      // 3. Matches active language (for TCGs)
      const matchLanguage =
        !selectedLanguage || product.language === selectedLanguage;

      // 4. Matches active product line (for Figures)
      const matchProductLine =
        !selectedProductLine || product.productLine === selectedProductLine;

      // 5. Matches active anime filter (primarily figure filtering)
      const matchAnime =
        selectedCategory !== 'anime-figures' ||
        selectedAnime === 'All Anime' ||
        product.anime === selectedAnime;

      // 6. Matches search query (comprehensive indexer: anime, character name, franchise, subCat, prodLine, etc.)
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.anime && product.anime.toLowerCase().includes(query)) ||
        (product.character && product.character.toLowerCase().includes(query)) ||
        (product.franchise && product.franchise.toLowerCase().includes(query)) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(query)) ||
        (product.productLine && product.productLine.toLowerCase().includes(query));

      return matchCategory && matchSubCategory && matchLanguage && matchProductLine && matchAnime && matchSearch;
    });
  }, [selectedCategory, selectedSubCategory, selectedLanguage, selectedProductLine, selectedAnime, searchQuery]);

  // Sort products
  const sortedAndFilteredProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating-desc') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    
    // DEFAULT sorting: Anime Figures first, then Alphabetically by name
    return list.sort((a, b) => {
      const aIsFigure = a.category === 'anime-figures';
      const bIsFigure = b.category === 'anime-figures';
      if (aIsFigure && !bIsFigure) return -1;
      if (!aIsFigure && bIsFigure) return 1;
      // alphabetical
      return a.name.localeCompare(b.name);
    });
  }, [filteredProducts, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  // Helper labels for category text values
  const categoryHeaderTitle = useMemo(() => {
    if (selectedCategory === 'all') return 'All Tokyo Collectibles';
    if (selectedCategory === 'trading-cards') {
      if (selectedSubCategory) {
        const gameLabel = selectedSubCategory.toUpperCase().replace('-', ' ');
        const langLabel = selectedLanguage ? ` (${selectedLanguage})` : '';
        return `${gameLabel} TCG${langLabel}`;
      }
      return 'Trading Card Games';
    }
    if (selectedCategory === 'anime-figures') {
      if (selectedSubCategory) {
        const lineLabel = selectedProductLine ? ` [${selectedProductLine}]` : '';
        return `${selectedSubCategory.toUpperCase()}${lineLabel} Figures`;
      }
      return `${selectedAnime} Figures`;
    }
    if (selectedCategory === 'accessories') return 'Hobby Accessories';
    return 'Collectibles';
  }, [selectedCategory, selectedSubCategory, selectedLanguage, selectedProductLine, selectedAnime]);

  const handleCategoryNav = (catId: string) => {
    // reset drilldowns upon picking main category
    setAdvancedFilters({
      category: catId,
      subCategory: null,
      language: null,
      productLine: null,
      anime: 'All Anime'
    });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#070707]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Holographic Banner Section */}
        <div className="relative mb-10 p-8 rounded-xl bg-[#121215]/95 border border-[#e60012]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-[#e60012]/5 rounded-full filter blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#e60012]/15 border border-[#e60012] text-white px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(230,0,18,0.15)]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AKIHABARA CORE SEEDING
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-widest uppercase">
              {categoryHeaderTitle}
            </h1>
          </div>

          <div className="flex items-center justify-center relative bg-[#18181c] border border-white/10 p-5 rounded-lg flex-shrink-0">
            <div className="text-center font-mono">
              <div className="text-[10px] text-[#e60012] uppercase tracking-widest font-bold">MATCHING LOGITEMS</div>
              <div className="text-4xl font-extrabold text-white mt-1">{sortedAndFilteredProducts.length}</div>
              <div className="text-[9px] text-gray-400 font-bold mt-1.5 uppercase">Authentic Seals Direct</div>
            </div>
          </div>
        </div>

        {/* Categories, Anime Filter, Search, Sort Options */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar category filters (Desktop) */}
          <div className="p-6 bg-[#121215] border border-white/10 rounded-xl h-fit space-y-6 shadow-xl">
            
            {/* MAIN CATEGORIES Accordion List */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e60012] mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                <Filter className="w-4 h-4 text-[#e60012]" /> MASTER CATEGORY
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'all', name: 'All Collectibles' },
                  { id: 'trading-cards', name: 'Trading Card Games' },
                  { id: 'anime-figures', name: 'Figures & Plushies' },
                  { id: 'comic-books', name: 'Comic Books 📚', status: 'soon' },
                  { id: 'manga', name: 'Manga / Novels 📖', status: 'soon' },
                  { id: 'accessories', name: 'Hobby Accessories 🛡️' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryNav(cat.id)}
                    className={`w-full text-left px-4 py-2.5 rounded text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer border ${
                      selectedCategory === cat.id
                        ? 'bg-[#e60012] border-[#e60012] text-white shadow-[0_0_10px_rgba(230,0,18,0.35)] font-black'
                        : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white hover:bg-[#e60012]/10'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.status === 'soon' ? (
                      <span className="text-[7px] border border-white/10 px-1 py-0.25 rounded text-gray-500 font-bold uppercase">SOON</span>
                    ) : (
                      selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* NESTED FILTER 1: TRADING CARD GAMES SUB-CATEGORIES */}
            {selectedCategory === 'trading-cards' && (
              <div className="border-t border-white/5 pt-5 space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white mb-3">
                    // CHOOSE TCG GAME
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'pokemon', name: 'Pokémon' },
                      { id: 'onepiece', name: 'One Piece' },
                      { id: 'yugioh', name: 'Yu-Gi-Oh!' },
                      { id: 'weiss-schwarz', name: 'Weiss Schwarz' },
                      { id: 'mtg', name: 'Magic (MTG)' },
                      { id: 'lorcana', name: 'Lorcana' },
                      { id: 'digimon', name: 'Digimon' },
                      { id: 'rift-bound', name: 'Rift Bound' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          setAdvancedFilters({
                            subCategory: selectedSubCategory === g.id ? null : g.id,
                            language: null // reset language filter on new game click
                          });
                        }}
                        className={`text-[9px] font-mono p-1.5 font-bold rounded border text-left flex items-center justify-between transition-colors uppercase ${
                          selectedSubCategory === g.id
                            ? 'bg-white/10 border-white text-white'
                            : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{g.name}</span>
                        {selectedSubCategory === g.id && <ChevronRight className="w-3 h-3 text-[#e60012]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-language filter dynamically bounded by user instructions */}
                {selectedSubCategory && (
                  <div className="pt-2 border-t border-white/5">
                    <h5 className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Language Selector:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => setAdvancedFilters({ language: null })}
                        className={`text-[9px] font-bold px-2 py-1 rounded border ${
                          !selectedLanguage 
                            ? 'bg-[#e60012]/10 border-[#e60012] text-[#e60012]'
                            : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        All
                      </button>
                      
                      {/* Determine allowed language options */}
                      {(selectedSubCategory === 'pokemon' 
                        ? ['EN', 'JP', 'CN', 'KR', 'Other']
                        : selectedSubCategory === 'onepiece'
                        ? ['EN', 'JP', 'KR']
                        : (selectedSubCategory === 'weiss-schwarz' || selectedSubCategory === 'yugioh')
                        ? ['EN', 'JP']
                        : ['EN'] // others: english only
                      ).map(lang => (
                        <button
                          key={lang}
                          onClick={() => setAdvancedFilters({ language: lang })}
                          className={`text-[9px] font-bold px-2 py-1 rounded border ${
                            selectedLanguage === lang
                              ? 'bg-[#e60012]/10 border-[#e60012] text-[#e60012]'
                              : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    {['pokemon', 'onepiece', 'weiss-schwarz', 'yugioh'].indexOf(selectedSubCategory) === -1 && (
                      <span className="text-[8px] text-gray-400 font-mono mt-1 block">
                        * English print editions only
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* NESTED FILTER 2: ANIME FIGURES & MANUFACTURERS FILTERS */}
            {selectedCategory === 'anime-figures' && (
              <div className="border-t border-white/5 pt-5 space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white mb-3">
                    // MANUFACTURERS
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'banpresto', name: 'Banpresto' },
                      { id: 'kotobukiya', name: 'Kotobukiya' },
                      { id: 'bandai', name: 'Bandai Spirits' },
                      { id: 'good-smile', name: 'Good Smile Company' },
                      { id: 'funko', name: 'Funko Pops' },
                      { id: 'plushies', name: 'Official Plushies' }
                    ].map((mfg) => (
                      <button
                        key={mfg.id}
                        onClick={() => {
                          setAdvancedFilters({
                            subCategory: selectedSubCategory === mfg.id ? null : mfg.id,
                            productLine: null // reset product lines on click
                          });
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded transition-all cursor-pointer font-mono font-bold flex items-center justify-between border ${
                          selectedSubCategory === mfg.id
                            ? 'bg-white/10 text-white border-white'
                            : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{mfg.name}</span>
                        {selectedSubCategory === mfg.id && <span className="w-1.5 h-1.5 rounded-full bg-[#e60012]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-product line options */}
                {selectedSubCategory && (
                  <div className="pt-2 border-t border-white/5">
                    <h5 className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Famous Series Line:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => setAdvancedFilters({ productLine: null })}
                        className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border ${
                          !selectedProductLine 
                            ? 'bg-[#e60012]/15 border-[#e60012] text-[#e60012]'
                            : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        All Lines
                      </button>

                      {(selectedSubCategory === 'banpresto'
                        ? ['Ichibansho', 'Grandline Series', 'Vibration Stars']
                        : selectedSubCategory === 'kotobukiya'
                        ? ['ARTFX J', 'Bishoujo Statue']
                        : selectedSubCategory === 'bandai'
                        ? ['S.H.Figuarts', 'Figuarts ZERO']
                        : selectedSubCategory === 'good-smile'
                        ? ['Nendoroid', 'figma', 'POP UP PARADE']
                        : selectedSubCategory === 'funko'
                        ? ['Funko Pop!']
                        : ['Plushies']
                      ).map(pLine => (
                        <button
                          key={pLine}
                          onClick={() => setAdvancedFilters({ productLine: pLine })}
                          className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border ${
                            selectedProductLine === pLine
                              ? 'bg-[#e60012]/15 border-[#e60012] text-[#e60012]'
                              : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          {pLine}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Anime Series list */}
                <div className="pt-2 border-t border-white/5">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#e60012] mb-3">
                    // FILTER BY ANIME
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    {ANIME_CATEGORIES.map((animeName) => (
                      <button
                        key={animeName}
                        onClick={() => setCategoryAndGroup('anime-figures', animeName)}
                        className={`w-full text-left px-3.5 py-1.5 text-xs rounded transition-all cursor-pointer font-mono font-bold flex items-center justify-between ${
                          selectedAnime === animeName
                            ? 'bg-white/5 text-white border-l-2 border-[#e60012] pl-2 font-black'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>- {animeName}</span>
                        {selectedAnime === animeName && (
                          <span className="w-1 h-3 bg-[#e60012]"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-white/5 pt-5 text-center bg-[#18181c] p-3.5 rounded border border-white/5">
              <ShieldCheck className="w-6 h-6 text-[#10b981] mx-auto opacity-80" />
              <p className="text-[10px] text-gray-300 leading-normal mt-1.5 font-sans font-semibold">
                Akiba Hub Guarantee: 100% video-recorded unboxing verification and double seal customs audit prior to air cargo departure.
              </p>
            </div>
          </div>

          {/* Product list grid panel */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search and Sort panel */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#121215] border border-white/10 rounded-xl shadow-xl">
              {/* Search bar inputs */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by Character, Anime or Franchise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#18181c] border border-white/10 focus:border-[#e60012] rounded px-4 py-2 pl-10 text-xs font-semibold text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#e60012] font-mono transition-all"
                />
              </div>

              {/* Sorting options */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-right font-mono text-xs">
                <span className="text-gray-400 font-bold flex items-center gap-1.5 font-sans">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#e60012]" /> DEPARTURE SORT:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#18181c] border border-white/10 text-xs font-bold rounded px-3 py-2 text-white focus:outline-none focus:border-[#e60012] cursor-pointer transition-all"
                >
                  <option value="default">Default Sort (Figures First)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated Outlets</option>
                </select>
              </div>
            </div>

            {/* Catalog Grid list */}
            {sortedAndFilteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#121215] border border-white/10 rounded-2xl p-8 shadow-xl space-y-2">
                <span className="text-4xl animate-pulse block">📦</span>
                <h3 className="text-sm font-mono font-bold tracking-widest text-[#e60012] uppercase">
                  Items are currently being imported
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAndFilteredProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="group relative bg-[#121215] border border-white/10 hover:border-[#e60012]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_0_15px_rgba(230,0,18,0.15)]"
                    >
                      
                      {/* Product display thumbnail image */}
                      <div className="relative aspect-4/3 overflow-hidden bg-slate-950 border-b border-white/5">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-102 transition-all duration-500"
                        />

                        {/* Badging overlay */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 inline-flex font-mono">
                          <span className="bg-slate-950 border border-white/20 text-gray-300 text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-wider">
                            {product.category.replace('-', ' ')}
                          </span>
                          {product.subCategory && (
                            <span className="bg-slate-950 border border-[#e60012]/40 text-[#e60012] font-semibold text-[8px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                              {product.subCategory}
                            </span>
                          )}
                          {product.language && (
                            <span className="bg-white text-slate-950 font-bold text-[8px] px-1.5 rounded w-fit text-center font-mono self-start mt-0.5">
                              {product.language}
                            </span>
                          )}
                        </div>

                        {/* Rating overlay badge */}
                        <div className="absolute top-3 right-3 z-10 bg-[#121215]/95 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[8px] font-mono font-bold flex items-center gap-1 border border-white/10 shadow-sm">
                          <Star className="w-2.5 h-2.5 fill-[#e60012] stroke-[#e60012]" />
                          {product.rating.toFixed(1)}
                        </div>

                        {/* Quick View trigger button overlay on hover */}
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                          <button
                            id={`quick-view-${product.id}`}
                            onClick={() => setSelectedQuickView(product)}
                            className="bg-transparent text-white border border-white hover:bg-white hover:text-slate-950 px-4 py-2 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all cursor-pointer pointer-events-auto flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            QUICK VIEW
                          </button>
                        </div>
                      </div>

                      {/* Content details and buy control button */}
                      <div className="p-4 flex-1 flex flex-col justify-between bg-[#121215]">
                        <div className="space-y-1.5 text-left">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {product.anime && (
                              <span className="text-[9px] font-bold text-[#e60012] font-mono">
                                // {product.anime.toUpperCase()}
                              </span>
                            )}
                            {product.productLine && (
                              <span className="text-[8px] font-semibold text-gray-400 font-mono border border-white/10 px-1 py-0.25 rounded uppercase">
                                {product.productLine}
                              </span>
                            )}
                            {product.cardsPerPack && (
                              <span className="text-[9px] font-bold text-white font-mono border border-white/25 px-1 py-0.25 rounded">
                                {product.cardsPerPack} CARDS
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-xs font-bold text-white font-sans tracking-tight line-clamp-2 min-h-[32px] group-hover:text-[#e60012] transition-colors leading-relaxed">
                            {product.name}
                          </h3>
                        </div>

                        <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between font-mono">
                          <div className="flex flex-col text-left">
                            <span className="text-[8px] text-gray-500 font-bold leading-none uppercase">AUTHENTIC</span>
                            <span className="text-sm font-bold text-white leading-none mt-1">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>

                          <button
                            id={`buy-button-${product.id}`}
                            onClick={() => handleAddToCart(product)}
                            className={`px-4 py-2 rounded font-mono font-bold text-[10px] tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
                              justAddedId === product.id
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold animate-pulse'
                                : 'bg-transparent border-[#e60012] text-[#e60012] hover:bg-[#e60012] hover:text-white shadow-[0_0_8px_rgba(230,0,18,0.1)] hover:shadow-[0_0_15px_rgba(230,0,18,0.45)]'
                            }`}
                          >
                            {justAddedId === product.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                ADDED!
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                BUY
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Quick view modal */}
      {selectedQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#000]/90 backdrop-blur-md" onClick={() => setSelectedQuickView(null)} />
          
          <div className="relative w-full max-w-2xl bg-[#121215] border border-white/10 rounded-xl overflow-hidden p-6 shadow-[0_0_35px_rgba(0,0,0,0.8)] z-10 flex flex-col md:flex-row gap-6 text-white text-left">
            
            {/* Close button */}
            <button
              id="close-quickview"
              onClick={() => setSelectedQuickView(null)}
              className="absolute top-4 right-4 p-1 rounded bg-[#18181c] hover:bg-[#e60012] hover:text-white text-white border border-white/10 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* left column layout image */}
            <div className="w-full md:w-1/2 aspect-square rounded-lg bg-slate-950 border border-white/5 overflow-hidden flex-shrink-0 relative">
              <img
                src={selectedQuickView.image}
                alt={selectedQuickView.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95"
              />
              <span className="absolute bottom-3 left-3 bg-[#121215] border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono text-white font-bold">
                In Stock: {selectedQuickView.stock}
              </span>
            </div>

            {/* right column details info */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  <span className="text-[9px] bg-[#18181c] border border-[#e60012]/40 text-[#e60012] px-2.5 py-0.5 rounded uppercase font-bold">
                    {selectedQuickView.category.replace('-', ' ').toUpperCase()}
                  </span>
                  {selectedQuickView.subCategory && (
                    <span className="text-[9px] bg-[#18181c] border border-white/30 text-white px-2.5 py-0.5 rounded uppercase font-bold">
                      {selectedQuickView.subCategory}
                    </span>
                  )}
                  {selectedQuickView.anime && (
                    <span className="text-[9px] bg-[#18181c] border border-white/20 text-white px-2 py-0.5 rounded font-bold uppercase">
                      {selectedQuickView.anime}
                    </span>
                  )}
                  {selectedQuickView.productLine && (
                    <span className="text-[9px] bg-[#18181c] border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">
                      {selectedQuickView.productLine}
                    </span>
                  )}
                </div>

                <h2 className="text-md md:text-lg font-display font-medium text-white tracking-widest uppercase leading-snug">
                  {selectedQuickView.name}
                </h2>

                <div className="flex items-center gap-4 text-xs font-bold font-mono">
                  <span className="text-[#e60012] font-black text-xl">${selectedQuickView.price.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-400 font-medium">Est Release: {selectedQuickView.releaseYear}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-sans font-medium">
                  {selectedQuickView.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-[10px] font-mono text-white font-bold uppercase tracking-wider mb-2">PRODUCT SPEC DETAILS</h4>
                  <ul className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-300">
                    <li className="bg-[#18181c] p-1.5 rounded border border-white/5">🌟 Authenticity Inspected</li>
                    <li className="bg-[#18181c] p-1.5 rounded border border-white/5">📦 Factory Sealed & Untampered</li>
                    {selectedQuickView.cardsPerPack && (
                      <li className="bg-[#18181c] p-1.5 rounded border border-white/5">🃏 Total Cards: {selectedQuickView.cardsPerPack}</li>
                    )}
                    {selectedQuickView.character && (
                      <li className="bg-[#18181c] p-1.5 rounded border border-white/5">👤 Hero: {selectedQuickView.character}</li>
                    )}
                    <li className="bg-[#18181c] p-1.5 rounded border border-white/5">🛡️ Ultimate Collector Packaging</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-3 font-mono">
                <button
                  id={`quick-add-${selectedQuickView.id}`}
                  onClick={() => {
                    handleAddToCart(selectedQuickView);
                    setSelectedQuickView(null);
                  }}
                  className="flex-1 py-3 bg-[#e60012] hover:bg-[#ff1e27] text-white text-xs font-bold rounded border border-[#e60012] tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(230,0,18,0.35)]"
                >
                  <ShoppingCart className="w-4 h-4" /> ADD TO SHOPPING CART
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
