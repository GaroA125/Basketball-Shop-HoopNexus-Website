
import React from 'react';
import { User, CartItem } from '../types';

interface HeaderProps {
  user: User;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ user, cart, onOpenCart, onOpenLogin, onNavigate, currentPage }) => {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'times', label: 'Working Times' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 basketball-gradient rounded-full flex items-center justify-center text-white">
              <i className="fa-solid fa-basketball text-2xl animate-pulse"></i>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Hoop<span className="text-orange-600">Nexus</span></span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  currentPage === item.id ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:text-orange-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:text-orange-600 transition-all transform hover:scale-110"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              <i className="fa-solid fa-user"></i>
              <span>{user.isLoggedIn ? user.username : 'Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
