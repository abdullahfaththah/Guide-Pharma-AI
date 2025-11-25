import React from 'react';
import { Truck, ShieldCheck, Clock, Users } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">About GUIDE-PHARMA</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are dedicated to streamlining pharmaceutical distribution with cutting-edge technology 
          and reliable logistics, ensuring healthcare providers get what they need, when they need it.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">How The System Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
                <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold text-xl">1</div>
                <h4 className="font-semibold text-gray-800">Browse & Select</h4>
                <p className="text-gray-600 text-sm">
                    Search our extensive inventory of wholesale medicines or use our AI Smart Search to find products by condition.
                </p>
            </div>
            <div className="space-y-3">
                <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold text-xl">2</div>
                <h4 className="font-semibold text-gray-800">Add to Cart & Order</h4>
                <p className="text-gray-600 text-sm">
                    Build your wholesale order with transparent pricing. Generate PDF quotes instantly before finalizing.
                </p>
            </div>
            <div className="space-y-3">
                <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold text-xl">3</div>
                <h4 className="font-semibold text-gray-800">Delivery & Tracking</h4>
                <p className="text-gray-600 text-sm">
                    Choose your delivery method and track your shipment in real-time through your order history.
                </p>
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Delivery Options</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span>Standard Delivery</span>
                    <span className="font-semibold text-primary">2-3 Business Days</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span>Express Delivery</span>
                    <span className="font-semibold text-primary">Next Day</span>
                </li>
                <li className="flex justify-between items-center">
                    <span>Cold Chain (Insulin/Vaccines)</span>
                    <span className="font-semibold text-primary">Special Handling</span>
                </li>
            </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Why Choose Us?</h3>
            </div>
            <div className="space-y-4">
                <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-teal-500 shrink-0" />
                    <p className="text-sm text-gray-600">24/7 Ordering System available anytime.</p>
                </div>
                <div className="flex gap-3">
                    <Users className="w-5 h-5 text-teal-500 shrink-0" />
                    <p className="text-sm text-gray-600">Dedicated support team for pharmacists.</p>
                </div>
                <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0" />
                    <p className="text-sm text-gray-600">Verified authentic pharmaceuticals directly from manufacturers.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};