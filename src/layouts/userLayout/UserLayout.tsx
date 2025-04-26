import {
  IconDashboard,
  IconBook,
  IconShoppingCart,
  IconHistory,
  IconUser,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import UserDashboard from '../../pages/user/Dashboard/Dashboard';
import UserBooks from '../../pages/user/Books/Books';
import UserCart from '../../pages/user/Cart/Cart';
import UserHistory from '../../pages/user/History/History';
import UserProfile from '../../pages/user/Profile/Profile';

const userSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Books', icon: IconBook },
  { label: 'Cart', icon: IconShoppingCart },
  { label: 'History', icon: IconHistory },
  { label: 'Profile', icon: IconUser },
];

const userContentMap = {
  dashboard: <UserDashboard />,
  books: <UserBooks />,
  cart: <UserCart />,
  history: <UserHistory />,
  profile: <UserProfile />,
};

export default function UserLayout() {
  return (
    <RoleBasedLayout
      user={{ name: 'User', role: 'User' }}
      sidebarLinks={userSidebarLinks}
      contentMap={userContentMap}
      showBranchContent
    />
  );
} 