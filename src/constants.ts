import { FAQItem, Product } from './types';
import { BUSINESS } from './seo';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sofa Leter L Abu-Abu',
    slug: 'sofa-leter-l-abu-abu',
    category: 'Sofa',
    price: '',
    image: '/images/sofa/sofa5.jpeg',
    alt: 'Sofa leter L abu-abu di Mebel Putri Jaya Randudongkal',
    description: 'Sofa leter L kain abu-abu untuk ruang tamu.',
  },
  {
    id: '2',
    name: 'Sofa Merah Maroon',
    slug: 'sofa-merah-maroon',
    category: 'Sofa',
    price: 'Rp 1.200.000',
    image: '/images/sofa/sofa6.jpeg',
    alt: 'Sofa merah maroon di Mebel Putri Jaya Randudongkal',
    description: 'Sofa merah maroon untuk ruang tamu.',
  },
  {
    id: '3',
    name: 'Sofa Leter L',
    slug: 'sofa-leter-l',
    category: 'Sofa',
    price: 'Rp 1.200.000',
    image: '/images/sofa/sofa8.jpeg',
    alt: 'Sofa leter L kombinasi abu-abu dan maroon di Mebel Putri Jaya Randudongkal',
    description: 'Sofa leter L dengan kombinasi warna abu-abu dan maroon.',
  },
  {
    id: '4',
    name: 'Kursi Tamu Jati',
    slug: 'kursi-tamu-jati',
    category: 'Kursi',
    price: 'Rp 1.200.000',
    image: '/images/kursi/kursi1.jpeg',
    alt: 'Kursi tamu kayu jati ukir di Mebel Putri Jaya Randudongkal',
    description: 'Kursi dari kayu jati pilihan dengan ukiran halus, buatan pengrajin lokal Randudongkal.',
  },
  {
    id: '5',
    name: 'Kasur Busa Batik',
    slug: 'kasur-busa-batik',
    category: 'Kasur Busa',
    price: 'Rp 3.800.000',
    image: '/images/kasur/kasur1.webp',
    alt: 'Kasur busa gulung motif batik di Mebel Putri Jaya Randudongkal',
    description: 'Kasur busa motif batik untuk tempat tidur.',
  },
  {
    id: '6',
    name: 'Set Tempat Tidur',
    slug: 'set-tempat-tidur',
    category: 'Kasur Busa',
    price: 'Rp 2.900.000',
    image: '/images/kasur/set-tempattidur.webp',
    alt: 'Set tempat tidur kayu di Mebel Putri Jaya Randudongkal',
    description: 'Set tempat tidur kayu dengan dipan, nakas, dan lemari.',
  },
  {
    id: '7',
    name: 'Lemari Kayu 2 Pintu',
    slug: 'lemari-kayu-2-pintu',
    category: 'Lemari',
    price: 'Rp 2.900.000',
    image: '/images/lemari/lemari-2.webp',
    alt: 'Lemari kayu 2 pintu dengan cermin di Mebel Putri Jaya Randudongkal',
    description: 'Lemari kayu 2 pintu dengan cermin dan sekat penyimpanan.',
  },
  {
    id: '8',
    name: 'Lemari Besi 2 Pintu',
    slug: 'lemari-besi-2-pintu',
    category: 'Lemari',
    price: 'Rp 1.500.000',
    image: '/images/lemari/lemari-besi.webp',
    alt: 'Lemari besi 2 pintu di Mebel Putri Jaya Randudongkal',
    description: 'Lemari besi 2 pintu untuk penyimpanan.',
  },
  {
    id: '9',
    name: 'Meja Rias Kayu Jati',
    slug: 'meja-rias-kayu-jati',
    category: 'Meja',
    price: 'Rp 1.500.000',
    image: '/images/meja/mejarias-1.webp',
    alt: 'Meja rias kayu jati di Mebel Putri Jaya Randudongkal',
    description: 'Meja rias kayu jati dengan desain minimalis.',
  },
  {
    id: '10',
    name: 'Bantal Dacron',
    slug: 'bantal-dacron',
    category: 'Bantal',
    price: 'Rp 85.000',
    image: '/images/bantal/bantal-1.webp',
    alt: 'Bantal dacron putih di Mebel Putri Jaya Randudongkal',
    description: 'Bantal empuk anti kempes untuk tidur yang lebih nyenyak.',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'Apakah Mebel Putri Jaya melayani pengiriman ke luar kota?',
    answer: 'Tidak, sementara ini kami hanya melayani pengiriman dalam wilayah Randudongkal, Pemalang dan sekitarnya untuk memastikan kualitas barang sampai dengan aman.',
  },
  {
    question: 'Berapa lama garansi barang yang dibeli?',
    answer: 'Kami memberikan garansi produk mulai dari 6 bulan hingga 2 tahun tergantung jenis furniture-nya.',
  },
  {
    question: 'Apakah bisa memesan furniture sesuai ukuran (custom)?',
    answer: 'Tentu, Anda bisa berkonsultasi dengan tim kami untuk pembuatan furniture custom sesuai kebutuhan ruangan Anda.',
  },
  {
    question: 'Bagaimana cara pembayarannya?',
    answer: 'Kami menerima pembayaran via Transfer Bank atau Cash saat di toko. Tidak menerima pembayaran via cicilan/kredit.',
  },
];

export const STORE_INFO = {
  name: 'Mebel Putri Jaya',
  address: BUSINESS.displayAddress,
  phone: BUSINESS.phoneDisplay,
  whatsappPrefix:
    'Halo Mebel Putri Jaya, saya tertarik untuk membeli barang yang ada di toko Anda. Apakah barang tersebut masih tersedia di toko?',
};
