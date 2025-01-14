import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Sofa, Bed, UtensilsCrossed, Building2, BookOpen, LayoutGrid, ChevronDown, X, ChevronLeft, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
};

type Category = {
  name: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Sofa Modern',
    category: 'Sofa',
    price: 1299000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    stock: 10,
  },
  {
    id: 2,
    name: 'Rangka Tempat Tidur Minimalis',
    category: 'Kasur',
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
  {
    id: 5,
    name: 'Lemari Pakaian Modern', 
    category: 'Lemari',
    price: 2499000,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    stock: 7,
  },
  {
    id: 6,
    name: 'Lemari Buku Minimalis',
    category: 'Lemari',
    price: 1899000,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80',
    stock: 4,
  }
];

const categories: Category[] = [
  {
    name: 'Semua',
    icon: <LayoutGrid size={20} />
  },
  {
    name: 'Sofa',
    icon: <Sofa size={20} />
  },
  {
    name: 'Kasur',
    icon: <Bed size={20} />
  },
  {
    name: 'Ruang Makan',
    icon: <UtensilsCrossed size={20} />
  },
  {
    name: 'Kantor',
    icon: <Building2 size={20} />
  },
  {
    name: 'Lemari',
    icon: <BookOpen size={20} />
  }
];

const allCategories: Category[] = [
  ...categories,
  { name: 'Meja', icon: <BookOpen size={20} /> },
  { name: 'Kursi', icon: <BookOpen size={20} /> },
  { name: 'Rak', icon: <BookOpen size={20} /> },
  { name: 'Dekorasi', icon: <BookOpen size={20} /> },
  { name: 'Lampu', icon: <BookOpen size={20} /> },
  { name: 'Karpet', icon: <BookOpen size={20} /> }
];

const Produk = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const categoryContainerRef = useRef<HTMLDivElement>(null);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  };

  const filteredProducts = selectedCategory === 'Semua' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const updateCartTotals = (newCart: {[key: number]: number}) => {
    let items = 0;
    let price = 0;
    Object.entries(newCart).forEach(([id, quantity]) => {
      items += quantity;
      const product = products.find(p => p.id === Number(id));
      if (product) {
        price += product.price * quantity;
      }
    });
    
    setTotalItems(items);
    setTotalPrice(price);
  };

  const addToCart = (productId: number) => {
    setCartItems(prev => {
      const newCart = {
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      };
      updateCartTotals(newCart);
      return newCart;
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

  const handleCloseModal = () => {
    setShowAllCategories(false);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
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

  return (
    <section className="py-20 bg-white" id="produk">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-[#990100]">Pilihan Furniture</h2>

        <div className="relative mb-8" onMouseEnter={() => setShowNavButtons(true)} onMouseLeave={() => setShowNavButtons(false)}>
          <div 
            ref={categoryContainerRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            onScroll={checkScroll}
          >
            {categories.slice(0, 5).map((category) => (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all cursor-pointer
                  ${selectedCategory === category.name 
                    ? 'bg-[#990100] text-white' 
                    : 'text-gray-700 hover:text-[#990100]'}`}
              >
                {category.icon}
                <span>{category.name}</span>
              </div>
            ))}
            <button
              onClick={() => setShowAllCategories(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <span>Lainnya</span>
              <ChevronDown size={16} />
            </button>
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

          {showAllCategories && (
            <div 
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={handleClickOutside}
            >
              <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Semua Kategori</h3>
                  <div 
                    onClick={handleCloseModal}
                    className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                  >
                    <X size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {allCategories.map((category) => (
                    <div
                      key={category.name}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        handleCloseModal();
                      }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all cursor-pointer
                        ${selectedCategory === category.name 
                          ? 'bg-[#990100] text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                    >
                      {category.icon}
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gradient-to-br from-white to-[#990100]/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#990100]/20 w-full h-[400px] md:h-[450px] hover:scale-[1.02]"
            >
              <div className="relative w-full h-[200px] md:h-[250px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-sm md:text-xl font-medium mb-2 text-gray-900">{product.name}</h3>
                <p className="text-sm md:text-base text-[#990100] font-semibold">{formatRupiah(product.price)}</p>
                <p className="text-sm md:text-base text-gray-600">Stok: {product.stock}</p>
                {cartItems[product.id] ? (
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 bg-[#990100] text-white rounded-lg hover:bg-[#990100]/90"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-gray-900">{cartItems[product.id]}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="p-2 bg-[#990100] text-white rounded-lg hover:bg-[#990100]/90"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => deleteFromCart(product.id)}
                      className="p-2 bg-red-100 rounded-lg hover:bg-red-200 ml-auto"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product.id)}
                    className="mt-4 w-full flex items-center justify-center gap-1 md:gap-2 bg-[#990100] text-white py-2 px-2 md:px-4 rounded-lg hover:bg-[#990100]/90 transition-colors whitespace-nowrap"
                  >
                    <ShoppingCart size={16} className="md:w-5 md:h-5" />
                    <span className="text-[11px] md:text-base truncate">
                      Tambah pesanan
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Widget */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShoppingCart size={24} className="text-[#990100]" />
                <span className="font-medium text-gray-900">{totalItems} item</span>
              </div>
              <div className="text-[#990100] font-semibold">
                {formatRupiah(totalPrice)}
              </div>
            </div>
            <button 
              className="bg-[#990100] text-white px-6 py-2 rounded-lg hover:bg-[#990100]/90 transition-colors"
              onClick={() => {/* Handle checkout */}}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Produk;
