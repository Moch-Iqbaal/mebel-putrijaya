import { Product, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sofa Mewah Minimalis',
    category: 'Sofa',
    price: 'Rp 4.500.000',
    image: 'https://picsum.photos/seed/sofa1/800/600',
    description: 'Sofa nyaman dengan kain berkualitas tinggi, cocok untuk ruang tamu modern.'
  },
  {
    id: '2',
    name: 'Kursi Jati Klasik',
    category: 'Kursi',
    price: 'Rp 1.200.000',
    image: 'https://picsum.photos/seed/chair1/800/600',
    description: 'Kursi dari kayu jati asli dengan ukiran halus khas Jepara.'
  },
  {
    id: '3',
    name: 'Meja Makan Solid',
    category: 'Meja',
    price: 'Rp 3.800.000',
    image: 'https://picsum.photos/seed/table1/800/600',
    description: 'Meja makan kokoh untuk 6 orang, tahan lama dan elegan.'
  },
  {
    id: '4',
    name: 'Lemari Pakaian 3 Pintu',
    category: 'Lemari',
    price: 'Rp 2.900.000',
    image: 'https://picsum.photos/seed/wardrobe1/800/600',
    description: 'Lemari luas dengan cermin besar dan banyak sekat penyimpanan.'
  },
  {
    id: '5',
    name: 'Kasur Busa Orthopedic',
    category: 'Kasur Busa',
    price: 'Rp 1.500.000',
    image: 'https://picsum.photos/seed/mattress1/800/600',
    description: 'Kasur busa yang mendukung kesehatan tulang punggung Anda.'
  },
  {
    id: '6',
    name: 'Bantal Dacron Premium',
    category: 'Bantal',
    price: 'Rp 85.000',
    image: 'https://picsum.photos/seed/pillow1/800/600',
    description: 'Bantal empuk anti kempes untuk tidur yang lebih nyenyak.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Apakah Mebel Putri Jaya melayani pengiriman ke luar kota?',
    answer: 'Tidak, sementara ini kami hanya melayani pengiriman dalam wilayah Randudongkal, Pemalang dan sekitarnya untuk memastikan kualitas barang sampai dengan aman.'
  },
  {
    question: 'Berapa lama garansi barang yang dibeli?',
    answer: 'Kami memberikan garansi produk mulai dari 6 bulan hingga 2 tahun tergantung jenis furniture-nya.'
  },
  {
    question: 'Apakah bisa memesan furniture sesuai ukuran (custom)?',
    answer: 'Tentu, Anda bisa berkonsultasi dengan tim kami untuk pembuatan furniture custom sesuai kebutuhan ruangan Anda.'
  },
  {
    question: 'Bagaimana cara pembayarannya?',
    answer: 'Kami menerima pembayaran via Transfer Bank atau Cash saat di toko. Tidak menerima pembayaran via cicilan/kredit.'
  }
];

export const STORE_INFO = {
  name: 'Mebel Putri Jaya',
  address: 'Jl. Lkr. Utara, RT.08/RW.01, Dusun I, Randudongkal, Kec. Randudongkal, Kabupaten Pemalang, Jawa Tengah 52353',
  phone: '082113092518 (Muh Rozaki)',
  whatsappPrefix: 'Halo Mebel Putri Jaya, saya tertarik untuk membeli barang yang ada di toko Anda. Apakah barang tersebut masih tersedia di toko?'
};
