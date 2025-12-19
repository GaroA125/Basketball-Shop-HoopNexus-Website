
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import WorkingTimes from './components/WorkingTimes';
import Chatbot from './components/Chatbot';
import { Product, CartItem, User, Category } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User>({ username: 'Guest', isLoggedIn: false });
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-orange-100 selection:text-orange-900">
      <Header 
        user={user} 
        cart={cart} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero onShopClick={() => setCurrentPage('shop')} />
            <section className="py-20 max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">Featured Gear</h2>
                  <p className="text-slate-500 mt-2 font-medium">Curated selection for the serious athlete.</p>
                </div>
                <button onClick={() => setCurrentPage('shop')} className="text-orange-600 font-bold hover:underline">View All Collection</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </section>
          </>
        )}

        {currentPage === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-5xl font-black uppercase italic mb-12 text-center tracking-tighter">Pro <span className="text-orange-600">Inventory</span></h1>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['All', ...Object.values(Category)].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-8 py-3 rounded-full font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'times' && <WorkingTimes />}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-slide-in">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
              <h2 className="text-2xl font-black italic tracking-tighter">Your Locker Room</h2>
              <button onClick={() => setIsCartOpen(false)} className="hover:text-orange-500">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <i className="fa-solid fa-cart-flatbed-suitcases text-4xl text-slate-300"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-slate-400 mt-2">Get off the bench and start shopping!</p>
                  <button onClick={() => { setIsCartOpen(false); setCurrentPage('shop'); }} className="mt-8 bg-orange-600 text-white px-8 py-3 rounded-xl font-bold">Browse Store</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 leading-tight">{item.name}</h4>
                      <p className="text-orange-600 font-bold text-sm mt-1">${item.price}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-4 bg-slate-50 rounded-lg px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-slate-900">-</button>
                          <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-slate-900">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-bold">Subtotal</span>
                  <span className="text-2xl font-black text-slate-900">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-slate-900 hover:bg-orange-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl shadow-slate-900/10">
                  Proceed to Tip-off
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsLoginOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-12 animate-pop-in">
            <div className="text-center mb-10">
              <div className="inline-flex w-20 h-20 basketball-gradient rounded-3xl items-center justify-center text-white text-3xl mb-6 shadow-xl shadow-orange-600/20 rotate-6">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">Member Access</h2>
              <p className="text-slate-500 font-medium">Log in for exclusive drops and stats.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Game Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. LeBron_Fan_23"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold"
                  onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Secret Code</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                />
              </div>
              <button 
                onClick={() => {
                  setUser(prev => ({ ...prev, isLoggedIn: true }));
                  setIsLoginOpen(false);
                }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest transition-all transform active:scale-95 shadow-lg shadow-orange-600/20"
              >
                Sign In
              </button>
              <div className="flex items-center gap-4 py-4">
                <div className="flex-1 h-[1px] bg-slate-100"></div>
                <span className="text-xs font-bold text-slate-400 uppercase">Or</span>
                <div className="flex-1 h-[1px] bg-slate-100"></div>
              </div>
              <button className="w-full border-2 border-slate-200 hover:bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3">
                <i className="fa-brands fa-google text-orange-600"></i>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
      
      <footer className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 basketball-gradient rounded-full flex items-center justify-center text-white text-sm">
                <i className="fa-solid fa-basketball"></i>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">HoopNexus</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              We live for the buzzer beaters, the ankle breakers, and the sound of the swish. Providing pro gear for every level since 2012.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-orange-500 text-sm">Playbook</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">Shop Men's</li>
              <li className="hover:text-white transition-colors cursor-pointer">Shop Women's</li>
              <li className="hover:text-white transition-colors cursor-pointer">Junior League</li>
              <li className="hover:text-white transition-colors cursor-pointer">Custom Jerseys</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-orange-500 text-sm">The Bench</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Store Finder</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-orange-500 text-sm">Connect</h4>
            <div className="flex gap-4 mb-8">
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-all">
                <i className="fa-brands fa-instagram"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-all">
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-all">
                <i className="fa-brands fa-tiktok"></i>
              </button>
            </div>
            <p className="text-slate-400 text-xs">Stay updated with our newsletter. High-speed drops straight to your inbox.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4 font-bold">
          <span>&copy; 2024 HOOPNEXUS RETAIL CO. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-white cursor-pointer">COOKIES</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes pop-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-pop-in { animation: pop-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default App;
