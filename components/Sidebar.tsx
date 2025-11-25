import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Clock, 
  History, 
  User, 
  BrainCircuit,
  Pill,
  Info,
  Phone,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navItems = [
    { to: "/", label: "New Order", icon: LayoutDashboard },
    { to: "/smart-search", label: "AI Smart Search", icon: BrainCircuit },
    { to: "/pending", label: "Pending Orders", icon: Clock },
    { to: "/history", label: "Order History", icon: History },
    { to: "/about", label: "About Us", icon: Info },
    { to: "/contact", label: "Contact Us", icon: Phone },
    { to: "/cart", label: "My Cart", icon: ShoppingCart },
    { to: "/profile", label: "My Profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Pill className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">GUIDE-PHARMA</h1>
            <p className="text-xs text-gray-500 font-medium">Distribution System</p>
          </div>
        </div>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="md:hidden p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-teal-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-accent rounded-lg p-4">
          <p className="text-xs text-teal-800 font-semibold mb-1">Need Help?</p>
          <p className="text-xs text-teal-600">Contact support at +1-800-GUIDE-RX</p>
        </div>
      </div>
    </aside>
  );
};