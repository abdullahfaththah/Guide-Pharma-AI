import React, { useState } from 'react';
import { UserProfile as UserProfileType } from '../types';
import { User, MapPin, Phone, FileBadge, Building, CreditCard, Shield, Eye, EyeOff, LogOut } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Button } from '../components/Button';

interface ContextType {
  user: UserProfileType;
  onLogout: () => void;
}

export const UserProfile: React.FC = () => {
  const { user, onLogout } = useOutletContext<ContextType>();
  const [showPII, setShowPII] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          <p className="text-gray-500">Manage your pharmacy details and personal information.</p>
        </div>
        <Button 
            onClick={onLogout} 
            variant="danger" 
            className="flex items-center gap-2 shadow-sm"
        >
            <LogOut className="w-4 h-4" /> Log Out
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 h-32 relative">
            <div className="absolute -bottom-10 left-6 md:left-8 bg-white p-2 rounded-full border-4 border-white shadow-md">
                {user.photoUrl ? (
                    <img src={user.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-teal-700">
                        <User className="w-10 h-10" />
                    </div>
                )}
            </div>
            <div className="absolute bottom-4 right-4">
                <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setShowPII(!showPII)}
                    className="shadow-sm opacity-90 hover:opacity-100"
                >
                    {showPII ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showPII ? 'Hide PII' : 'View PII'}
                </Button>
            </div>
        </div>
        
        <div className="pt-14 pb-8 px-6 md:px-8 space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-gray-900">{user.pharmacyName}</h3>
                <p className="text-teal-600 font-medium text-lg">{user.name}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Public / Business Info */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Business Details</h4>
                    
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500 shrink-0">
                            <Building className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Shop Address</p>
                            <p className="text-gray-900">{user.shopAddress}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500 shrink-0">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Contact Number</p>
                            <p className="text-gray-900">{user.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500 shrink-0">
                            <FileBadge className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">License Number</p>
                            <p className="text-gray-900 font-mono bg-gray-50 px-2 py-0.5 rounded inline-block">
                                {user.licenseNumber}
                            </p>
                        </div>
                    </div>
                </div>

                {/* PII Section */}
                <div className={`space-y-4 transition-all duration-300 ${showPII ? 'opacity-100' : 'opacity-40 blur-[2px] select-none'}`}>
                    <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Sensitive PII
                    </h4>
                    
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-teal-50 rounded-lg text-teal-600 shrink-0">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">NIC Number</p>
                            <p className="text-gray-900 font-mono">{showPII ? user.nic : '•••••••••V'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-teal-50 rounded-lg text-teal-600 shrink-0">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Personal Address</p>
                            <p className="text-gray-900">{showPII ? user.personalAddress : '••••••••••••••••••••••••'}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {!showPII && (
                <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Sensitive Personal Identifiable Information (PII) is hidden for privacy. Click "View PII" to reveal.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};