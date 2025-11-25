import { Medicine, MedicineCategory, Order, OrderStatus, UserProfile } from '../types';

export const MEDICINES: Medicine[] = [
  { id: '1', name: 'Aceclofenac 100mg', category: MedicineCategory.Tablets, packSize: '10x10 Box', packPrice: 450.00, singlePrice: 50.00 },
  { id: '2', name: 'Amoxicillin 500mg', category: MedicineCategory.Tablets, packSize: '10x10 Box', packPrice: 850.00, singlePrice: 95.00 },
  { id: '3', name: 'Betadine Ointment', category: MedicineCategory.Ointments, packSize: '12 Tubes', packPrice: 600.00, singlePrice: 60.00 },
  { id: '4', name: 'Calamine Lotion', category: MedicineCategory.Suspensions, packSize: '6 Bottles', packPrice: 300.00, singlePrice: 60.00 },
  { id: '5', name: 'Ciprofloxacin Eye Drops', category: MedicineCategory.Drops, packSize: '12 Vials', packPrice: 240.00, singlePrice: 25.00 },
  { id: '6', name: 'Cough Syrup (Herbal)', category: MedicineCategory.Syrups, packSize: '12 Bottles', packPrice: 550.00, singlePrice: 55.00 },
  { id: '7', name: 'Diclofenac Gel', category: MedicineCategory.Creams, packSize: '10 Tubes', packPrice: 400.00, singlePrice: 45.00 },
  { id: '8', name: 'Ibuprofen 400mg', category: MedicineCategory.Tablets, packSize: '20x10 Box', packPrice: 350.00, singlePrice: 20.00 },
  { id: '9', name: 'Multivitamin Drops', category: MedicineCategory.Drops, packSize: '10 Bottles', packPrice: 500.00, singlePrice: 60.00 },
  { id: '10', name: 'Paracetamol 500mg', category: MedicineCategory.Tablets, packSize: '50x10 Box', packPrice: 250.00, singlePrice: 6.00 },
  { id: '11', name: 'Saline Nasal Spray', category: MedicineCategory.Drops, packSize: '12 Bottles', packPrice: 480.00, singlePrice: 50.00 },
  { id: '12', name: 'Silver Sulfadiazine', category: MedicineCategory.Creams, packSize: '5 Jars', packPrice: 750.00, singlePrice: 160.00 },
  { id: '13', name: 'Vitamin C Syrup', category: MedicineCategory.Syrups, packSize: '12 Bottles', packPrice: 650.00, singlePrice: 65.00 },
  { id: '14', name: 'Zinc Oxide Paste', category: MedicineCategory.Ointments, packSize: '6 Tubs', packPrice: 420.00, singlePrice: 80.00 },
  // Additional medicines for AI Search Demo
  { id: '15', name: 'Timolol Maleate 0.5%', category: MedicineCategory.Drops, packSize: '12 Vials', packPrice: 450.00, singlePrice: 45.00 },
  { id: '16', name: 'Latanoprost Eye Drops', category: MedicineCategory.Drops, packSize: '6 Vials', packPrice: 1200.00, singlePrice: 220.00 },
  { id: '17', name: 'Tamoxifen 20mg', category: MedicineCategory.Tablets, packSize: '30 Tabs', packPrice: 900.00, singlePrice: 35.00 },
  { id: '18', name: 'Imatinib 400mg', category: MedicineCategory.Tablets, packSize: '10 Tabs', packPrice: 5000.00, singlePrice: 550.00 },
  { id: '19', name: 'Methotrexate 2.5mg', category: MedicineCategory.Tablets, packSize: '50 Tabs', packPrice: 600.00, singlePrice: 15.00 },
  { id: '20', name: 'Artificial Tears', category: MedicineCategory.Drops, packSize: '24 Vials', packPrice: 400.00, singlePrice: 20.00 },
].sort((a, b) => a.name.localeCompare(b.name));

export const MOCK_USER: UserProfile = {
  name: "Dr. Jane Doe",
  pharmacyName: "City Care Pharmacy",
  shopAddress: "123 Health Avenue, Meditown, MT 54321",
  personalAddress: "45 Willow Creek, Suburbia, MT 54300",
  phone: "+1 (555) 012-3456",
  licenseNumber: "PH-987654321",
  nic: "987654321V",
  photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200"
};

const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2023-10-15',
    status: OrderStatus.Completed,
    items: [
      { medicine: MEDICINES[0], quantity: 2, fulfillmentStatus: 'Fulfilled' },
      { medicine: MEDICINES[5], quantity: 1, fulfillmentStatus: 'OutOfStock' } // Demo stock finished
    ],
    totalAmount: 1450.00
  },
  {
    id: 'ORD-002',
    date: '2023-10-25',
    status: OrderStatus.Pending,
    items: [
      { medicine: MEDICINES[1], quantity: 5, fulfillmentStatus: 'Fulfilled' },
      { medicine: MEDICINES[3], quantity: 2, fulfillmentStatus: 'Fulfilled' }
    ],
    totalAmount: 4850.00
  }
];

export const getMedicines = () => MEDICINES;
export const getUser = () => MOCK_USER;
export const getInitialOrders = () => initialOrders;