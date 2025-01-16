import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Sofa, Bed, UtensilsCrossed, Building2, BookOpen, LayoutGrid, ChevronLeft, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../../public_components/Header';
import Footer from '../../public_components/Footer';

type Product = {
  id: number;
  name: string; 
  category: string;
  price: number;
  image_urls: string[];
  stock: number;
  description: string;
  kode: string;
};

const SearchProductPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : {};
    }
    return {};
  });
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Scroll ke atas saat komponen dimount
    window.scrollTo(0, 0);
    
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_PRODUCTS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch all products');
        }
        const data = await response.json();
        setAllProducts(data.products);
      } catch (err) {
        console.error('Error fetching all products:', err);
      }
    };

    const fetchSearchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCTS_API_URL}?search=${searchQuery}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const fetchedProducts = data.products.map((product: Product) => ({
          ...product,
          image_url: product.image_urls[0]
        }));
        setProducts(fetchedProducts);
        
        // Update cart totals after products are loaded
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          updateCartTotals(parsedCart, allProducts); // Use allProducts here
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchAllProducts();
    fetchSearchProducts();
  }, [searchQuery]);

  // Mendengarkan perubahan localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cartItems') {
        const newCart = e.newValue ? JSON.parse(e.newValue) : {};
        setCartItems(newCart);
        updateCartTotals(newCart, allProducts); // Use allProducts here
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [allProducts]); // Add allProducts as dependency

  // Update cart totals saat products atau allProducts berubah
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      updateCartTotals(parsedCart, allProducts); // Use allProducts here
    }
  }, [products, allProducts]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  };

  const updateCartTotals = (newCart: {[key: number]: number}, productList: Product[] = allProducts) => {
    let items = 0;
    let price = 0;
    Object.entries(newCart).forEach(([id, quantity]) => {
      items += quantity;
      const product = productList.find(p => p.id === Number(id));
      if (product) {
        price += product.price * quantity;
      }
    });
    
    setTotalItems(items);
    setTotalPrice(price);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(newCart));
    }
  };

  const addToCart = (productId: number) => {
    setCartItems(prev => {
      const product = products.find(p => p.id === productId);
      const currentQty = prev[productId] || 0;
      
      if (product && currentQty < product.stock) {
        const newCart = {
          ...prev,
          [productId]: currentQty + 1
        };
        updateCartTotals(newCart, allProducts); // Use allProducts here
        return newCart;
      }
      
      return prev;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const currentQty = prev[productId] || 0;
      const newCart = { ...prev };
      
      if (currentQty <= 1) {
        delete newCart[productId];
      } else {
        newCart[productId] = currentQty - 1;
      }
      
      updateCartTotals(newCart, allProducts); // Use allProducts here
      return newCart;
    });
  };

  const deleteFromCart = (productId: number) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      updateCartTotals(newCart, allProducts); // Use allProducts here
      return newCart;
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-[#990100] rounded-full animate-spin"></div>
          <p className="mt-2 text-sm text-gray-500">Memuat...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
          <p className="text-xl">Error: {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-20">
          <h2 className="text-2xl font-bold mb-12 text-[#990100]">
            Hasil Pencarian: "{searchQuery}"
          </h2>

          {products.length === 0 ? (
            <div className="min-h-[60vh] flex items-center justify-center text-center text-gray-600">
              Tidak ada produk yang ditemukan
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-gradient-to-br from-white to-[#990100]/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#990100]/20 w-full max-w-[204px] h-[350px] hover:scale-[1.02]"
                >
                  <div className="relative w-full pt-[100%]">
                    <img
                      src={product.image_urls[0]}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src="./assets/logo.png"
                        alt="Prince Furniture Watermark"
                        className="w-1/3 h-1/3 object-contain opacity-30"
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs sm:text-sm font-medium mb-1 text-gray-900 truncate">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-[#990100] font-semibold">{formatRupiah(product.price)}</p>
                    <p className="text-xs text-gray-600">Stok: {product.stock}</p>
                    <p className="text-xs text-gray-600">Kode: {product.kode}</p>
                    <button
                      className="mt-2 w-full flex items-center justify-center gap-1 py-1 px-2 rounded-lg transition-colors whitespace-nowrap bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                    >
                      <span className="text-[10px] truncate">Lihat Produk</span>
                    </button>
                    {cartItems[product.id] ? (
                      <div className="mt-2 flex items-center gap-1">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1 bg-[#990100] text-white rounded-lg hover:bg-[#990100]/90"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-medium text-gray-900">{cartItems[product.id]}</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="p-1 bg-[#990100] text-white rounded-lg hover:bg-[#990100]/90"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => deleteFromCart(product.id)}
                          className="p-1 bg-red-100 rounded-lg hover:bg-red-200 ml-auto"
                        >
                          <Trash2 size={12} className="text-red-600" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                        className={`mt-2 w-full flex items-center justify-center gap-1 py-1 px-2 rounded-lg transition-colors whitespace-nowrap ${
                          product.stock === 0 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#990100] text-white hover:bg-[#990100]/90'
                        }`}
                      >
                        <ShoppingCart size={12} />
                        <span className="text-[10px] truncate">
                          {product.stock === 0 ? 'Stok Habis' : 'Tambah'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Cart Widget */}
        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={24} className="text-[#990100]" />
                  <span className="font-medium text-gray-900">{totalItems} item</span>
                </div>
                <div className="text-[#990100] font-semibold">
                  {formatRupiah(totalPrice)}
                </div>
                <p className="text-sm text-gray-600 hidden md:block">Yuk, selesaikan pesananmu!</p>
              </div>
              <a 
                href="/cart"
                className="bg-[#990100] text-white px-6 py-2 rounded-lg hover:bg-[#990100]/90 hover:text-yellow-300 transition-colors flex items-center gap-2"
              >
                <span>Checkout</span>
              </a>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default SearchProductPage;
