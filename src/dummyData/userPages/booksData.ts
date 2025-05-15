export interface Book {
  id: number;
  name: string;
  type: string;
  language: string;
  availability: 'Available' | 'Borrowed' | 'Not Available';
  quantity: number;
  reservedQuantity: number;
  savedBy?: string; // Optional field for "Saved by"
  unavailableDates: Date[]; // Non-optional since we initialize it
  reservations: { copyId: number; reservedDates: Date[] }[]; // Track reservations per copy
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
    unavailableDates: [new Date('2025-05-15'), new Date('2025-05-20')],
    reservations: [
      { copyId: 1, reservedDates: [new Date('2025-05-15')] },
      { copyId: 2, reservedDates: [new Date('2025-05-20')] },
    ],
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
    unavailableDates: [new Date('2025-05-12'), new Date('2025-05-18')],
    reservations: [
      { copyId: 1, reservedDates: [new Date('2025-05-12')] },
      { copyId: 2, reservedDates: [new Date('2025-05-18')] },
      { copyId: 3, reservedDates: [new Date('2025-05-12')] },
    ],
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
    unavailableDates: [new Date('2025-05-10'), new Date('2025-05-25')],
    reservations: [
      { copyId: 1, reservedDates: [new Date('2025-05-10')] },
      { copyId: 2, reservedDates: [new Date('2025-05-25')] },
    ],
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
    unavailableDates: [new Date('2025-05-17')],
    reservations: [{ copyId: 1, reservedDates: [new Date('2025-05-17')] }],
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
    unavailableDates: [new Date('2025-05-14'), new Date('2025-05-22')],
    reservations: [
      { copyId: 1, reservedDates: [new Date('2025-05-14')] },
      { copyId: 2, reservedDates: [new Date('2025-05-22')] },
    ],
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
    unavailableDates: [new Date('2025-05-13'), new Date('2025-05-19')],
    reservations: [
      { copyId: 1, reservedDates: [new Date('2025-05-13')] },
      { copyId: 2, reservedDates: [new Date('2025-05-19')] },
      { copyId: 3, reservedDates: [new Date('2025-05-13')] },
    ],
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
    unavailableDates: [new Date('2025-05-16')],
    reservations: [{ copyId: 1, reservedDates: [new Date('2025-05-16')] }],
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
    unavailableDates: [new Date('2025-05-11'), new Date('2025-05-21')],
    reservations: [{ copyId: 1, reservedDates: [new Date('2025-05-11'), new Date('2025-05-21')] }],
  },
];