import { Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import ResellerInfoPage from './pages/reseller_info_page/reseller_info_page';
import Cart from './pages/cart/cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/reseller" element={<ResellerInfoPage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;