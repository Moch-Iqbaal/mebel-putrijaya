import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Menu, X } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6';
import { STORE_INFO } from '../constants';

const logoNav = new URL('../assets/logo/logo-nav.png', import.meta.url).href;

interface LayoutProps {
  children: ReactNode;
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog', path: '/katalog' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-accent">
              <span className="font-bold text-gray-800 tracking-tight">MEBEL PUTRI JAYA®</span>
              <button onClick={onClose} className="text-gray-500 hover:text-primary transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col px-4 py-6 gap-1 flex-grow">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-gray-600 hover:bg-accent hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Drawer Footer — WA CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="px-6 py-6 border-t border-accent"
            >
              <a
                href={`https://wa.me/6282113092518?text=${encodeURIComponent('Halo Mebel Putri Jaya, Saya ingin bertanya tentang produk Anda')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                <FaWhatsapp size={18} />
                Klik Chat WhatsApp Sekarang 
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog', path: '/katalog' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-accent px-8 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-18 items-center">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logoNav} alt="Mebel Putri Jaya Logo" className="h-8 w-auto rounded-full object-contain" />
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                MEBEL PUTRI JAYA®
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 text-gray-600 font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base transition-colors hover:text-primary ${
                    location.pathname === item.path ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile — Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-gray-600 hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main Content */}
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer — tidak diubah */}
      <footer className="bg-white border-t border-accent p-8 md:p-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-bold">
              <MapPin size={20} />
              <span>Lokasi Toko:</span>
            </div>
            <a
              href="https://maps.app.goo.gl/1xuvDZRqfh4kSwXt5"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 text-sm max-w-sm hover:text-primary transition-colors"
            >
              {STORE_INFO.address.split(', Randudongkal')[0]},<br />Randudongkal, Kab. Pemalang, Jawa Tengah 52353
            </a>
          </div>

          <div className="flex flex-col items-end gap-3 text-right">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Hubungi kontak Kami</div>
              <div className="text-2xl font-bold text-gray-800">+62 821 1309 2518</div>
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Ikuti Sosial Media Kami</div>
            <div className="flex gap-4">
              
              <a href={`https://wa.me/6282113092518?text=${encodeURIComponent('Halo Mebel Putri Jaya, Saya ingin bertanya tentang produk Anda')}`}
                target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FaWhatsapp size={16} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61568686276925" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FaFacebook size={16} />
              </a>
              <a href="https://www.instagram.com/mebelputrijaya/" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="https://www.tiktok.com/@mebelputrijaya_" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FaTiktok size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}