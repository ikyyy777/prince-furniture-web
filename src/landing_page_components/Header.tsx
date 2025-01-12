import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center">
            <img src="./src/assets/logo.png" alt="Prince Furniture Logo" className="h-8 mr-2" />
            <span className="text-2xl font-semibold" style={{ color: '#980201' }}>Prince Furniture</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {['Beranda', 'Produk', 'Tentang', 'Kontak'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-black transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor link behavior
                  scrollToSection(item.toLowerCase());
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 bg-white shadow-lg">
          {['Beranda', 'Produk', 'Tentang', 'Kontak'].map((item) => (
            <a
              key={item}
              href="#"
              className="block py-3 text-gray-700 hover:text-black transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor link behavior
                scrollToSection(item.toLowerCase());
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
