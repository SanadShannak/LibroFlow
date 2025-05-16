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
    name: 'The Alchemist',
    type: 'Fiction',
    language: 'English',
    availability: 'Available',
    quantity: 5,
    reservedQuantity: 2,
    pricePerOne: 12.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 2,
    name: 'Atomic Habits',
    type: 'Self-Help',
    language: 'English',
    availability: 'Borrowed',
    quantity: 3,
    reservedQuantity: 3,
    pricePerOne: 15.49,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 3,
    name: 'La Casa de Papel',
    type: 'Thriller',
    language: 'Spanish',
    availability: 'Not Available',
    quantity: 2,
    reservedQuantity: 2,
    pricePerOne: 10.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 4,
    name: 'Le Petit Prince',
    type: 'Children',
    language: 'French',
    availability: 'Available',
    quantity: 4,
    reservedQuantity: 1,
    pricePerOne: 8.99,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
];