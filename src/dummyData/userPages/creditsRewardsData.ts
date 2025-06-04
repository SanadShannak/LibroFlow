import bookVoucherImg from '../../assets/background_image_for_a_book_voucher_for.jpeg';
import freeMonthImg from '../../assets/background_image_for_a_free_1_month.jpeg';
import libraryBadgeImg from '../../assets/background_image_for_a_special_library_badge.jpeg';

export interface CreditEntry {
  id: number;
  date: string;
  description: string;
  points: number;
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  pointsCost: number;
  redeemed?: boolean;
  imageUrl: string;
}

export const initialCredits: CreditEntry[] = [
  { id: 1, date: '2025-05-09', description: 'Returned "Atomic Habits" on time', points: 10 },
  { id: 2, date: '2025-05-01', description: 'Returned "The Alchemist" late', points: -5 },
  { id: 3, date: '2025-04-15', description: 'Returned "Sapiens" on time', points: 15 },
];

export const initialRewards: Reward[] = [
  { 
    id: 1, 
    name: 'Book Voucher', 
    description: 'Get a $10 voucher for any book', 
    pointsCost: 50,
    imageUrl: bookVoucherImg
  },
  { 
    id: 2, 
    name: 'Free 1 Month Membership', 
    description: 'Enjoy all premium membership benefits for one month', 
    pointsCost: 30,
    imageUrl: freeMonthImg
  },
  { 
    id: 3, 
    name: 'Library Badge', 
    description: 'Earn a shiny badge for your profile', 
    pointsCost: 20,
    imageUrl: libraryBadgeImg
  },
];