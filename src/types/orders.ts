import { Book } from '../dummyData/adminPages/supplier1Books'; // Import Book from any supplier

export interface Order {
  orderId: string; // Changed from number to string for UUID
  book: Book;
  quantity: number;
  totalPrice: number;
  orderDate: string;
}