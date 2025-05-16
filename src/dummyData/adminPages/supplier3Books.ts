export interface Book {
  id: number;
  name: string;
  type: string;
  language: string;
  availability: 'Available' | 'Borrowed' | 'Not Available';
  quantity: number;
  reservedQuantity: number;
  pricePerOne: number;
  savedBy?: string;
}

export const initialBooks: Book[] = [
  {
    id: 1,
    name: '1984',
    type: 'Dystopian',
    language: 'English',
    availability: 'Available',
    quantity: 5,
    reservedQuantity: 0,
    pricePerOne: 11.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 2,
    name: 'Die Verwandlung',
    type: 'Fiction',
    language: 'German',
    availability: 'Not Available',
    quantity: 1,
    reservedQuantity: 1,
    pricePerOne: 7.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 3,
    name: 'Brave New World',
    type: 'Dystopian',
    language: 'English',
    availability: 'Available',
    quantity: 4,
    reservedQuantity: 2,
    pricePerOne: 13.49,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 4,
    name: 'Der Hobbit',
    type: 'Fantasy',
    language: 'German',
    availability: 'Available',
    quantity: 3,
    reservedQuantity: 1,
    pricePerOne: 16.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
];