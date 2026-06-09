import { Product, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sofa Abu-Abu Elegan ',
    category: 'Sofa',
    price: '',
    image: `images/sofa/sofa5.jpeg`,
    description: 'Sofa nyaman dengan kain berkualitas tinggi, cocok untuk ruang tamu modern.'
  },
  {
    id: '2',
    name: 'Sofa Merah Maroon Mewah',
    category: 'Sofa',
    price: 'Rp 1.200.000',
    image: 'images/sofa/sofa6.jpeg',
    description: 'Sofa merah maroon mewah dengan desain modern.'
  },
  {
    id: '3',
    name: 'Sofa L-Shape Kombinasi Warna',
    category: 'Sofa',
    price: 'Rp 1.200.000',
    image: 'images/sofa/sofa8.jpeg',
    description: 'Sofa L-Shape dengan kombinasi warna yang menarik.'
  },
  {
    id: '4',
    name: 'Kursi Jati Klasik',
    category: 'Kursi',
    price: 'Rp 1.200.000',
    image: 'images/kursi/kursi1.jpeg',
    description: 'Kursi dari kayu jati asli dengan ukiran halus khas Jepara.'
  },
  {
    id: '5',
    name: 'Kasur Busa Batik/Inoac/Dll',
    category: 'Kasur Busa',
    price: 'Rp 3.800.000',
    image: 'images/kasur/kasur1.jpeg',
    description: 'Kasur busa yang mendukung kesehatan tulang punggung Anda.'
  },
  {
    id: '6',
    name: 'Set Tempat Tidur ',
    category: 'Kasur Busa',
    price: 'Rp 2.900.000',
    image: 'images/kasur/set-tempattidur.png',
    description: 'Lemari luas dengan cermin besar dan banyak sekat penyimpanan.'
  },
  {
    id: '7',
    name: 'Lemari Kayu Minimalis',
    category: 'Lemari',
    price: 'Rp 2.900.000',
    image: 'images/lemari/lemari-2.png',
    description: 'Lemari luas dengan cermin besar dan banyak sekat penyimpanan.'
  },
  {
    id: '8',
    name: 'Lemari Besi Minimalis',
    category: 'Lemari',
    price: 'Rp 1.500.000',
    image: 'images/lemari/lemari-besi.png',
    description: 'Lemari luas dengan cermin besar dan banyak sekat penyimpanan.'
  },
  {
    id: '9',
    name: 'Meja Rias Kayu Jati',
    category: 'Meja',
    price: 'Rp 1.500.000',
    image: 'images/meja/mejarias-1.png',
    description: 'Meja rias kayu jati dengan desain minimalis.'
  },
  {
    id: '10',
    name: 'Bantal Dacron Premium',
    category: 'Bantal',
    price: 'Rp 85.000',
    image: 'images/bantal/bantal-1.png',
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
