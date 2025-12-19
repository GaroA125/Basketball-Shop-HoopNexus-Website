
import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Flight Elite Z',
    price: 189.99,
    category: Category.SHOES,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    description: 'Ultra-lightweight basketball shoes designed for explosive speed and vertical jump.',
    rating: 4.8,
    stock: 12
  },
  {
    id: '2',
    name: 'Pro Grip Evolution 7',
    price: 64.99,
    category: Category.BALLS,
    image: 'https://images.unsplash.com/photo-1518063311540-30b8a1c60a8a?auto=format&fit=crop&q=80&w=600',
    description: 'Official match ball with moisture-wicking technology and premium composite leather.',
    rating: 4.9,
    stock: 25
  },
  {
    id: '3',
    name: 'Heritage Team Jersey',
    price: 85.00,
    category: Category.JERSEYS,
    image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&q=80&w=600',
    description: 'Breathable mesh jersey featuring classic team colors and ergonomic fit.',
    rating: 4.5,
    stock: 40
  },
  {
    id: '4',
    name: 'Compression Knee Sleeves',
    price: 29.99,
    category: Category.ACCESSORIES,
    image: 'https://images.unsplash.com/photo-15162486768b3-34445330e84b?auto=format&fit=crop&q=80&w=600',
    description: 'Professional grade compression for joint support and faster recovery.',
    rating: 4.7,
    stock: 55
  },
  {
    id: '5',
    name: 'Skyhook Jump Pro',
    price: 159.99,
    category: Category.SHOES,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
    description: 'High-top support for dominant interior players who need maximum stability.',
    rating: 4.6,
    stock: 8
  },
  {
    id: '6',
    name: 'All-Star Warmup Jacket',
    price: 110.00,
    category: Category.JERSEYS,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600',
    description: 'Premium satin finish jacket for off-court style and pre-game comfort.',
    rating: 4.9,
    stock: 15
  }
];

export const WORKING_HOURS = [
  { day: 'Monday', hours: '09:00 AM - 08:00 PM' },
  { day: 'Tuesday', hours: '09:00 AM - 08:00 PM' },
  { day: 'Wednesday', hours: '09:00 AM - 08:00 PM' },
  { day: 'Thursday', hours: '09:00 AM - 08:00 PM' },
  { day: 'Friday', hours: '09:00 AM - 10:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 10:00 PM' },
  { day: 'Sunday', hours: '11:00 AM - 05:00 PM' }
];
