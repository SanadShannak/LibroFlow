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
    bgImage: employeesImage,},
  {
    title: 'Books in Inventory',
    value: '199',
    subtitle: '-2 this month',
    subtitleColor: '#F44336',
    bgImage: bookImage,
  },
  {
    title: 'Pending Orders',
    value: '3',
    subtitle: 'Awaiting approval',
    subtitleColor: '#FF9800',
    bgImage: pendingOrdersImage,},
  {
    title: 'Borrowed Books',
    value: '77',
    subtitle: '+9 this month',
    subtitleColor: '#4CAF50',
    bgImage: borrowedBooksImage,},
];

export interface TopEmployee {
  name: string;
  branch: string;
  color: string;
}

export const topEmployees: TopEmployee[] = [
  { name: 'Kareem Abu-sharifeh', branch: 'AlZarqaa', color: 'yellow' },
  { name: 'Motasem AlAtawneh', branch: 'AlZarqaa', color: 'gray' },
  { name: 'Ahmad Aljazaere', branch: 'AlZarqaa', color: 'gray' },
];

export interface Book {
  title: string;
  borrows: number;
}

export const mostBorrowedBooks: Book[] = [
  { title: 'Harry Poter', borrows: 15 },
  { title: '1948', borrows: 7 },
  { title: 'The Lord of the Rings', borrows: 20 },
  { title: 'Don Quixote', borrows: 18 }
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
  { month: 'Jan', books: 220 },
  { month: 'Feb', books: 190 },
  { month: 'Mar', books: 237 },
  { month: 'Apr', books: 170 },
  { month: 'May', books: 412 },
  { month: 'Jun', books: 200 },
];

export interface EmployeePerformance {
  name: string;
  performance: number;
}

export const employeePerformanceData: EmployeePerformance[] = [
  { name: 'Juleia', performance: 85 },
  { name: 'Qusai', performance: 40 },
  { name: 'Sami', performance: 70 },
  { name: 'Others', performance: 66 },
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