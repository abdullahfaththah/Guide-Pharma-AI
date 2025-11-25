import React from 'react';
import { MapPin, Phone, Mail, User } from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        <p className="text-gray-500 mt-2">Get in touch with the GUIDE-PHARMA team.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="bg-primary p-8 md:w-2/5 text-white flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-1 opacity-80" />
                        <div>
                            <p className="font-medium opacity-90">Head Office</p>
                            <p className="text-sm opacity-75">100 Pharma Way, Industrial Park,<br/>Central City, 90210</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 opacity-80" />
                        <div>
                            <p className="font-medium opacity-90">Phone</p>
                            <p className="text-sm opacity-75">+1 (800) GUIDE-RX</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 opacity-80" />
                        <div>
                            <p className="font-medium opacity-90">Email</p>
                            <p className="text-sm opacity-75">support@guidepharma.com</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8">
                <p className="text-xs opacity-60">© 2024 GUIDE-PHARMA</p>
            </div>
        </div>

        <div className="p-8 md:w-3/5">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Key Contacts</h3>
            <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-full shadow-sm text-primary">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Johnathan Guide</h4>
                        <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">General Manager</p>
                        <p className="text-sm text-gray-600">For partnership and business inquiries.</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">+1 (800) 123-4567 ext 101</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-full shadow-sm text-primary">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Sarah Williams</h4>
                        <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">Sales Director</p>
                        <p className="text-sm text-gray-600">For bulk orders and account management.</p>
                         <p className="text-sm font-medium text-gray-800 mt-1">+1 (800) 123-4567 ext 105</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};