const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <footer className="bg-white text-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4 text-[#990100]">Prince Furniture</h3>
            <p className="text-gray-600">
              Jl. Komisaris Bambang Suprapto No.103, Cigrobak, Purwokerto Lor, Kec. Purwokerto Timur.<br />
              Kabupaten Banyumas, Jawa Tengah 53111
            </p>
            <p className="text-gray-600 mt-2">+62 851-0063-1631</p>
            <p className="text-gray-600">princefurniturepwt@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4 text-[#990100]">Quick Links</h3>
            <ul className="space-y-2">
              <li><a onClick={(e) => { e.preventDefault(); scrollToSection('beranda'); }} href="#beranda" className="text-gray-600 hover:text-[#990100] transition-colors duration-300 cursor-pointer">Beranda</a></li>
              <li><a onClick={(e) => { e.preventDefault(); scrollToSection('produk'); }} href="#produk" className="text-gray-600 hover:text-[#990100] transition-colors duration-300 cursor-pointer">Produk</a></li>
              <li><a onClick={(e) => { e.preventDefault(); scrollToSection('tentang'); }} href="#tentang" className="text-gray-600 hover:text-[#990100] transition-colors duration-300 cursor-pointer">Tentang</a></li>
              <li><a onClick={(e) => { e.preventDefault(); scrollToSection('kontak'); }} href="#kontak" className="text-gray-600 hover:text-[#990100] transition-colors duration-300 cursor-pointer">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4 text-[#990100]">Ikuti Kami</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#990100] transition-colors duration-300">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#990100] transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#990100] transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#990100] transition-colors duration-300">LinkedIn</a></li>
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
