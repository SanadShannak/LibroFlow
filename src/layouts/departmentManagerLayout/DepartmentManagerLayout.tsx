import {
  IconDashboard,
  IconPackage,
  IconUsers,
  IconTrophy,
  IconShoppingCart,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import DepartmentManagerDashboard from '../../pages/departmentManager/Dashboard/Dashboard';
import DepartmentManagerInventory from '../../pages/departmentManager/Inventory/Inventory';
import DepartmentManagerEmployees from '../../pages/departmentManager/Employees/Employees';
import DepartmentManagerEvents from '../../pages/departmentManager/Events/competitions';
import DepartmentManagerOrders from '../../pages/departmentManager/Orders/Orders';

const departmentManagerSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Inventory', icon: IconPackage },
  { label: 'Employees', icon: IconUsers },
  { label: 'Competitions', icon: IconTrophy },
  { label: 'Orders', icon: IconShoppingCart },
];

const departmentManagerContentMap = {
  dashboard: <DepartmentManagerDashboard />,
  inventory: <DepartmentManagerInventory />,
  employees: <DepartmentManagerEmployees />,
  competitions: <DepartmentManagerEvents />,
  orders: <DepartmentManagerOrders />,
};

export default function DepartmentManagerLayout() {
  return (
    <RoleBasedLayout
      user={{ name: 'Karim AbuSharifeh', role: 'Department Manager' }}
      sidebarLinks={departmentManagerSidebarLinks}
      contentMap={departmentManagerContentMap}
      showBranchContent
    />
  );
} 