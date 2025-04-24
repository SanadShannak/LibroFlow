export interface Book {
  id: number;
  name: string;
  type: string;
  language: string;
  availability: 'Available' | 'Borrowed' | 'Not Available';
  quantity: number;
  reservedQuantity: number;
  savedBy?: string; // Optional field for "Saved by"
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
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 5,
    name: 'Sapiens: A Brief History',
    type: 'Non-Fiction',
    language: 'English',
    availability: 'Available',
    quantity: 6,
    reservedQuantity: 2,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 6,
    name: 'The Great Gatsby',
    type: 'Classic',
    language: 'English',
    availability: 'Borrowed',
    quantity: 3,
    reservedQuantity: 3,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 7,
    name: '1984',
    type: 'Dystopian',
    language: 'English',
    availability: 'Available',
    quantity: 5,
    reservedQuantity: 0,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
  {
    id: 8,
    name: 'Die Verwandlung',
    type: 'Fiction',
    language: 'German',
    availability: 'Not Available',
    quantity: 1,
    reservedQuantity: 1,
    savedBy: 'Nisal Gunasekara (Admin)',
  },
];