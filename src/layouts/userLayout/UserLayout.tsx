import {
  IconDashboard,
  IconBook,
  IconBook2,
  IconTrophy,
  IconGift,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import UserDashboard from '../../pages/user/Dashboard/Dashboard';
import UserBooks from '../../pages/user/Books/Books';
import UserBorrows from '../../pages/user/Borrows/Borrows';
import UserCreditsRewards from '../../pages/user/CreditsRewards/CreditsRewards';
import UserCompetitions from '../../pages/user/Competitions/Competitions';

const userSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Books', icon: IconBook },
  { label: 'Borrows', icon: IconBook2 },
  { label: 'Credits & Rewards', icon: IconGift },
  { label: 'Competitions', icon: IconTrophy },
];

const userContentMap = {
  dashboard: <UserDashboard />,
  books: <UserBooks />,
  borrows: <UserBorrows />,
  'credits&rewards': <UserCreditsRewards />,
  competitions: <UserCompetitions />,
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