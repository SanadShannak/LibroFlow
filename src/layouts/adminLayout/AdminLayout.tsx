import {
  IconBuildingStore,
  IconBook,
  IconUsers,
  IconTrophy,
  IconDashboard,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import AdminBooksPage from '../../pages/admin/Books/BooksPage';
import AdminCompetitionsPage from '../../pages/admin/Competitions/CompetitionsPage';
import AdminDashboardPage from '../../pages/admin/Dashboard';
import AdminEmployeesPage from '../../pages/admin/Employees/EmployeesPage';
import ShmeisaniBranch from '../../pages/admin/Branches/ShmeisaniBranch';
import JabalAmmanBranch from '../../pages/admin/Branches/JabalAmman';
import AlZarqaaBranch from '../../pages/admin/Branches/AlZarqaaBranch';

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
};

export default function AdminLayout() {
  return (
    <RoleBasedLayout
      user={{ name: 'Motasem AlAtawneh', role: 'Admin' }}
      sidebarLinks={adminSidebarLinks}
      contentMap={adminContentMap}
      showBranchContent
    />
  );
}

