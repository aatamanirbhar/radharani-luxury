import React from 'react';

const products = [
  { id: 1, name: 'Linen Summer Set', price: '₹2,499', img: 'https://images.unsplash.com/photo-1523381235312-3a1600f2045a?auto=format&fit=crop&w=800' },
  { id: 2, name: 'Cotton Block Print', price: '₹1,899', img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800' },
  { id: 3, name: 'The Jaipur Edit', price: '₹3,200', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800' },
];

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-stone-900 font-sans selection:bg-stone-100">
      <nav className="p-8 flex justify-between items-center border-b border-stone-50 bg-white sticky top-0 z-50">
        <h1 className="tracking-[0.4em] uppercase text-sm font-light">Radharani</h1>
        <div className="flex gap-6 text-[9px] tracking-widest uppercase text-stone-400">
          <span className="hover:text-stone-900 transition underline-offset-4 hover:underline cursor-pointer">Collection</span>
          <span className="hover:text-stone-900 transition underline-offset-4 hover:underline cursor-pointer">Jaipur</span>
        </div>
      </nav>

      <section className="px-8 py-12">
        <div className="relative aspect-[16/7] w-full overflow-hidden bg-stone-100">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600" 
            alt="Summer Launch" 
            className="w-full h-full object-cover grayscale-[0.3]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/10 text-center px-4">
            <span className="uppercase tracking-[0.6em] text-[10px] mb-4">Summer '26</span>
            <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight">The Ethereal Edit</h2>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {products.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-stone-50 mb-4">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" />
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <h2 className="text-[10px] tracking-[0.2em] uppercase font-medium">{p.name}</h2>
                  <p className="text-sm text-stone-400 mt-1 font-serif italic">{p.price}</p>
                </div>
                <button className="text-[9px] tracking-widest uppercase border-b border-stone-900 pb-1 hover:text-stone-400 transition">Inquire</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-20 text-center border-t border-stone-50">
        <p className="text-[9px] tracking-[0.5em] uppercase text-stone-300 italic">Crafted in Jaipur</p>
      </footer>
    </main>
  );
}
