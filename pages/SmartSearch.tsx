import React, { useState } from 'react';
import { Button } from '../components/Button';
import { checkAndRequestApiKey, filterMedicinesByQuery } from '../services/geminiService';
import { BrainCircuit, Search, ShoppingCart, Plus, Minus, AlertCircle } from 'lucide-react';
import { Medicine } from '../types';
import { useOutletContext } from 'react-router-dom';

interface ContextType {
  medicines: Medicine[];
  addToCart: (medicine: Medicine, quantity: number) => void;
  cart: { medicine: Medicine; quantity: number }[];
}

export const SmartSearch: React.FC = () => {
  const { medicines, addToCart, cart } = useOutletContext<ContextType>();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Medicine[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const getQuantity = (id: string) => quantities[id] || 1;

  const handleAddToCart = (med: Medicine) => {
    addToCart(med, getQuantity(med.id));
    setQuantities(prev => ({ ...prev, [med.id]: 1 }));
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setResults(null);

    const hasKey = await checkAndRequestApiKey();
    if (!hasKey) {
        setError("API Key is required to use AI Smart Search.");
        setIsSearching(false);
        return;
    }

    try {
      const matchedIds = await filterMedicinesByQuery(query, medicines);
      const matchedMedicines = medicines.filter(m => matchedIds.includes(m.id));
      setResults(matchedMedicines);
    } catch (e) {
      setError("Failed to search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BrainCircuit className="text-teal-500" />
          AI Smart Search
        </h2>
        <p className="text-gray-500">
          Search for medicines by Organ (e.g., "Eye", "Heart") or Disease (e.g., "Cancer", "Flu").
          The AI will find relevant products from our inventory.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. 'Medicines for eye infection' or 'Cancer treatment'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isSearching || !query}
            size="lg"
            className="md:w-48"
          >
            {isSearching ? 'Analyzing...' : 'Find Medicines'}
          </Button>
        </div>
        {error && (
            <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
            </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {results !== null && (
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Found {results.length} results for "{query}"</h3>
            {results.length === 0 && (
              <p className="text-gray-500 text-sm">Try a different term or check spelling.</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results?.map(med => (
             <div key={med.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded">
                        {med.category}
                        </span>
                        <span className="font-bold text-primary">Rs. {med.packPrice.toFixed(2)}</span>
                    </div>
                    <h4 className="font-bold text-gray-800">{med.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{med.packSize}</p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                     <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                        <button 
                            onClick={() => handleQuantityChange(med.id, -1)}
                            className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-l-lg"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm text-gray-700">{getQuantity(med.id)}</span>
                        <button 
                            onClick={() => handleQuantityChange(med.id, 1)}
                            className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-r-lg"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                    <Button onClick={() => handleAddToCart(med)} size="sm" className="flex-1">
                        Add to Cart
                    </Button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};