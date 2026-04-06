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
    const msg = "New Order:\n" + items + "\nTotal: ₹" + totalPrice;
    window.open("https://wa.me/91XXXXXXXXXX?text=" + encodeURIComponent(msg));
  };

  return (
    <main className="bg-white min-h-screen text-stone-900 font-sans">
      <nav className="p-6 flex justify-between items-center border-b border-stone-50 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <h1 className="tracking-[0.4em] uppercase text-sm font-light">Radharani</h1>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2">
          <ShoppingBag size={18} strokeWidth={1.2} />
          {cart.length > 0 && <span className="absolute top-0 right-0 bg-stone-900 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
        </button>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {products.map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setViewProduct(p)}>
              <div className="aspect-[3/4] overflow-hidden bg-stone-50 mb-4">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <h3 className="text-[10px] tracking-widest uppercase font-medium">{p.name}</h3>
              <p className="text-sm font-serif italic text-stone-400">₹{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {viewProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-white overflow-y-auto p-6 md:p-20">
              <button onClick={() => setViewProduct(null)} className="fixed top-6 right-6 p-2 bg-stone-50 rounded-full z-[70]"><X size={20}/></button>
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-4">
                  {viewProduct.images.map((img, i) => <img key={i} src={img} className="w-full object-cover" />)}
                </div>
                <div className="flex-1 sticky top-20 h-fit text-left">
                  <h2 className="text-4xl font-serif italic mb-4">{viewProduct.name}</h2>
                  <p className="text-xl mb-8">₹{viewProduct.price}</p>
                  <p className="text-sm leading-relaxed text-stone-600 mb-12">{viewProduct.description}</p>
                  <button onClick={() => addToCart(viewProduct)} className="w-full bg-stone-900 text-white py-5 uppercase text-[10px] tracking-[0.3em]">Add to Bag</button>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-[70]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[80] p-8 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-12 uppercase tracking-[0.3em] text-xs font-bold">
                <span>Your Selection</span>
                <button onClick={() => setIsCartOpen(false)}><X size={20}/></button>
              </div>
              <div className="flex-1">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 mb-6 border-b pb-6">
                    <img src={item.images[0]} className="w-16 h-20 object-cover" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest">{item.name}</p>
                      <p className="text-sm">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <button onClick={checkout} className="w-full bg-stone-900 text-white py-5 flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.3em]">
                  Order via WhatsApp <ArrowRight size={14} />
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
// Deployment at Mon Apr  6 21:45:56 UTC 2026
