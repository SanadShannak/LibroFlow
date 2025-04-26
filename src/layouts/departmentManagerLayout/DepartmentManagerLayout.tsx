import {
  IconDashboard,
  IconPackage,
  IconUsers,
  IconCalendarEvent,
  IconShoppingCart,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import DepartmentManagerDashboard from '../../pages/departmentManager/Dashboard/Dashboard';
import DepartmentManagerInventory from '../../pages/departmentManager/Inventory/Inventory';
import DepartmentManagerEmployees from '../../pages/departmentManager/Employees/Employees';
import DepartmentManagerEvents from '../../pages/departmentManager/Events/Events';
import DepartmentManagerOrders from '../../pages/departmentManager/Orders/Orders';

const departmentManagerSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Inventory', icon: IconPackage },
  { label: 'Employees', icon: IconUsers },
  { label: 'Events', icon: IconCalendarEvent },
  { label: 'Orders', icon: IconShoppingCart },
];

const departmentManagerContentMap = {
  dashboard: <DepartmentManagerDashboard />,
  inventory: <DepartmentManagerInventory />,
  employees: <DepartmentManagerEmployees />,
  events: <DepartmentManagerEvents />,
  orders: <DepartmentManagerOrders />,
};

export default function DepartmentManagerLayout() {
  return (
    <RoleBasedLayout
      user={{ name: 'Department Manager', role: 'Department Manager' }}
      sidebarLinks={departmentManagerSidebarLinks}
      contentMap={departmentManagerContentMap}
      showBranchContent
    />
  );
} 