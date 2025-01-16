import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Sofa, Bed, UtensilsCrossed, Building2, BookOpen, LayoutGrid, ChevronLeft, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image_urls: string[]; // Updated to array
  stock: number;
  description: string;
  kode: string; // Tambahkan field kode
  discount: number;
};

type Category = {
  id: number;
  name: string;
  icon_component?: React.ReactNode;
};

const iconMap: {[key: string]: React.ReactNode} = {
  'default': <BookOpen size={20} />
};

const ITEMS_PER_PAGE = 20;

const Produk = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState<{[key: number]: number}>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : {};
    }
    return {};
  });
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_CATEGORIES_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const categoriesWithIcons = [
          {
            id: 0,
            name: 'Semua',
            icon_component: <LayoutGrid size={20} />
          },
          ...data.categories.map((cat: {id: number, name: string, icon?: string, icon_name?: string}) => ({
            id: cat.id,
            name: cat.name,
            icon_component: cat.icon_name ? iconMap[cat.icon_name] || iconMap['default'] : undefined
          }))
        ];
        setCategories(categoriesWithIcons);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_PRODUCTS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const fetchedProducts = data.products.map((product: Product) => ({
          ...product,
          image_url: product.image_urls[0] // Use first image as main image
        }));
        setProducts(fetchedProducts);
        
        // Update cart totals after products are loaded
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          updateCartTotals(parsedCart, fetchedProducts);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * (discount / 100));
  };

  const filteredProducts = selectedCategory === 'Semua' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const updateCartTotals = (newCart: {[key: number]: number}, productList: Product[] = products) => {
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
      
      // Cek apakah stok mencukupi
      if (product && currentQty < product.stock) {
        const newCart = {
          ...prev,
          [productId]: currentQty + 1
        };
        updateCartTotals(newCart);
        return newCart;
      }
      
      // Jika stok tidak mencukupi, kembalikan keranjang yang sama
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
      
      updateCartTotals(newCart);
      return newCart;
    });
  };

  const deleteFromCart = (productId: number) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      updateCartTotals(newCart);
      return newCart;
    });
  };

  const checkScroll = () => {
    if (categoryContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (categoryContainerRef.current) {
      const scrollAmount = 200;
      categoryContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cartItems') {
        const newCart = e.newValue ? JSON.parse(e.newValue) : {};
        setCartItems(newCart);
        updateCartTotals(newCart);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-20">Error: {error}</div>;
  }

  return (
    <section ref={sectionRef} className="py-5 bg-white" id="produk">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-[#990100]">Kategori Pilihan</h2>

        <div 
          className="sticky top-20 bg-white shadow-md z-40 py-4 mb-8"
          onMouseEnter={() => setShowNavButtons(true)} 
          onMouseLeave={() => setShowNavButtons(false)}
        >
          <div className="container mx-auto px-4">
            <div 
              ref={categoryContainerRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              onScroll={checkScroll}
            >
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all cursor-pointer
                    ${selectedCategory === category.name 
                      ? 'bg-[#990100] text-white' 
                      : 'text-gray-700 hover:text-[#990100]'}`}
                >
                  {category.icon_component}
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
            {showNavButtons && (
              <>
                {canScrollLeft && (
                  <div 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                  >
                    <ChevronLeft className="text-black" size={20} />
                  </div>
                )}
                {canScrollRight && (
                  <div
                    onClick={() => scroll('right')} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                  >
                    <ChevronRight className="text-black" size={20} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
          {currentProducts.map((product) => {
            const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
            return (
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
                  {product.discount > 0 ? (
                    <div>
                      <p className="text-xs sm:text-sm text-[#990100] font-semibold">{formatRupiah(discountedPrice)}</p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        <span className="line-through">{formatRupiah(product.price)}</span>
                        <span className="text-[10px] text-white bg-red-500 px-1 rounded">-{product.discount}%</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-[#990100] font-semibold">{formatRupiah(product.price)}</p>
                  )}
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
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum
                    ? 'bg-[#990100] text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Widget */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
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
  );
};

export default Produk;
