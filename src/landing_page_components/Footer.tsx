
const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Prince Furniture</h3>
            <p className="text-gray-600">
              123 Design Street<br />
              New York, NY 10001
            </p>
            <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
            <p className="text-gray-600">info@mobel.com</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#beranda" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Beranda</a></li>
              <li><a href="#produk" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Produk</a></li>
              <li><a href="#tentang" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Tentang</a></li>
              <li><a href="#kontak" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Ikuti Kami</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-8">
          &copy; {new Date().getFullYear()} Prince Furniture. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
