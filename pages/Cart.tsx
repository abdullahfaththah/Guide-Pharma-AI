import React from 'react';
import { Medicine } from '../types';
import { Button } from '../components/Button';
import { ShoppingCart, Trash2, Plus, Minus, FileDown, ArrowRight } from 'lucide-react';
import { useOutletContext, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ContextType {
  cart: { medicine: Medicine; quantity: number }[];
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  placeOrder: () => void;
}

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, placeOrder } = useOutletContext<ContextType>();

  const totalAmount = cart.reduce((sum, item) => sum + (item.medicine.packPrice * item.quantity), 0);

  const generateCartPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(15, 118, 110);
    doc.text("GUIDE-PHARMA - Cart Quote", 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableData = cart.map(item => [
      item.medicine.name,
      item.medicine.packSize,
      item.quantity,
      `Rs. ${item.medicine.packPrice.toFixed(2)}`,
      `Rs. ${(item.medicine.packPrice * item.quantity).toFixed(2)}`
    ]);

    tableData.push(['', '', '', 'TOTAL', `Rs. ${totalAmount.toFixed(2)}`]);

    autoTable(doc, {
      head: [['Medicine', 'Pack Size', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [15, 118, 110] }
    });

    doc.save("guide_pharma_cart.pdf");
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="bg-gray-100 p-6 rounded-full">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added any medicines yet.</p>
        <Link to="/">
            <Button>Start Ordering</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Cart</h2>
          <p className="text-gray-500">Review your wholesale items before placing the order.</p>
        </div>
        <Button onClick={generateCartPDF} variant="outline" className="flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            Download Quote PDF
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
                <div key={item.medicine.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-bold text-gray-900">{item.medicine.name}</h4>
                        <p className="text-sm text-gray-500">{item.medicine.packSize} • {item.medicine.category}</p>
                        <p className="text-sm font-medium text-primary mt-1">Rs. {item.medicine.packPrice.toFixed(2)} / pack</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                                onClick={() => updateCartQuantity(item.medicine.id, -1)}
                                className="p-2 hover:bg-gray-100 text-gray-600 rounded-l-lg"
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-700">{item.quantity}</span>
                            <button 
                                onClick={() => updateCartQuantity(item.medicine.id, 1)}
                                className="p-2 hover:bg-gray-100 text-gray-600 rounded-r-lg"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="w-24 text-right font-bold text-gray-800">
                            Rs. {(item.medicine.packPrice * item.quantity).toFixed(2)}
                        </div>
                        <button 
                            onClick={() => removeFromCart(item.medicine.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove item"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cart.length} items)</span>
                        <span>Rs. {totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Tax (Estimated)</span>
                        <span>Rs. 0.00</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-primary">Rs. {totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <Button onClick={placeOrder} size="lg" className="w-full flex justify-center items-center gap-2 shadow-lg shadow-teal-700/20">
                    Place Order <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">
                    By placing order you agree to our terms of service.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};