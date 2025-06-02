import {
  IconBuildingStore,
  IconBook,
  IconUsers,
  IconTrophy,
  IconDashboard,
  IconArchive,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import AdminBooksPage from '../../pages/admin/Books/BooksPage';
import AdminCompetitionsPage from '../../pages/admin/Competitions/CompetitionsPage';
import AdminDashboardPage from '../../pages/admin/Dashboard/Dashboard';
import AdminEmployeesPage from '../../pages/admin/Employees/EmployeesPage';
import ShmeisaniBranch from '../../pages/admin/Branches/ShmeisaniBranch';
import JabalAmmanBranch from '../../pages/admin/Branches/JabalAmman';
import AlZarqaaBranch from '../../pages/admin/Branches/AlZarqaaBranch';
import ArchivePage from '../../pages/admin/Archive';
import React, { useState } from 'react';
import { Book, initialBooks } from '../../dummyData/adminPages/booksData';

const adminSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  {
    label: 'Branches',
    icon: IconBuildingStore,
    initiallyOpened: false,
    links: [
      { label: 'Shmeisani', link: '/' },
      { label: 'Jabal Amman', link: '/' },
      { label: 'AlZarqaa', link: '/' },
    ],
  },
  { label: 'Books', icon: IconBook },
  { label: 'Employees', icon: IconUsers },
  { label: 'Competitions', icon: IconTrophy },
  { label: 'Archive', icon: IconArchive },
];

const initialArchivedBooks: Book[] = [
  {
    id: 100,
    name: 'The Secret Library',
    type: 'Mystery',
    language: 'English',
    quantity: 2,
    reservedQuantity: 0,
    availability: 'Available',
    savedBy: 'System',
    pricePerOne: 22.5,
  },
];

export default function AdminLayout() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [archivedBooks, setArchivedBooks] = useState<Book[]>(initialArchivedBooks);

  const handleAddBook = (newBook: Omit<Book, 'id' | 'availability' | 'savedBy'>) => {
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    const availableQuantity = newBook.quantity - newBook.reservedQuantity;
    const availability = availableQuantity > 0 ? 'Available' : newBook.reservedQuantity > 0 ? 'Borrowed' : 'Not Available';
    // Set a default price if not provided (since admin doesn't input price)
    const bookWithPrice = { ...newBook, pricePerOne: newBook.pricePerOne || 0 };
    setBooks((prev) => [...prev, { id: newId, ...bookWithPrice, availability, savedBy: 'Nisal Gunasekara (Admin)' }]);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    const availableQuantity = updatedBook.quantity - updatedBook.reservedQuantity;
    const availability = availableQuantity > 0 ? 'Available' : updatedBook.reservedQuantity > 0 ? 'Borrowed' : 'Not Available';
    setBooks((prev) => prev.map((book) => (book.id === updatedBook.id ? { ...updatedBook, availability } : book)));
  };

  const handleDeleteBook = (bookToDelete: Book) => {
    setBooks((prev) => prev.filter((book) => book.id !== bookToDelete.id));
  };

  const handleArchiveBook = (book: Book) => {
    setBooks((prev) => prev.filter((b) => b.id !== book.id));
    setArchivedBooks((prev) => [...prev, book]);
  };

  const handleRestoreBook = (book: Book) => {
    setArchivedBooks((prev) => prev.filter((b) => b.id !== book.id));
    setBooks((prev) => [...prev, book]);
  };

  const adminContentMap = {
    dashboard: <AdminDashboardPage />,
    branches: null,
    'branches.shmeisani': <ShmeisaniBranch />,
    'branches.jabalamman': <JabalAmmanBranch />,
    'branches.alzarqaa': <AlZarqaaBranch />,
    books: <AdminBooksPage books={books} onAddBook={handleAddBook} onUpdateBook={handleUpdateBook} onDeleteBook={handleDeleteBook} onArchiveBook={handleArchiveBook} />,
    employees: <AdminEmployeesPage />,
    competitions: <AdminCompetitionsPage />,
    archive: <ArchivePage archivedBooks={archivedBooks} onRestoreBook={handleRestoreBook} />,
  };

  return (
    <RoleBasedLayout
      user={{ name: 'Motasem AlAtawneh', role: 'Admin' }}
      sidebarLinks={adminSidebarLinks}
      contentMap={adminContentMap}
      showBranchContent
    />
  );
}