import {
  IconDashboard,
  IconPackage,
  IconUsers,
  IconTrophy,
  IconCalendarEvent,
  IconBuildingStore,
  IconShoppingCart,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import DepartmentManagerDashboard from '../../pages/departmentManager/Dashboard/Dashboard';
import DepartmentManagerInventory from '../../pages/departmentManager/Inventory/Inventory';
import DepartmentManagerEmployees from '../../pages/departmentManager/Employees/Employees';
import DepartmentManagerEvents from '../../pages/departmentManager/Events/competitions';
import Supplier1 from '../../pages/departmentManager/Suppliers/Supplier1/Books/Books';
import Supplier2 from '../../pages/departmentManager/Suppliers/Supplier2/Books/Books';
import Supplier3 from '../../pages/departmentManager/Suppliers/Supplier3/Books/Books';
import Bills from '../../pages/departmentManager/OrdersBills/Bills';
import { OrdersProvider } from '../../OrderContext';


const departmentManagerSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard, link: '/dashboard' },
  { label: 'Books', icon: IconPackage, link: '/inventory' },
  { label: 'Employees', icon: IconUsers, link: '/employees' },
  { label: 'Competitions', icon: IconTrophy },
  {
    label: 'Suppliers',
    icon: IconBuildingStore,
    initiallyOpened: false,
    links: [
      { label: 'Supplier 1', link: '/suppliers/supplier1' },
      { label: 'Supplier 2', link: '/suppliers/supplier2' },
      { label: 'Supplier 3', link: '/suppliers/supplier3' },
    ],
  },
  { label: 'Bills', icon: IconShoppingCart, link: '/bills' },
];

const departmentManagerContentMap = {
  dashboard: <DepartmentManagerDashboard />,
  books: <DepartmentManagerInventory />,
  employees: <DepartmentManagerEmployees />,
  competitions: <DepartmentManagerEvents />,
  'suppliers.supplier1': <Supplier1 />,
  'suppliers.supplier2': <Supplier2 />,
  'suppliers.supplier3': <Supplier3 />,
  bills: <Bills />,
};

export default function DepartmentManagerLayout() {
  return (
    <OrdersProvider>
      <RoleBasedLayout
      user={{ name: 'Karim AbuSharifeh', role: 'Department Manager' }}
      sidebarLinks={departmentManagerSidebarLinks}
        contentMap={departmentManagerContentMap}
        showBranchContent
      />
    </OrdersProvider>
  );
}