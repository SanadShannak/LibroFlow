import { IoIosPerson, IoMdBook } from 'react-icons/io';
import { MdPendingActions } from 'react-icons/md';
import bookImage from '../../assets/book.png';
import employeesImage from '../../assets/employees.png';
import pendingOrdersImage from '../../assets/pendingOrder.png';
import borrowedBooksImage from '../../assets/borrowedBooks.png';

export interface Responsibility {
  title: string;
  subItems?: string[];
  action?: () => void;
}

export const responsibilities: Responsibility[] = [
  { 
    title: 'Manage Employees', 
    subItems: ['Add employees/give employee roles'],
  },
  { 
    title: 'Monitor Department Performance',
  },
  { 
    title: 'Make Book Order', 
    subItems: ['Ask approval from accountant', 'Report on order status to accountant'],
  },
  { 
    title: 'Manage Book Inventory', 
    subItems: ['Add/Remove Books'],
  },
  { 
    title: 'Department-specific dashboard', 
    subItems: ['Top Books/Top Customers, etc.', 'View borrowed books (department-specific) and their status'],
  },
  { 
    title: 'Chat with supplier',
  },
  { 
    title: 'Chatbot',
  },
];

export interface MiniDashboardItem {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  bgImage?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const miniDashboardData: MiniDashboardItem[] = [
  {
    title: 'Total Employees',
    value: '5',
    subtitle: '+1 this month',
    subtitleColor: '#4CAF50',
    bgImage: employeesImage,
  },
  {
    title: 'Books in Inventory',
    value: '520',
    subtitle: '-12 this month',
    subtitleColor: '#F44336',
    bgImage: bookImage,
  },
  {
    title: 'Pending Orders',
    value: '7',
    subtitle: 'Awaiting approval',
    subtitleColor: '#FF9800',
    bgImage: pendingOrdersImage,
  },
  {
    title: 'Borrowed Books',
    value: '145',
    subtitle: '+19 this month',
    subtitleColor: '#4CAF50',
   bgImage: borrowedBooksImage,
  },
];

export interface TopEmployee {
  name: string;
  branch: string;
  color: string;
}

export const topEmployees: TopEmployee[] = [
  { name: 'Kareem Abu-sharifeh', branch: 'Jabal Amman', color: 'yellow' },
  { name: 'Motasem AlAtawneh', branch: 'Jabal Amman', color: 'gray' },
  { name: 'Ahmad Aljazaere', branch: 'Jabal Amman', color: 'gray' },
];

export interface Book {
  title: string;
  borrows: number;
}

export const mostBorrowedBooks: Book[] = [
  { title: 'The Great Gatsby', borrows: 32 },
  { title: '1918', borrows: 15 },
  { title: 'The Song of Ice and fire', borrows: 50 },
  { title: 'The Artist', borrows: 48 }
];

export interface Competition {
  name: string;
  endDate: string;
}

export const ongoingCompetitions: Competition[] = [
  { name: 'Summer Reading Challenge', endDate: 'Aug 15, 2025' },
  { name: 'Book Trivia Contest', endDate: 'Jul 30, 2025' },
];

export interface InventoryDataPoint {
  month: string;
  books: number;
}

export const inventoryData: InventoryDataPoint[] = [
  { month: 'Jan', books: 120 },
  { month: 'Feb', books: 290 },
  { month: 'Mar', books: 267 },
  { month: 'Apr', books: 200 },
  { month: 'May', books: 312 },
  { month: 'Jun', books: 100 },
];

export interface EmployeePerformance {
  name: string;
  performance: number;
}

export const employeePerformanceData: EmployeePerformance[] = [
  { name: 'Mohameed', performance: 85 },
  { name: 'Jalal', performance: 40 },
  { name: 'Ahmad', performance: 70 },
  { name: 'Abdullah', performance: 90 },
];

export interface UpcomingEvent {
  title: string;
  date: string;
  progress: number;
  location: string;
}

export const upcomingEvents: UpcomingEvent[] = [
  { 
    title: 'Author Meet & Greet', 
    date: 'May 5, 2025',
    progress: 75,
    location: 'Main Hall'
  },
  { 
    title: 'Book Fair Preparation', 
    date: 'May 15, 2025',
    progress: 40,
    location: 'Exhibition Area'
  },
  { 
    title: 'Staff Training', 
    date: 'Apr 30, 2025',
    progress: 90,
    location: 'Conference Room'
  },
];