import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ShippingDetails } from '../types';

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  activeView: 'landing' | 'shop' | 'checkout' | 'order-success';
  selectedCategory: string;
  selectedAnime: string;
  currentOrder: Order | null;
  setCartOpen: (open: boolean) => void;
  setView: (view: 'landing' | 'shop' | 'checkout' | 'order-success') => void;
  setCategoryAndGroup: (category: string, anime?: string) => void;
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('akiba_hub_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [activeView, setView] = useState<'landing' | 'shop' | 'checkout' | 'order-success'>( 'landing');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAnime, setSelectedAnime] = useState<string>('All Anime');
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
    setSelectedCategory(category);
    setSelectedAnime(anime);
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
        cart,
        isCartOpen,
        activeView,
        selectedCategory,
        selectedAnime,
        currentOrder,
        setCartOpen,
        setView,
        setCategoryAndGroup,
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
