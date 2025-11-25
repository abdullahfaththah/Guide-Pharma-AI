import React, { useState, useMemo } from 'react';
import { Medicine, MedicineCategory } from '../types';
import { Button } from '../components/Button';
import { Search, Filter, Plus, ShoppingCart, Minus } from 'lucide-react';
import { useOutletContext, Link } from 'react-router-dom';

interface ContextType {
  medicines: Medicine[];
  addToCart: (medicine: Medicine, quantity: number) => void;
  cart: { medicine: Medicine; quantity: number }[];
}

export const NewOrder: React.FC = () => {
  const { medicines, addToCart, cart } = useOutletContext<ContextType>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = ['All', ...Object.values(MedicineCategory)];

  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [medicines, searchTerm, selectedCategory]);

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const getQuantity = (id: string) => quantities[id] || 1;

  const handleAddToCart = (med: Medicine) => {
    addToCart(med, getQuantity(med.id));
    setQuantities(prev => ({ ...prev, [med.id]: 1 })); // Reset quantity after adding
  };

  const cartItemCount = cart.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">New Order</h2>
          <p className="text-gray-500">Browse medicines and add to your wholesale order.</p>
        </div>
        
        <Link to="/cart">
          <Button variant={cartItemCount > 0 ? 'primary' : 'outline'} className="relative">
             <ShoppingCart className="w-5 h-5 mr-2" />
             Go to Cart
             {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartItemCount}
                </span>
             )}
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="h-5 w-5 text-gray-400 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMedicines.map(med => (
          <div key={med.id} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-md">
                  {med.category}
                </span>
                <span className="text-lg font-bold text-primary">Rs. {med.packPrice.toFixed(2)}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{med.name}</h3>
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>Pack: <span className="font-medium text-gray-700">{med.packSize}</span></p>
                <p>Retail (Single): <span className="font-medium text-gray-700">Rs. {med.singlePrice.toFixed(2)}</span></p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => handleQuantityChange(med.id, -1)}
                  className="p-2 hover:bg-gray-100 text-gray-600 rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium text-gray-700">{getQuantity(med.id)}</span>
                <button 
                  onClick={() => handleQuantityChange(med.id, 1)}
                  className="p-2 hover:bg-gray-100 text-gray-600 rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button onClick={() => handleAddToCart(med)} className="flex-1">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
        {filteredMedicines.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No medicines found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};