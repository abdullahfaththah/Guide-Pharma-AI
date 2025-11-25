import React, { useState } from 'react';
import { HashRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { NewOrder } from './pages/NewOrder';
import { PendingOrders } from './pages/PendingOrders';
import { OrderHistory } from './pages/OrderHistory';
import { UserProfile } from './pages/UserProfile';
import { SmartSearch } from './pages/SmartSearch';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Cart } from './pages/Cart';
import { getMedicines, getUser, getInitialOrders } from './services/dataService';
import { Medicine, Order, OrderStatus } from './types';
import { Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [medicines] = useState(getMedicines());
  const [user] = useState(getUser());
  const [orders, setOrders] = useState<Order[]>(getInitialOrders());
  const [cart, setCart] = useState<{ medicine: Medicine; quantity: number }[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const addToCart = (medicine: Medicine, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map(item => 
          item.medicine.id === medicine.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { medicine, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.medicine.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
        if (item.medicine.id === id) {
            const newQuantity = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQuantity };
        }
        return item;
    }));
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const totalAmount = cart.reduce((sum, item) => sum + (item.medicine.packPrice * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      status: OrderStatus.Pending,
      items: cart.map(item => ({...item, fulfillmentStatus: 'Fulfilled'})), // Default to fulfilled
      totalAmount
    };

    setOrders([newOrder, ...orders]);
    setCart([]); // Clear cart
    alert(`Order ${newOrder.id} placed successfully!`);
    navigate('/pending');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out bg-white shadow-2xl md:shadow-none
        w-64
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:sticky md:top-0 md:h-screen
      `}>
         <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <span className="font-bold text-lg text-teal-800 tracking-tight">GUIDE-PHARMA</span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1">
          <Outlet context={{ medicines, user, orders, addToCart, removeFromCart, updateCartQuantity, cart, placeOrder }} />
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewOrder />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pending" element={<PendingOrders />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="smart-search" element={<SmartSearch />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}