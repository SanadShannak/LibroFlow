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
    name: 'Sapiens: A Brief History',
    type: 'Non-Fiction',
    language: 'English',
    availability: 'Available',
    quantity: 6,
    reservedQuantity: 2,
    pricePerOne: 18.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 2,
    name: 'The Great Gatsby',
    type: 'Classic',
    language: 'English',
    availability: 'Borrowed',
    quantity: 3,
    reservedQuantity: 3,
    pricePerOne: 9.49,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 3,
    name: 'Pride and Prejudice',
    type: 'Classic',
    language: 'English',
    availability: 'Available',
    quantity: 5,
    reservedQuantity: 1,
    pricePerOne: 7.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 4,
    name: 'El Quijote',
    type: 'Classic',
    language: 'Spanish',
    availability: 'Available',
    quantity: 4,
    reservedQuantity: 0,
    pricePerOne: 14.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
];