import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, Printer, ShoppingBag, Landmark, MapPin, Check } from 'lucide-react';

export function OrderSuccess() {
  const { currentOrder, setView } = useShop();

  if (!currentOrder) {
    return (
      <div className="pt-28 pb-16 min-h-screen text-center flex flex-col items-center justify-center bg-[#070707] text-white font-mono">
        <span className="text-4xl animate-bounce">🔎</span>
        <h2 className="text-md font-bold text-white uppercase tracking-widest mt-4">ORDER NOT FOUND</h2>
        <p className="text-xs text-gray-400 mt-2 max-w-xs leading-relaxed font-sans font-semibold">
          No active order details could be found for your current checkout session.
        </p>
        <button
          onClick={() => setView('landing')}
          className="mt-6 px-5 py-2.5 bg-[#e60012] text-white hover:bg-[#ff1e27] font-bold rounded tracking-widest shadow-[0_0_10px_rgba(230,0,18,0.3)] transition-all uppercase text-xs cursor-pointer"
        >
          RETURN HOME
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-[#070707] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Success header information panel */}
        <div className="text-center p-8 bg-[#121215] border border-white/10 rounded-xl shadow-xl overflow-hidden relative mb-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-48 h-48 bg-[#e60012]/5 rounded-full filter blur-2xl pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-[#e60012]/10 text-[#e60012] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e60012]/30 shadow-[0_0_15px_rgba(230,0,18,0.15)]">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <span className="text-[9px] font-mono select-none tracking-widest text-[#e60012] font-bold uppercase bg-[#e60012]/15 border border-[#e60012]/30 px-3 py-1 rounded">
            ORDER SECURELY COMPLETED
          </span>
          <h1 className="text-2xl font-display font-medium text-white mt-4 leading-tight uppercase tracking-wider">
            THANK YOU FOR YOUR ORDER
          </h1>
          <p className="text-xs text-gray-300 max-w-md mx-auto mt-2 leading-relaxed font-sans font-semibold">
            Your order has been successfully placed. A confirmation email with order tracking and details will be sent shortly to <span className="text-white font-bold underline font-mono hover:text-[#e60012] cursor-pointer">{currentOrder.shippingDetails.email}</span>.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-[#18181c] rounded border border-white/5 max-w-md mx-auto font-mono text-[10px]">
            <div className="text-left">
              <span className="text-gray-500 block text-[9px] font-bold uppercase">ORDER NUMBER</span>
              <span className="text-white font-extrabold">{currentOrder.id}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 block text-[9px] font-bold uppercase">TRANSACTION ID</span>
              <span className="text-white font-extrabold truncate block">{currentOrder.paymentId}</span>
            </div>
          </div>
        </div>

        {/* Live Delivery Tracker roadmap bar */}
        <div className="bg-[#121215] border border-white/10 rounded-xl p-6 shadow-xl mb-8">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-6 block border-b border-white/5 pb-2">
            DELIVERY TIMELINE STATUS (Tracked Carrier)
          </h3>

          <div className="relative flex justify-between items-center pr-2">
            {/* track line gray */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0"></div>
            {/* fill line red */}
            <div className="absolute left-6 w-[28%] top-1/2 -translate-y-1/2 h-[2px] bg-[#e60012] z-0 shadow-[0_0_8px_rgba(230,0,18,0.4)]"></div>

            {/* steps bubble list */}
            {[
              { label: 'Approved', desc: 'Secure payment OK', icon: CheckCircle2, active: true, done: true },
              { label: 'Fulfilling', desc: 'Warehouse Packing', icon: Package, active: true, done: false },
              { label: 'Dispatched', desc: 'International Carrier', icon: Truck, active: false, done: false },
              { label: 'Delivered', desc: 'Your Address', icon: MapPin, active: false, done: false }
            ].map((st) => (
              <div key={st.label} className="relative z-10 flex flex-col items-center font-mono">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                  st.done
                    ? 'bg-[#e60012] border-[#e60012] text-white shadow-[0_0_12px_rgba(230,0,18,0.45)] font-bold'
                    : st.active
                      ? 'bg-transparent border-[#e60012] text-[#e60012] animate-pulse shadow-[0_0_8px_rgba(230,0,18,0.3)] font-bold'
                      : 'bg-[#18181c] border-white/10 text-gray-500'
                }`}>
                  <st.icon className="w-4 h-4 font-black" />
                </div>
                <span className="text-[10px] font-bold text-white mt-2 block uppercase">{st.label}</span>
                <span className="text-[8px] text-gray-500 font-bold block mt-0.5">{st.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Printable Detailed Receipt Sheet */}
        <div className="bg-[#121215] text-white rounded-xl p-6 md:p-8 border border-white/5 shadow-xl space-y-6 text-left">
          
          {/* Receipt Top header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5 font-mono">
            <div>
              <span className="italic font-display font-black text-lg text-white tracking-widest uppercase">AKIBA // <span className="text-[#e60012]">HUB</span></span>
              <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider font-semibold">Chiyoda-ku Sotokanda Segment // Tokyo, Japan</p>
            </div>
            <div className="text-[10px] text-right text-gray-400 font-semibold leading-normal">
              <span className="block"><span className="text-[#e60012] font-bold uppercase">DATE:</span> {currentOrder.date}</span>
              <span className="block"><span className="text-[#e60012] font-bold uppercase">INVOICE NO:</span> {currentOrder.id}</span>
            </div>
          </div>

          {/* Receipt customer info details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <h4 className="font-mono font-bold text-[9px] text-[#e60012] uppercase tracking-widest mb-2">CUSTOMER DETAILS</h4>
              <p className="text-gray-300 font-medium leading-relaxed">
                Name: <span className="text-white font-bold">{currentOrder.shippingDetails.fullName}</span><br />
                Email: {currentOrder.shippingDetails.email}<br />
                Phone: {currentOrder.shippingDetails.phone}
              </p>
            </div>
            <div>
              <h4 className="font-mono font-bold text-[9px] text-[#e60012] uppercase tracking-widest mb-2">SHIPPING ADDRESS</h4>
              <p className="text-gray-300 font-medium leading-relaxed">
                Address: {currentOrder.shippingDetails.addressLine1}<br />
                {currentOrder.shippingDetails.addressLine2 && <>{currentOrder.shippingDetails.addressLine2}<br /></>}
                {currentOrder.shippingDetails.city}, {currentOrder.shippingDetails.state} {currentOrder.shippingDetails.postalCode}<br />
                Country: {currentOrder.shippingDetails.country} (via {currentOrder.shippingDetails.shippingMethod === 'express' ? 'Express Priority Courier' : 'Standard Land Tracked Delivery'})
              </p>
            </div>
          </div>

          {/* Itemized tables list */}
          <div>
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-white/5 font-mono text-[9px] text-gray-500 uppercase font-black">
                  <th className="py-2.5">ITEM NAME</th>
                  <th className="py-2.5 text-center">QUANTITY</th>
                  <th className="py-2.5 text-right">UNIT PRICE</th>
                  <th className="py-2.5 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 uppercase">
                {currentOrder.items.map((item) => (
                  <tr key={item.product.id} className="text-gray-300">
                    <td className="py-3 font-bold text-white font-sans normal-case">
                       {item.product.name}
                       <span className="block text-[8px] text-gray-400 font-mono uppercase font-bold mt-0.5">
                         Collection: {item.product.category.replace('onepiece', 'One Piece').replace('pokemon', 'Pokémon').replace('-japanese', ' JPN').replace('-english', ' ENG').toUpperCase()}
                       </span>
                    </td>
                    <td className="py-3 text-center font-mono text-white font-bold">{item.quantity}</td>
                    <td className="py-3 text-right font-mono text-white font-bold">${item.product.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-mono font-bold text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals table calculations */}
          <div className="border-t border-white/5 pt-4 flex justify-end font-mono">
            <div className="w-full sm:max-w-xs space-y-2 text-xs text-gray-400 font-semibold">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-white font-bold">${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Method</span>
                <span className="text-white font-bold">${currentOrder.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="text-white font-bold">${currentOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-xs font-bold text-white font-sans">
                <span>TOTAL AMOUNT PAID:</span>
                <span className="font-mono text-sm font-extrabold text-[#e60012]">${currentOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Secure disclaimer Cop copy */}
          <div className="border-t border-white/5 pt-5 text-center text-gray-500 font-mono text-[8px] font-bold leading-relaxed">
            This invoice details your completed sandbox simulated checkout. Simulated values do not carry live transaction payloads.<br />
            Thank you for shopping with Akiba Hub
          </div>
        </div>

        {/* Action button controls */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between font-mono text-xs">
          <button
            onClick={() => setView('landing')}
            className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-[#e60012]/10 text-[#e60012] font-bold border border-[#e60012]/40 rounded tracking-widest cursor-pointer transition-all"
          >
            RETURN TO HOME
          </button>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              id="print-btn"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-5 py-3 bg-transparent hover:bg-white/10 text-white font-bold border border-white/40 rounded tracking-widest cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-white" /> PRINT RECEIPT
            </button>
            <button
              onClick={() => setView('shop')}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#e60012] text-white font-bold rounded tracking-widest cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(230,0,18,0.35)] hover:bg-[#ff1e27]"
            >
              <ShoppingBag className="w-4 h-4" /> BROWSE PRODUCTS
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
