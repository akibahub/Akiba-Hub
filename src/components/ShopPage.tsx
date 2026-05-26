import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, ANIME_CATEGORIES } from '../data';
import { Product } from '../types';
import { Search, SlidersHorizontal, ShoppingCart, Star, HelpCircle, Eye, Check, X, Sparkles, Filter } from 'lucide-react';

export function ShopPage() {
  const {
    addToCart,
    selectedCategory,
    setCategoryAndGroup,
    selectedAnime,
    cart
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating-desc'>('default');
  const [setSelectedQuickView, setSetSelectedQuickView] = useState<Product | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Matches active category
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // 2. Matches active anime filter if looking at action-fig category
      const matchAnime =
        selectedCategory !== 'action-fig' ||
        selectedAnime === 'All Anime' ||
        product.anime === selectedAnime;

      // 3. Matches search query
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.anime && product.anime.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchAnime && matchSearch;
    });
  }, [selectedCategory, selectedAnime, searchQuery]);

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
    return list;
  }, [filteredProducts, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  // Helper labels for category text values
  const categoryHeaderTitle = useMemo(() => {
    switch (selectedCategory) {
      case 'pokemon-english': return 'Pokémon Packs (English TCG)';
      case 'pokemon-japanese': return 'Pokémon Packs (Japanese TCG)';
      case 'onepiece-english': return 'One Piece (English TCG)';
      case 'onepiece-japanese': return 'One Piece (Japanese TCG)';
      case 'action-fig': return `${selectedAnime} Figures`;
      default: return 'All Collectibles';
    }
  }, [selectedCategory, selectedAnime]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#070707]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Holographic Banner Section */}
        <div className="relative mb-10 p-8 rounded-xl bg-[#121215]/95 border border-[#e60012]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-[#e60012]/5 rounded-full filter blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#e60012]/15 border border-[#e60012] text-white px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(230,0,18,0.15)]">
              <Sparkles className="w-3.5 h-3.5" /> TOKYO DIRECT IMPORT
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-widest uppercase">
              {categoryHeaderTitle}
            </h1>
            <p className="text-xs text-gray-300 max-w-xl font-medium">
              Browse our hand-picked selection of authentic sealed trading card packs and detailed scale PVC figures. Every item is guaranteed untampered and sourced direct from trusted publishers.
            </p>
          </div>

          <div className="flex items-center justify-center relative bg-[#18181c] border border-white/10 p-5 rounded-lg flex-shrink-0">
            <div className="text-center font-mono">
              <div className="text-[10px] text-[#e60012] uppercase tracking-widest font-bold">AVAILABLE ITEMS</div>
              <div className="text-4xl font-extrabold text-white mt-1">{sortedAndFilteredProducts.length}</div>
              <div className="text-[9px] text-[#e60012] font-bold mt-1.5">EXPRESS AIR SHIPPED GLOBAL</div>
            </div>
          </div>
        </div>

        {/* Categories, Anime Filter, Search, Sort Options */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar category filters (Desktop) */}
          <div className="p-6 bg-[#121215] border border-white/10 rounded-xl h-fit space-y-6 shadow-xl">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e60012] mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                <Filter className="w-4 h-4 text-[#e60012]" /> CATEGORIES
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'all', name: 'All Collectibles' },
                  { id: 'pokemon-english', name: 'Pokémon English packs' },
                  { id: 'pokemon-japanese', name: 'Pokémon Japanese packs' },
                  { id: 'onepiece-english', name: 'One Piece English TCG' },
                  { id: 'onepiece-japanese', name: 'One Piece Japanese TCG' },
                  { id: 'action-fig', name: 'Anime figures' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryAndGroup(cat.id, 'All Anime')}
                    className={`w-full text-left px-4 py-2.5 rounded text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer border ${
                      selectedCategory === cat.id
                        ? 'bg-[#e60012] border-[#e60012] text-white shadow-[0_0_10px_rgba(230,0,18,0.35)] font-black'
                        : 'bg-[#18181c] border-white/5 text-gray-400 hover:text-white hover:bg-[#e60012]/10'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-categorization for anime figures only */}
            {selectedCategory === 'action-fig' && (
              <div className="border-t border-white/5 pt-5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#e60012] mb-3">
                  FILTER BY ANIME
                </h4>
                <div className="flex flex-col gap-1.5">
                  {ANIME_CATEGORIES.map((animeName) => (
                    <button
                      key={animeName}
                      onClick={() => setCategoryAndGroup('action-fig', animeName)}
                      className={`w-full text-left px-3.5 py-2 text-xs rounded transition-all cursor-pointer font-mono font-bold flex items-center justify-between ${
                        selectedAnime === animeName
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>- {animeName}</span>
                      {selectedAnime === animeName && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_5px_#e60012]"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-white/5 pt-5 text-center bg-[#18181c] p-3.5 rounded border border-white/5">
              <span className="text-xl">📦</span>
              <p className="text-[10px] text-gray-400 leading-normal mt-1.5 font-sans font-semibold">
                Interested in full booster boxes or factory-sealed cases? Contact our customer support team for wholesale rates and custom requests.
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
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#18181c] border border-white/10 focus:border-[#e60012] rounded px-4 py-2 pl-10 text-xs font-semibold text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#e60012] font-mono transition-all"
                />
              </div>

              {/* Sorting options */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-right font-mono text-xs">
                <span className="text-gray-400 font-bold flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#e60012]" /> SORT BY:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#18181c] border border-white/10 text-xs font-bold rounded px-3 py-2 text-white focus:outline-none focus:border-[#e60012] cursor-pointer transition-all"
                >
                  <option value="default">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Catalog Grid list */}
            {sortedAndFilteredProducts.length === 0 ? (
              PRODUCTS.length === 0 ? (
                <div className="py-20 text-center bg-[#121215] border border-[#e60012]/30 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
                  <div className="inline-flex items-center justify-center p-3.5 bg-[#e60012]/15 border border-[#e60012] text-white rounded-full mb-5 animate-pulse">
                    <Sparkles className="w-8 h-8 text-[#e60012]" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono tracking-wider uppercase mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white">
                    STOCK CURRENTLY BEING IMPORTED
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-md mx-auto font-sans font-medium">
                    Our direct pipeline from Akihabara and Tokyo logistics hubs is currently active! We are importing brand new batches of factory-sealed Pokémon and One Piece booster packs, along with premium scale PVC figures.
                  </p>
                  <div className="mt-6 flex flex-col items-center justify-center gap-2">
                    <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#e60012]/10 border border-[#e60012]/30 rounded text-[10px] font-mono font-bold text-[#e60012]">
                      <span className="w-2 h-2 rounded-full bg-[#e60012] animate-ping"></span>
                      IMPORT IN PROGRESS // CUSTOMS VERIFICATION
                    </div>
                    <span className="text-[9px] text-gray-500 font-mono font-bold mt-1">
                      Check back shortly for premium, unweighed mint stock uploads.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center bg-[#121215] border-2 border-dashed border-white/10 rounded-2xl p-6 shadow-xl">
                  <SlidersHorizontal className="w-12 h-12 text-gray-500 mx-auto opacity-70 mb-3" />
                  <h3 className="text-md font-bold text-white font-mono">No collectibles match search parameters</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                    Adjust filter metrics or search query to find registered collectibles in Tokyo HQ.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryAndGroup('all');
                    }}
                    className="mt-6 px-4 py-2 bg-[#e60012] text-white rounded font-mono text-xs font-bold tracking-widest shadow-[0_0_12px_rgba(230,0,18,0.35)] cursor-pointer hover:bg-[#ff1e27] transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )
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
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 font-mono">
                          {product.category === 'pokemon-english' && (
                            <span className="bg-slate-950 border border-white/20 text-white font-bold text-[8px] px-2 py-0.5 rounded shadow">
                              POKÉMON EN
                            </span>
                          )}
                          {product.category === 'pokemon-japanese' && (
                            <span className="bg-slate-950 border border-[#e60012]/40 text-[#e60012] font-bold text-[8px] px-2 py-0.5 rounded shadow">
                              POKÉMON JPN
                            </span>
                          )}
                          {product.category === 'onepiece-english' && (
                            <span className="bg-slate-950 border border-white/20 text-white font-bold text-[8px] px-2 py-0.5 rounded shadow">
                              ONE PIECE EN
                            </span>
                          )}
                          {product.category === 'onepiece-japanese' && (
                            <span className="bg-slate-950 border border-[#e60012]/40 text-[#e60012] font-bold text-[8px] px-2 py-0.5 rounded shadow">
                              ONE PIECE JPN
                            </span>
                          )}
                          {product.category === 'action-fig' && (
                            <span className="bg-slate-950 border border-white/30 text-white font-bold text-[8px] px-2 py-0.5 rounded shadow">
                              SCALE PVC
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
                            onClick={() => setSetSelectedQuickView(product)}
                            className="bg-transparent text-white border border-white hover:bg-white hover:text-slate-950 px-4 py-2 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all cursor-pointer pointer-events-auto flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            QUICK VIEW
                          </button>
                        </div>
                      </div>

                      {/* Content details and buy control button */}
                      <div className="p-4 flex-1 flex flex-col justify-between bg-[#121215]">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            {product.anime && (
                              <span className="text-[10px] font-bold text-[#e60012] font-mono">
                                // {product.anime.toUpperCase()}
                              </span>
                            )}
                            {product.cardsPerPack && (
                              <span className="text-[9px] font-bold text-white font-mono border border-white/25 px-1 py-0.25 rounded">
                                {product.cardsPerPack} CARDS
                              </span>
                            )}
                            <span className="text-[9px] text-gray-500 font-mono font-bold ml-auto">
                              EST: {product.releaseYear}
                            </span>
                          </div>
                          
                          <h3 className="text-xs font-bold text-white font-sans tracking-tight line-clamp-2 min-h-[32px] group-hover:text-[#e60012] transition-colors leading-relaxed">
                            {product.name}
                          </h3>
                        </div>

                        <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between font-mono">
                          <div className="flex flex-col">
                            <span className="text-[8px] text-gray-500 font-bold leading-none uppercase font-mono">AUTHENTIC</span>
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
      {setSelectedQuickView && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#000]/90 backdrop-blur-md" onClick={() => setSetSelectedQuickView(null)} />
          
          <div className="relative w-full max-w-2xl bg-[#121215] border border-white/10 rounded-xl overflow-hidden p-6 shadow-[0_0_35px_rgba(0,0,0,0.8)] z-10 flex flex-col md:flex-row gap-6 text-white text-left">
            
            {/* Close button */}
            <button
              id="close-quickview"
              onClick={() => setSetSelectedQuickView(null)}
              className="absolute top-4 right-4 p-1 rounded bg-[#18181c] hover:bg-[#e60012] hover:text-white text-white border border-white/10 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* left column layout image */}
            <div className="w-full md:w-1/2 aspect-square rounded-lg bg-slate-950 border border-white/5 overflow-hidden flex-shrink-0 relative">
              <img
                src={setSelectedQuickView.image}
                alt={setSelectedQuickView.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95"
              />
              <span className="absolute bottom-3 left-3 bg-[#121215] border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono text-white font-bold">
                In Stock: {setSelectedQuickView.stock}
              </span>
            </div>

            {/* right column details info */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[9px] bg-[#18181c] border border-[#e60012]/40 text-[#e60012] px-2.5 py-0.5 rounded uppercase font-bold">
                    {setSelectedQuickView.category.replace('onepiece', 'One Piece').replace('pokemon', 'Pokémon').toUpperCase()}
                  </span>
                  {setSelectedQuickView.anime && (
                    <span className="text-[9px] bg-[#18181c] border border-white/20 text-white px-2.5 py-0.5 rounded font-bold">
                      {setSelectedQuickView.anime.toUpperCase()}
                    </span>
                  )}
                </div>

                <h2 className="text-md md:text-lg font-display font-medium text-white tracking-widest uppercase leading-snug">
                  {setSelectedQuickView.name}
                </h2>

                <div className="flex items-center gap-4 text-xs font-bold font-mono">
                  <span className="text-[#e60012] font-black text-xl">${setSelectedQuickView.price.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-400 font-medium">Est Release: {setSelectedQuickView.releaseYear}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-sans font-medium">
                  {setSelectedQuickView.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-[10px] font-mono text-white font-bold uppercase tracking-wider mb-2">PRODUCT HIGHLIGHTS</h4>
                  <ul className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-300">
                    <li className="bg-[#18181c] p-1.5 rounded border border-white/5">🌟 Holofoil Probability: ~33%</li>
                    <li className="bg-[#18181c] p-1.5 rounded border border-white/5">📦 Factory Sealed & Untampered</li>
                    {setSelectedQuickView.cardsPerPack && (
                      <li className="bg-[#18181c] p-1.5 rounded border border-white/5">🃏 Total Cards: {setSelectedQuickView.cardsPerPack}</li>
                    )}
                    <li className="bg-[#18181c] p-1.5 rounded border border-white/5">🛡️ Ultimate Collector Packaging</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-3 font-mono">
                <button
                  id={`quick-add-${setSelectedQuickView.id}`}
                  onClick={() => {
                    handleAddToCart(setSelectedQuickView);
                    setSetSelectedQuickView(null);
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
