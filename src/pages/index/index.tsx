import Header from '../../public_components/Header';
import Hero from '../../index_components/Hero';
import Produk from '../../index_components/Product';
import Tentang from '../../index_components/About';
import Kontak from '../../index_components/Contact';
import Footer from '../../public_components/Footer';
import { MessageCircle } from 'lucide-react';

export default function Index() {
  return (
    <main className="min-h-screen bg-white pb-16 md:pb-0">
      <Header />
      <div className="max-w-[1200px] mx-auto">
        <Hero />
        <Produk />
        <Tentang />
        <Kontak />
      </div>
      <Footer />
      <a
        href="https://wa.me/085100631631"
        className="fixed bottom-20 md:bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={24} />
        <span className="ml-2">CS</span>
      </a>
    </main>
  );
}