
import React from 'react';

interface HeroProps {
  onShopClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <div className="relative h-[600px] overflow-hidden bg-slate-900">
      <img 
        src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000" 
        alt="Basketball Court" 
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <span className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            New Season Arrivals
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-tight mb-6">
            Elevate Your <span className="text-orange-500">Game</span> To The Next Level
          </h1>
          <p className="text-lg text-slate-200 mb-10 font-medium">
            Discover the world's most innovative basketball gear. From pro-level sneakers to elite performance jerseys, we provide the tools you need to dominate the court.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShopClick}
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl font-bold text-lg uppercase transition-all transform hover:translate-y-[-2px] shadow-lg shadow-orange-600/30"
            >
              Shop Collection
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg uppercase transition-all">
              Watch Gear Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
