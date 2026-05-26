import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    setView
  } = useShop();

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-[#02020a]/80 backdrop-blur-md transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Container Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#05051e]/95 border-l border-neonpink shadow-[0_0_25px_rgba(255,0,127,0.3)] flex flex-col text-white backdrop-blur-md">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#08082c]">
            <h2 className="text-sm font-mono font-black text-white uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-neonpink filter drop-shadow-[0_0_3px_#ff007f]" />
              MY SHOPPING CART
            </h2>
            <button
              id="close-cart-btn"
              onClick={() => setCartOpen(false)}
              className="p-1 hover:bg-neonpink/20 text-neonpink hover:text-white border border-neonpink/30 rounded transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#05051a]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
                <div className="relative w-20 h-20 mb-4 bg-[#08082a] flex items-center justify-center rounded border border-neoncyan/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                  <span className="text-4xl">🛒</span>
                  {/* tiny cyber decoration */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-neonpink rounded border border-white flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-md font-bold font-mono text-white uppercase tracking-widest">Your cart is empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mt-2 font-medium font-sans leading-relaxed">
                  Browse our products catalog to find and add premium collectibles to your shopping cart.
                </p>
                <button
                  id="checkout-back-to-shop"
                  onClick={() => {
                    setCartOpen(false);
                    setView('shop');
                  }}
                  className="mt-6 px-5 py-3 bg-neoncyan text-slate-950 font-black text-xs font-mono rounded tracking-widest shadow-[0_0_12px_rgba(0,240,255,0.4)] hover:bg-[#00d0e0] transition-colors cursor-pointer"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-[#070724] border border-white/10 hover:border-neoncyan/55 rounded-lg flex gap-3 transition-all group shadow-md"
                >
                  <div className="relative w-16 h-16 rounded border border-white/10 bg-slate-950 overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Item Description, Quantity, Subtotal pricing details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[11px] font-bold text-white line-clamp-1 group-hover:text-neoncyan transition-colors leading-tight font-sans">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 font-mono">
                        <span className="text-[8px] bg-[#0b0b30] text-gray-300 px-1.5 py-0.25 border border-white/5 rounded">
                          {item.product.category.replace('pokemon-', 'PKMN ').replace('onepiece-', 'OP ').toUpperCase()}
                        </span>
                        {item.product.cardsPerPack && (
                          <span className="text-[8px] text-neoncyan font-bold">
                            {item.product.cardsPerPack} CARDS
                          </span>
                        )}
                        {item.product.anime && (
                          <span className="text-[8px] text-neonpink font-bold">
                            {item.product.anime.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 font-mono">
                       {/* quantity buttons */}
                       <div className="flex items-center border border-white/10 rounded bg-[#09092c] p-0.5 text-xs">
                         <button
                           className="p-1 hover:text-neoncyan text-gray-400 rounded hover:bg-white/5 cursor-pointer"
                           onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                           aria-label="Decrease quantity"
                         >
                           <Minus className="w-2.5 h-2.5" />
                         </button>
                         <span className="px-2 font-bold text-white">
                           {item.quantity}
                         </span>
                         <button
                           className="p-1 hover:text-neoncyan text-gray-400 rounded hover:bg-white/5 cursor-pointer"
                           onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                           disabled={item.quantity >= item.product.stock}
                           aria-label="Increase quantity"
                         >
                           <Plus className="w-2.5 h-2.5" />
                         </button>
                       </div>

                       {/* price and delete layout */}
                       <div className="flex items-center gap-2 text-xs">
                         <span className="font-extrabold text-white">
                           ${(item.product.price * item.quantity).toFixed(2)}
                         </span>
                         <button
                           id={`del-cart-item-${item.product.id}`}
                           onClick={() => removeFromCart(item.product.id)}
                           className="p-1 text-neonpink hover:bg-neonpink/10 rounded transition-colors cursor-pointer"
                           aria-label="Remove item"
                         >
                           <Trash2 className="w-3.5 h-3.5" />
                         </button>
                       </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer summary panel config */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#08082c] border-t border-white/10 space-y-4 font-mono">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>TOTAL ITEMS</span>
                  <span className="font-bold text-white">{cart.reduce((count, item) => count + item.quantity, 0)} ITEMS</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-400">ESTIMATED TOTAL</span>
                  <span className="text-xl font-bold text-neoncyan filter drop-shadow-[0_0_5px_rgba(0,240,255,0.4)] animate-pulse">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[9px] text-gray-500 font-semibold leading-normal font-sans">
                  Shipping, taxes, and discounts are calculated at checkout. Safe and secure transaction processed through PayPal.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2 text-xs">
                <button
                  id="checkout-bottom-btn"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-neonpink hover:bg-neonpink/90 text-white font-bold rounded tracking-widest shadow-[0_0_15px_rgba(255,0,127,0.35)] hover:shadow-[0_0_20px_rgba(255,0,127,0.55)] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="keep-collecting-btn"
                  onClick={() => setCartOpen(false)}
                  className="w-full py-2.5 bg-transparent hover:bg-neoncyan/10 text-neoncyan font-bold border border-neoncyan/40 rounded tracking-widest cursor-pointer transition-all"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
