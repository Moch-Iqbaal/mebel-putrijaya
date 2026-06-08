import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, Mail } from 'lucide-react';
import { STORE_INFO } from '../constants';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-20">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">Hubungi Kami</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Kami siap membantu Anda menemukan furniture impian. Silahkan hubungi kami melalui kontak berikut atau kunjungi toko kami langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Contact Info */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex gap-8 items-start p-8 bg-white rounded-3xl shadow-sm border border-accent"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
              <MapPin size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Alamat Toko</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {STORE_INFO.address}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex gap-8 items-start p-8 bg-white rounded-3xl shadow-sm border border-accent"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
              <Phone size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Telepon & WhatsApp</h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-4">{STORE_INFO.phone}</p>
              <a 
                href={`https://wa.me/6282113092518?text=${encodeURIComponent('Halo Mebel Putri Jaya, Saya ingin bertanya tentang produk Anda')}`} target='_blank' rel='noreferrer'
                className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:underline"
              >
                <MessageCircle size={20} />
               Klik untuk menghubungi via WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex gap-8 items-start p-8 bg-white rounded-3xl shadow-sm border border-accent"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
              <Clock size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Jam Operasional</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Senin - Minggu: <span className="font-bold text-primary">08.00 - 17.00 WIB</span><br />
                Idul Fitri & Idul Adha: <span className="font-bold text-danger">Tutup</span>
              </p>
            </div>
          </motion.div>

      
        </div>

        {/* Map + Button */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="rounded-[3rem] h-[600px] overflow-hidden relative shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4093.2891472445126!2d109.31611997514806!3d-7.096766392906453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fe9324ca7640d%3A0xa087cb23a7e130cf!2sMebel%20Putri%20Jaya!5e1!3m2!1sen!2sid!4v1776854716787!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Mebel Putri Jaya"
              className="w-full h-full"
            />
          </motion.div>

          <motion.a
            href="https://www.google.com/maps/dir/?api=1&destination=Mebel+Putri+Jaya+Randudongkal"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-primary/90 transition-colors w-full"
          >
            <MapPin size={20} />
            Petunjuk Arah ke Toko
          </motion.a>
        </div>
          
      </div>
    </div>
  );
}
