import {
  IconDashboard,
  IconBook,
  IconBook2,
  IconHistory,
  IconUser,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import UserDashboard from '../../pages/user/Dashboard/Dashboard';
import UserBooks from '../../pages/user/Books/Books';
import UserBorrows from '../../pages/user/Borrows/Borrows';
import UserHistory from '../../pages/user/History/History';
import UserProfile from '../../pages/user/Profile/Profile';

const userSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Books', icon: IconBook },
  { label: 'Borrows', icon: IconBook2 },
  { label: 'History', icon: IconHistory },
  { label: 'Profile', icon: IconUser },
];

const userContentMap = {
  dashboard: <UserDashboard />,
  books: <UserBooks />,
  borrows: <UserBorrows />,
  history: <UserHistory />,
  profile: <UserProfile />,
};

export default function UserLayout() {
  return (
    <RoleBasedLayout
      user={{ name: 'Sanad Shannak', role: 'Customer' }}
      sidebarLinks={userSidebarLinks}
      contentMap={userContentMap}
      showBranchContent
    />
  );
}