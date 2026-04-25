export interface Product {
  id: string;
  name: string;
  category: 'Sofa' | 'Kursi' | 'Meja' | 'Lemari' | 'Kasur Busa' | 'Bantal';
  price: string;
  image: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
