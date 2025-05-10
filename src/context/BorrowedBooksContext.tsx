import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, initialBooks } from '../dummyData/userPages/booksData';

// Define the BorrowedBook interface
interface BorrowedBook {
  book: Book;
  reservedDates: Date[];
  copyId: number;
  claimed: boolean;
  returned: boolean;
  points: number;
}

// Define initial borrowed books data
const initialBorrowedBooks: BorrowedBook[] = [
  {
    book: initialBooks.find((b) => b.id === 1)!,
    reservedDates: [new Date('2025-05-03'), new Date('2025-05-04'), new Date('2025-05-05')],
    copyId: 1,
    claimed: true,
    returned: false,
    points: 0, // Overdue (past May 10, 2025, not returned)
  },
  {
    book: initialBooks.find((b) => b.id === 2)!,
    reservedDates: [new Date('2025-05-08'), new Date('2025-05-09')],
    copyId: 2,
    claimed: true,
    returned: true,
    points: 10, // Returned on time (before May 10, 2025)
  },
  {
    book: initialBooks.find((b) => b.id === 4)!,
    reservedDates: [new Date('2025-05-10'), new Date('2025-05-11')],
    copyId: 1,
    claimed: true,
    returned: false,
    points: 0, // Claimed (includes May 10, 2025)
  },
  {
    book: initialBooks.find((b) => b.id === 7)!,
    reservedDates: [new Date('2025-05-10'), new Date('2025-05-11')],
    copyId: 2,
    claimed: false,
    returned: false,
    points: 0, // Not Claimed (starts May 10, 2025, within pickup window)
  },
  {
    book: initialBooks.find((b) => b.id === 5)!,
    reservedDates: [new Date('2025-05-15'), new Date('2025-05-16'), new Date('2025-05-17')],
    copyId: 1,
    claimed: false,
    returned: false,
    points: 0, // Awaiting Pickup (starts May 15, 2025)
  },
];

// Define the context type
interface BorrowedBooksContextType {
  borrowedBooks: BorrowedBook[];
  addBorrowedBook: (book: Book, reservedDates: Date[], copyId: number, claimed: boolean, returned: boolean, points: number) => void;
}

// Create the context
const BorrowedBooksContext = createContext<BorrowedBooksContextType | undefined>(undefined);

// Create the provider component
export const BorrowedBooksProvider = ({ children }: { children: ReactNode }) => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>(initialBorrowedBooks);

  const addBorrowedBook = (
    book: Book,
    reservedDates: Date[],
    copyId: number,
    claimed: boolean,
    returned: boolean,
    points: number
  ) => {
    setBorrowedBooks((prev) => [...prev, { book, reservedDates, copyId, claimed, returned, points }]);
  };

  return (
    <BorrowedBooksContext.Provider value={{ borrowedBooks, addBorrowedBook }}>
      {children}
    </BorrowedBooksContext.Provider>
  );
};

// Hook to use the context
export const useBorrowedBooks = () => {
  const context = useContext(BorrowedBooksContext);
  if (!context) {
    throw new Error('useBorrowedBooks must be used within a BorrowedBooksProvider');
  }
  return context;
};