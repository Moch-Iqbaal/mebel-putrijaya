import Link from 'next/link';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Halaman tidak ditemukan</h1>
        <p className="text-xl text-gray-600 mb-8">Alamat yang Anda buka tidak ada di situs ini.</p>
        <Link
          href="/"
          className="inline-block bg-primary text-white py-4 px-8 rounded-xl font-bold text-lg hover:opacity-90"
        >
          Kembali ke beranda
        </Link>
      </div>
    </Layout>
  );
}
