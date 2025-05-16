export interface Employee {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
  branch: string;
}
// Book related interfaces
export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  price: number;
  quantity: number;
  publicationDate?: string;
  language?: string;
  categories?: string[];
  coverImage?: string;
}

// Order related interfaces
export type OrderStatus = 
  | 'draft' 
  | 'pending_supplier' 
  | 'supplier_rejected' 
  | 'supplier_approved' 
  | 'pending_accountant' 
  | 'accountant_rejected' 
  | 'approved';

export interface Order {
  id: string;
  orderId: string;
  books: Book[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  departmentId?: string;
  departmentName?: string;
  requesterId?: string;
  requesterName?: string;
  supplierId?: string;
  supplierName?: string;
  accountantId?: string;
  accountantName?: string;
  notes?: string;
  rejectionReason?: string;
  supplierNotes?: string;
  accountantNotes?: string;
  hasUnreadMessages?: boolean;
}

// User related interfaces
export type UserRole = 'department_manager' | 'supplier' | 'accountant' | 'admin';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  departmentName?: string;
  supplierId?: string;
  supplierName?: string;
}

// Department related interfaces
export interface Department {
  id: string;
  name: string;
  code: string;
  managerId?: string;
  managerName?: string;
  budget?: number;
  spentBudget?: number;
}

// Supplier related interfaces
export interface Supplier {
  id: string;
  name: string;
  email: string;
  contactPerson?: string;
  contactPhone?: string;
  address?: string;
  taxId?: string;
  accountNumber?: string;
  bankDetails?: string;
  rating?: number;
  status?: 'active' | 'inactive';
}

// Message related interfaces
export type MessageSenderType = 'department_manager' | 'supplier' | 'accountant' | 'system';

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  senderName?: string;
  senderType: MessageSenderType;
  content: string;
  timestamp: string;
  read: boolean;
  attachment?: {
    id: string;
    name: string;
    url: string;
    type: string;
  };
}

// API response interfaces
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}