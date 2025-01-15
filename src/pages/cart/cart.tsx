import { useState, useEffect } from 'react';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image_urls: string[]; // Updated to array
  quantity: number;
}

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image_urls: string[]; // Updated to array
  stock: number;
  description: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_PRODUCTS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && products.length > 0) {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const cartItemsArray = Object.entries(parsedCart).map(([id, quantity]) => {
          const product = products.find(p => p.id === Number(id));
          return {
            id: Number(id),
            name: product?.name || '',
            price: product?.price || 0,
            image_urls: product?.image_urls || [], // Updated to array
            quantity: quantity as number
          };
        });
        setCartItems(cartItemsArray);
      }
    }
  }, [products]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      ).filter(item => item.quantity > 0);

      const cartObject = updatedItems.reduce((obj, item) => ({
        ...obj,
        [item.id]: item.quantity
      }), {});

      localStorage.setItem('cartItems', JSON.stringify(cartObject));
      return updatedItems;
    });
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      const cartObject = updatedItems.reduce((obj, item) => ({
        ...obj,
        [item.id]: item.quantity
      }), {});

      localStorage.setItem('cartItems', JSON.stringify(cartObject));
      return updatedItems;
    });
  };

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-[#990100]">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Keranjang belanja Anda masih kosong</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 mb-4 border border-[#990100]/20">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image_urls[0]} // Use first image from array
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-[#990100] font-semibold mt-1">
                        {formatRupiah(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-2 bg-[#990100] text-white rounded-lg hover:bg-[#990100]/90"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 bg-[#990100] text-white rounded-lg hover:bg-[#990100]/90"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 bg-red-100 rounded-lg hover:bg-red-200 ml-auto"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-[#990100]/20 sticky top-4">
                <h3 className="text-xl font-bold mb-6 text-black">Ringkasan Belanja</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Item</span>
                    <span className="font-medium text-black">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Harga</span>
                    <span className="font-semibold text-[#990100]">{formatRupiah(totalPrice)}</span>
                  </div>
                  <button className="w-full bg-[#990100] text-white py-3 rounded-lg hover:bg-[#990100]/90 transition-colors">
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
