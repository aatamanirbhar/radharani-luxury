"use client";
import React, { useState } from 'react';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { 
    id: 1, 
    name: 'Linen Summer Set', 
    price: 2499, 
    images: [
      'https://images.unsplash.com/photo-1523381235312-3a1600f2045a?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800'
    ],
    description: 'Hand-crafted in Jaipur. 100% breathable linen designed for the Indian summer. Features a relaxed fit and mother-of-pearl buttons.'
  }
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
    setViewProduct(null);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    const items = cart.map(i => i.name).join(", ");
    const msg = "New Order from Radharani Website:\n" + items + "\nTotal: ₹" + totalPrice;
    window.open("https://wa.me/91XXXXXXXXXX?text=" + encodeURIComponent(msg));
  };

  return (
    <main className="bg-white min-h-screen text-stone-900 font-sans selection:bg-stone-100">
      <nav className="p-6 flex justify-between items-center border-b border-stone-50 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <h1 className="tracking-[0.5em] uppercase text-sm font-light">Radharani</h1>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2">
          <ShoppingBag size={18} strokeWidth={1.2} />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-stone-900 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {products.map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setViewProduct(p)}>
              <div className="aspect-[3/4] overflow-hidden bg-stone-50 mb-6">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
              </div>
              <h3 className="text-[11px] tracking-[0.3em] uppercase font-medium">{p.name}</h3>
              <p className="text-sm font-serif italic text-stone-400 mt-1">₹{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {viewProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-white overflow-y-auto p-6 md:p-20">
              <button onClick={() => setViewProduct(null)} className="fixed top-8 right-8 p-3 bg-stone-50 rounded-full z-[70] hover:bg-stone-100 transition"><X size={20}/></button>
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
                <div className="flex-1 space-y-6">
                  {viewProduct.images.map((img, i) => <img key={i} src={img} className="w-full object-cover bg-stone-50" />)}
                </div>
                <div className="flex-1 sticky top-20 h-fit text-left">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">The Summer Edit</span>
                  <h2 className="text-5xl font-serif italic my-6 tracking-tight">{viewProduct.name}</h2>
                  <p className="text-2xl mb-10 font-light">₹{viewProduct.price}</p>
                  <p className="text-sm leading-relaxed text-stone-600 mb-16 font-light max-w-md">{viewProduct.description}</p>
                  <button onClick={() => addToCart(viewProduct)} className="w-full bg-stone-900 text-white py-6 uppercase text-[10px] tracking-[0.4em] hover:bg-stone-800 transition shadow-xl">Add to Bag</button>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-stone-900/10 backdrop-blur-sm z-[70]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30 }} className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[80] p-10 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h2 className="uppercase tracking-[0.4em] text-[10px] font-bold">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={18}/></button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="text-stone-400 text-[10px] uppercase tracking-widest italic">Empty</p>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div key={i} className="flex gap-6 mb-8 border-b border-stone-50 pb-8">
                      <img src={item.images[0]} className="w-20 h-24 object-cover grayscale-[0.2]" />
                      <div className="py-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">{item.name}</p>
                        <p className="text-sm font-serif">₹{item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="pt-10">
                  <div className="flex justify-between mb-8 uppercase text-[10px] tracking-[0.4em] font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <button onClick={checkout} className="w-full bg-stone-900 text-white py-6 flex items-center justify-center gap-4 uppercase text-[9px] tracking-[0.4em] hover:bg-stone-800 transition">
                    WhatsApp Checkout <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
