import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Sofa, ArrowRight, Star, MessageCircle, Tag } from 'lucide-react';
import { FAQS, STORE_INFO } from '../constants';

export default function Home() {
  const categories = [
    { name: 'Sofa', emoji: '🛋️' },
    { name: 'Kursi', emoji: '🪑' },
    { name: 'Meja', emoji: '🍽️' },
    { name: 'Lemari', emoji: '🚪' },
    { name: 'Kasur Busa', emoji: '🛏️' },
    { name: 'Bantal', emoji: '☁️' },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Main Hero & Content Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Left side: Welcome & Hero */}
        <div className="w-full md:w-5/12 flex flex-col justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-6"
          >
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              Kualitas Terbaik untuk Keluarga
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1]">
              Furniture Nyaman untuk Hunian Idaman
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Temukan koleksi mebel berkualitas dengan desain ramah keluarga. Melayani dengan hati sejak bertahun-tahun di <strong>Randudongkal</strong>.
            </p>
            
            <div className="flex flex-col gap-4">
              <Link 
                to="/katalog" 
                className="bg-primary text-white text-center py-5 px-8 rounded-xl font-bold text-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Lihat Katalog Terbaru
              </Link>
              <p className="text-sm text-gray-400 italic font-medium">
                * Klik barang untuk pesan via WhatsApp otomatis
              </p>
            </div>

            <div className="bg-accent/30 p-6 rounded-2xl border border-accent mt-4">
              <h4 className="font-bold text-gray-700 mb-3 italic flex items-center gap-2">
                <MessageCircle size={18} className="text-primary" />
                Tanya Kami (FAQ):
              </h4>
              <div className="space-y-4">
                <p className="text-md text-gray-600 font-medium">
                  "{FAQS[0].question}"<br />
                  <span className="text-primary font-bold">{FAQS[0].answer}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side: Catalog Grid */}
<div className="w-full md:w-7/12 grid grid-cols-2 lg:grid-cols-3 gap-6">
  {categories.map((cat, idx) => (
    <motion.div
      key={cat.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        to="/katalog"
        className="category-card p-8 h-full flex flex-col items-center justify-center text-center gap-4"
      >
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-4xl">
          {cat.emoji}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-gray-800 text-xl">{cat.name}</span>
          <span className="text-xs text-gray-400 uppercase tracking-tighter">Klik untuk Pesan</span>
        </div>
      </Link>
    </motion.div>
  ))}
</div>
      </section>

      {/* Featured Service (Optional but kept for polish) */}
      <section className="bg-white py-16 border-y border-accent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex gap-6 items-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Star fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Kualitas Terjamin</h3>
              <p className="text-gray-500">Bahan pilihan kualitas ekspor.</p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ArrowRight className="rotate-[-45deg]" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Antar Sampai Pintu</h3>
              <p className="text-gray-500">Layanan pengiriman aman & cepat.</p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <Tag size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Diskon untuk Pelanggan baru</h3>
              <p className="text-gray-500">Harga sangat terjangkau.</p>
            </div>
          </div>
        </div>
      </section>
        {/* Trust Banner */}
        <div
          className="relative overflow-hidden h-48 flex items-center justify-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/60" />

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 text-center"
          >
            <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-2">Mebel Putri Jaya - Randudongkal</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
              Terpercaya sejak 2022
            </h2>
          </motion.div>
        </div>
    </div>
  );
}
