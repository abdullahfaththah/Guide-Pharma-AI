import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Button } from '../components/Button';
import { FileText, Clock, ChevronRight, Eye, X, AlertTriangle } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ContextType {
  orders: Order[];
}

export const PendingOrders: React.FC = () => {
  const { orders } = useOutletContext<ContextType>();
  const pendingOrders = orders.filter(o => o.status === OrderStatus.Pending);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(15, 118, 110);
    doc.text("GUIDE-PHARMA - Pending Orders Report", 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableData = pendingOrders.map(order => [
      order.id,
      order.date,
      order.items.length,
      `Rs. ${order.totalAmount.toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [['Order ID', 'Date', 'Items Count', 'Total Amount']],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [15, 118, 110] }
    });

    doc.save("pending_orders.pdf");
  };

  if (pendingOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <Clock className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold mb-2">No Pending Orders</h2>
        <p>All your orders have been processed or you haven't placed any yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pending Orders</h2>
          <p className="text-gray-500">Track your orders currently in processing.</p>
        </div>
        <Button onClick={generatePDF} variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items Summary</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className="truncate block max-w-xs">
                      {order.items.map(i => `${i.medicine.name} (${i.quantity})`).join(', ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-primary">
                    Rs. {order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-primary hover:text-teal-800 font-medium text-xs inline-flex items-center bg-teal-50 px-2 py-1 rounded hover:bg-teal-100 transition-colors"
                    >
                      <Eye className="w-3 h-3 mr-1" /> View Items
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       {/* Order Details Modal */}
       {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Order Items: {selectedOrder.id}</h3>
                <p className="text-xs text-gray-500">{selectedOrder.date}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                {selectedOrder.items.map((item, index) => {
                  const isOutOfStock = item.fulfillmentStatus === 'OutOfStock';
                  return (
                    <div key={index} className={`flex items-start justify-between p-3 rounded-lg border ${isOutOfStock ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                      <div>
                        <div className="flex items-center gap-2">
                           <h4 className={`font-semibold ${isOutOfStock ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{item.medicine.name}</h4>
                           {isOutOfStock && (
                             <span className="inline-flex items-center text-xs font-bold text-red-600 bg-white px-2 py-0.5 rounded border border-red-200">
                               <AlertTriangle className="w-3 h-3 mr-1" /> Stock Finished
                             </span>
                           )}
                        </div>
                        <p className="text-sm text-gray-600">{item.medicine.packSize}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">Qty: {item.quantity}</p>
                        <p className="text-sm text-primary">Rs. {(item.medicine.packPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-end border-t border-gray-100 pt-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-primary">Rs. {selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};