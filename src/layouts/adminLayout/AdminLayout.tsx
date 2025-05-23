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
    books: <AdminBooksPage books={books} onArchiveBook={handleArchiveBook} />,
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