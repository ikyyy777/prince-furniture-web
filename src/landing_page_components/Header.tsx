import { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi pencarian
    console.log('Searching for:', searchQuery);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center">
            <img src="./assets/logo.png" alt="Prince Furniture Logo" className="h-8 mr-2" />
            <span className="text-2xl font-semibold hidden md:block" style={{ color: '#980201' }}>Prince Furniture</span>
          </a>

          <div className="flex-1 mx-4 md:mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari Produk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#980201] focus:ring-2 focus:ring-[#980201]/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
              />
              <div 
                onClick={() => handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#980201] transition-colors duration-300 cursor-pointer bg-transparent p-1 rounded-full hover:bg-gray-100"
              >
                <Search size={20} />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/cart"
              className="relative p-2 text-gray-500 hover:text-[#980201] transition-colors duration-300 cursor-pointer bg-transparent hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 bg-[#980201] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </a>
            <a 
              href="/reseller" 
              className="px-4 py-2 bg-[#980201] text-white rounded-full hover:bg-[#980201]/90 hover:text-yellow-300 transition-colors duration-300 text-sm font-medium"
            >
              Reseller
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
