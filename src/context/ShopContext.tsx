import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ShippingDetails } from '../types';

interface ShopContextType {
  products: Product[];
  loadingProducts: boolean;
  productsError: string | null;
  cart: CartItem[];
  isCartOpen: boolean;
  activeView: 'landing' | 'shop' | 'checkout' | 'order-success';
  selectedCategory: string; // 'all' | 'anime-figures' | 'trading-cards' | 'comic-books' | 'manga' | 'accessories'
  selectedAnime: string; // 'All Anime' or specific series name
  selectedSubCategory: string | null; // e.g., 'pokemon', 'onepiece', 'banpresto', etc.
  selectedLanguage: string | null; // e.g., 'EN', 'JP', 'CN', 'KR', 'Other'
  selectedProductLine: string | null; // e.g., 'Ichibansho', 'Nendoroid', etc.
  comingSoonCategory: string | null;
  setComingSoonCategory: (cat: string | null) => void;
  currentOrder: Order | null;
  setCartOpen: (open: boolean) => void;
  setView: (view: 'landing' | 'shop' | 'checkout' | 'order-success') => void;
  setCategoryAndGroup: (category: string, anime?: string) => void;
  setAdvancedFilters: (filters: {
    category?: string;
    subCategory?: string | null;
    language?: string | null;
    productLine?: string | null;
    anime?: string;
  }) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (order: Order) => void;
  getCartItemsCount: () => number;
  getCartSubtotal: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoadingProducts(true);
        setProductsError(null);

        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Local dev server/sheets returned failure code');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('Invalid products data format received');
        }
      } catch (error) {
        console.error('API / Sheets error:', error);
        setProducts([]);
        setProductsError('Products temporarily unavailable');
      } finally {
        setLoadingProducts(false);
      }
    }
    loadProducts();
  }, []);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('akiba_hub_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [activeView, setView] = useState<'landing' | 'shop' | 'checkout' | 'order-success'>( 'landing');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAnime, setSelectedAnime] = useState<string>('All Anime');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedProductLine, setSelectedProductLine] = useState<string | null>(null);
  
  const [comingSoonCategory, setComingSoonCategory] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('akiba_hub_latest_order');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('akiba_hub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentOrder) {
      localStorage.setItem('akiba_hub_latest_order', JSON.stringify(currentOrder));
    } else {
      localStorage.removeItem('akiba_hub_latest_order');
    }
  }, [currentOrder]);

  const setCategoryAndGroup = (category: string, anime: string = 'All Anime') => {
    if (category === 'manga' || category === 'comic-books') {
      setComingSoonCategory(category === 'manga' ? 'Manga & Light Novels' : 'Comic Books');
      return;
    }
    // Handle translating legacy categories to the upgraded structure
    if (category === 'pokemon-english') {
      setSelectedCategory('trading-cards');
      setSelectedSubCategory('pokemon');
      setSelectedLanguage('EN');
    } else if (category === 'pokemon-japanese') {
      setSelectedCategory('trading-cards');
      setSelectedSubCategory('pokemon');
      setSelectedLanguage('JP');
    } else if (category === 'onepiece-english') {
      setSelectedCategory('trading-cards');
      setSelectedSubCategory('onepiece');
      setSelectedLanguage('EN');
    } else if (category === 'onepiece-japanese') {
      setSelectedCategory('trading-cards');
      setSelectedSubCategory('onepiece');
      setSelectedLanguage('JP');
    } else if (category === 'action-fig') {
      setSelectedCategory('anime-figures');
      setSelectedSubCategory(null);
      setSelectedLanguage(null);
      setSelectedProductLine(null);
      setSelectedAnime(anime);
    } else {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
      setSelectedLanguage(null);
      setSelectedProductLine(null);
      setSelectedAnime(anime);
    }
    setView('shop');
  };

  const setAdvancedFilters = (filters: {
    category?: string;
    subCategory?: string | null;
    language?: string | null;
    productLine?: string | null;
    anime?: string;
  }) => {
    if (filters.category !== undefined) {
      if (filters.category === 'manga' || filters.category === 'comic-books') {
        setComingSoonCategory(filters.category === 'manga' ? 'Manga & Light Novels' : 'Comic Books');
        return;
      }
      setSelectedCategory(filters.category);
    }
    if (filters.subCategory !== undefined) setSelectedSubCategory(filters.subCategory);
    if (filters.language !== undefined) setSelectedLanguage(filters.language);
    if (filters.productLine !== undefined) setSelectedProductLine(filters.productLine);
    if (filters.anime !== undefined) setSelectedAnime(filters.anime);
    setView('shop');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        // limit quantity based on stock
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prevCart, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.min(quantity, item.product.stock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (order: Order) => {
    setCurrentOrder(order);
    setView('order-success');
    clearCart();
  };

  const getCartItemsCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loadingProducts,
        productsError,
        cart,
        isCartOpen,
        activeView,
        selectedCategory,
        selectedAnime,
        selectedSubCategory,
        selectedLanguage,
        selectedProductLine,
        comingSoonCategory,
        setComingSoonCategory,
        currentOrder,
        setCartOpen,
        setView,
        setCategoryAndGroup,
        setAdvancedFilters,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        getCartItemsCount,
        getCartSubtotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
