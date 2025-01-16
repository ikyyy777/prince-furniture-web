import { Routes, Route } from 'react-router-dom';
import Index from './pages/index/Index';
import ResellerInfoPage from './pages/reseller_info_page/ResellerInfoPage';
import Cart from './pages/cart/Cart';
import SearchProductPage from './pages/search_product/SearchProductPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/reseller" element={<ResellerInfoPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchProductPage />} />
    </Routes>
  );
}

export default App;