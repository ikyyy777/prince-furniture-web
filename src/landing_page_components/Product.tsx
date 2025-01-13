import { useState } from 'react';
import { Eye } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number; // Menambahkan properti stock
};

const categories = ['Semua', 'Ruang Tamu', 'Kamar Tidur', 'Ruang Makan', 'Kantor'];

const products: Product[] = [
  {
    id: 1,
    name: 'Sofa Modern',
    category: 'Ruang Tamu',
    price: 1299000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    stock: 10,
  },
  {
    id: 2,
    name: 'Rangka Tempat Tidur Minimalis',
    category: 'Kamar Tidur',
    price: 899000,
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
    stock: 5,
  },
  {
    id: 3,
    name: 'Set Meja Makan',
    category: 'Ruang Makan',
    price: 1599000,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    stock: 8,
  },
  {
    id: 4,
    name: 'Kursi Ergonomis',
    category: 'Kantor',
    price: 499000,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80',
    stock: 15,
  },
];

const Produk = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (product) => selectedCategory === 'Semua' || product.category === selectedCategory
  );

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  };

  return (
    <section className="py-20 bg-gray-50" id="produk">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-black">Produk Kami</h2>

        <div className="flex flex-wrap justify-center mb-12 space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 mb-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-600">{formatRupiah(product.price)}</p>
                <p className="text-gray-600">Stok: {product.stock}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(product)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Eye size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
            Lihat semua produk
          </button>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-medium text-gray-900">{selectedProduct.name}</h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-xl text-gray-700 mb-4">
                {formatRupiah(selectedProduct.price)}
              </p>
              <p className="text-gray-600 mb-4">Stok: {selectedProduct.stock}</p>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Produk;
