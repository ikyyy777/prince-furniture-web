import Header from './landing_page_components/Header';
import Hero from './landing_page_components/Hero';
import Produk from './landing_page_components/Product';
import Tentang from './landing_page_components/About';
import Kontak from './landing_page_components/Contact';
import Footer from './landing_page_components/Footer';
import { MessageCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Produk />
      <Tentang />
      <Kontak />
      <Footer />
      <a
        href="https://wa.me/085100631631"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={24} />
        <span className="ml-2">Pesan</span>
      </a>
    </div>
  );
}

export default App;