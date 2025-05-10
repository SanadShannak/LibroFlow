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
    value: '15',
    subtitle: '+2 this month',
    subtitleColor: '#4CAF50',
    bgImage: employeesImage,
  },
  {
    title: 'Books in Inventory',
    value: '320',
    subtitle: '-5 this month',
    subtitleColor: '#F44336',
    bgImage: bookImage,
  },
  {
    title: 'Pending Orders',
    value: '3',
    subtitle: 'Awaiting approval',
    subtitleColor: '#FF9800',
    bgImage: pendingOrdersImage,
  },
  {
    title: 'Borrowed Books',
    value: '45',
    subtitle: '+3 this month',
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
  { name: 'Kareem Abu-sharifeh', branch: 'Shmeisani', color: 'yellow' },
  { name: 'Motasem AlAtawneh', branch: 'Shmeisani', color: 'gray' },
  { name: 'Ahmad Aljazaere', branch: 'Shmeisani', color: 'gray' },
];

export interface Book {
  title: string;
  borrows: number;
}

export const mostBorrowedBooks: Book[] = [
  { title: 'The Great Gatsby', borrows: 42 },
  { title: '1984', borrows: 35 },
  { title: 'To Kill a Mockingbird', borrows: 28 },
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
  { month: 'Jan', books: 300 },
  { month: 'Feb', books: 310 },
  { month: 'Mar', books: 305 },
  { month: 'Apr', books: 320 },
  { month: 'May', books: 315 },
  { month: 'Jun', books: 320 },
];

export interface EmployeePerformance {
  name: string;
  performance: number;
}

export const employeePerformanceData: EmployeePerformance[] = [
  { name: 'Sanad', performance: 95 },
  { name: 'Motasem', performance: 85 },
  { name: 'Ahmad', performance: 80 },
  { name: 'Others', performance: 70 },
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