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
import ArchivePage, { ArchiveContext } from '../../pages/admin/Archive';
import React, { useState } from 'react';
import { Book } from '../../dummyData/adminPages/booksData';

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

const adminContentMap = {
  dashboard: <AdminDashboardPage />,
  branches: null,
  'branches.shmeisani': <ShmeisaniBranch />,
  'branches.jabalamman': <JabalAmmanBranch />,
  'branches.alzarqaa': <AlZarqaaBranch />,
  books: <AdminBooksPage />,
  employees: <AdminEmployeesPage />,
  competitions: <AdminCompetitionsPage />,
  archive: <ArchivePage />,
};

export default function AdminLayout() {
  const [archivedBooks, setArchivedBooks] = useState<Book[]>([]);
  const handleArchiveBook = (book: Book) => {
    setArchivedBooks((prev) => [...prev, book]);
  };
  return (
    <ArchiveContext.Provider value={{ archivedBooks }}>
      <RoleBasedLayout
        user={{ name: 'Motasem AlAtawneh', role: 'Admin' }}
        sidebarLinks={adminSidebarLinks}
        contentMap={{
          ...adminContentMap,
          books: <AdminBooksPage onArchiveBook={handleArchiveBook} />, // Pass handler
          archive: <ArchivePage />,
        }}
        showBranchContent
      />
    </ArchiveContext.Provider>
  );
}