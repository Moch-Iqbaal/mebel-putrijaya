import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { PRODUCTS, STORE_INFO } from '../constants';

type Category = 'Semua' | 'Sofa' | 'Kursi' | 'Meja' | 'Lemari' | 'Kasur Busa' | 'Bantal';

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');

  const categories: Category[] = ['Semua', 'Sofa', 'Kursi', 'Meja', 'Lemari', 'Kasur Busa', 'Bantal'];

  const filteredProducts = activeCategory === 'Semua' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleBuy = (productName: string) => {
    const message = encodeURIComponent(`${STORE_INFO.whatsappPrefix}${productName}`);
    window.open(`https://wa.me/62${STORE_INFO.phone.substring(1)}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">Katalog Produk</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Temukan furnitur berkualitas untuk setiap sudut rumah Anda. Pilih kategori di bawah untuk mempermudah pencarian.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-4 rounded-xl text-lg font-medium transition-all ${
              activeCategory === cat 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="category-card overflow-hidden group"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-white px-4 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2 text-lg">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-primary text-2xl font-bold">{product.price}</span>
                  <button 
                    onClick={() => handleBuy(product.name)}
                    className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-md hover:shadow-lg font-bold"
                  >
                    <MessageCircle size={20} />
                    Beli
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Maaf, produk di kategori ini belum tersedia.</p>
        </div>
      )}
    </div>
  );
}
