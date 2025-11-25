export enum MedicineCategory {
  Tablets = 'Tablets',
  Drops = 'Drops',
  Suspensions = 'Suspensions',
  Ointments = 'Ointments',
  Syrups = 'Syrups',
  Creams = 'Creams',
  Injections = 'Injections'
}

export interface Medicine {
  id: string;
  name: string;
  category: MedicineCategory;
  packSize: string; // e.g., "8 bottles", "12 piece pack"
  packPrice: number;
  singlePrice: number;
}

export enum OrderStatus {
  Pending = 'Pending',
  Completed = 'Completed'
}

export interface CartItem {
  medicineId: string;
  quantity: number; // Number of packs
}

export interface OrderItem {
  medicine: Medicine;
  quantity: number;
  fulfillmentStatus?: 'Fulfilled' | 'OutOfStock';
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
}

export interface UserProfile {
  name: string;
  pharmacyName: string;
  shopAddress: string;
  personalAddress: string;
  phone: string;
  licenseNumber: string;
  nic: string;
  photoUrl?: string;
}

// Window interface for AI Studio
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}