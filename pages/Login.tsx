import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Button } from '../components/Button';
import { Shield, Lock, User, Building, MapPin, Phone, FileBadge, CreditCard, Eye, EyeOff } from 'lucide-react';
import { getUser } from '../services/dataService';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    pharmacyName: '',
    shopAddress: '',
    personalAddress: '',
    phone: '',
    licenseNumber: '',
    nic: ''
  });
  
  // Mock login credentials state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // Mock Login Validation
      if (email && password) {
        // For demo purposes, we load the mock user from dataService
        const mockUser = getUser();
        onLogin(mockUser);
      } else {
        alert("Please enter any email and password to demo.");
      }
    } else {
      // Signup Validation
      if (
        formData.name && 
        formData.pharmacyName && 
        formData.shopAddress && 
        formData.personalAddress && 
        formData.phone && 
        formData.licenseNumber && 
        formData.nic
      ) {
        // Create new user from form data
        const newUser: UserProfile = {
          name: formData.name!,
          pharmacyName: formData.pharmacyName!,
          shopAddress: formData.shopAddress!,
          personalAddress: formData.personalAddress!,
          phone: formData.phone!,
          licenseNumber: formData.licenseNumber!,
          nic: formData.nic!,
          photoUrl: undefined // Default empty photo
        };
        onLogin(newUser);
      } else {
        alert("Please fill in all fields.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding & Info */}
        <div className="md:w-5/12 bg-primary p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Building className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">GUIDE-PHARMA</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {isLoginMode ? "Welcome Back!" : "Join Our Network"}
            </h2>
            <p className="text-teal-100 leading-relaxed opacity-90">
              The comprehensive medicine distribution management system designed for modern pharmacies. 
              Manage orders, track inventory, and leverage AI to serve your patients better.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-teal-800/50 p-4 rounded-xl border border-teal-600/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2 font-semibold text-teal-100">
                <Shield className="w-5 h-5 text-teal-300" />
                PII Protection Guarantee
              </div>
              <p className="text-xs text-teal-200">
                We take your privacy seriously. All Personally Identifiable Information (NIC, Addresses, License details) 
                is encrypted and stored securely according to data protection regulations. Your data is never shared 
                without consent.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-sm font-medium text-primary hover:text-teal-800 transition-colors"
            >
              {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isLoginMode ? "Log In to Your Account" : "Create Pharmacy Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isLoginMode ? (
              // LOGIN FORM
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email or License No</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
              </div>
            ) : (
              // SIGNUP FORM
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Pharmacist Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        name="name"
                        required
                        type="text"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        placeholder="Dr. John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Pharmacy Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        name="pharmacyName"
                        required
                        type="text"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        placeholder="City Care Pharmacy"
                        value={formData.pharmacyName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contact Number</label>
                   <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        name="phone"
                        required
                        type="tel"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        placeholder="+94 77 123 4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">License Number</label>
                    <div className="relative">
                      <FileBadge className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        name="licenseNumber"
                        required
                        type="text"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        placeholder="PH-123456"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">NIC Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        name="nic"
                        required
                        type="text"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        placeholder="200012345678"
                        value={formData.nic}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Shop Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea 
                      name="shopAddress"
                      required
                      rows={2}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Registered business address..."
                      value={formData.shopAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Personal Address (Protected PII)</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 w-4 h-4 text-teal-500" />
                    <textarea 
                      name="personalAddress"
                      required
                      rows={2}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-teal-200 bg-teal-50/30 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Home address (Securely stored)..."
                      value={formData.personalAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full shadow-lg shadow-teal-700/20">
                {isLoginMode ? "Log In" : "Create Secure Account"}
              </Button>
            </div>
          </form>

          <p className="text-center mt-6 text-xs text-gray-400">
            By accessing GUIDE-PHARMA, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};