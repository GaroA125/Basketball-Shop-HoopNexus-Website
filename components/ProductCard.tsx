
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
          ${product.price}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
           <button 
            onClick={() => onAddToCart(product)}
            className="bg-orange-600 text-white p-4 rounded-full hover:bg-orange-500 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
           >
            <i className="fa-solid fa-plus text-xl"></i>
           </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-black uppercase tracking-tighter text-orange-600">{product.category}</span>
          <div className="flex items-center text-yellow-400 text-xs">
            <i className="fa-solid fa-star mr-1"></i>
            <span className="text-slate-600 font-bold">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{product.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed h-10 mb-4 italic">
          "{product.description}"
        </p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-900 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn"
        >
          <span>Add to Court</span>
          <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
