import {
  IconDashboard,
  IconPackage,
  IconTruck,
  IconFileInvoice,
  IconSettings,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import SupplierDashboard from '../../pages/supplier/Dashboard/Dashboard';
import SupplierProducts from '../../pages/supplier/Products/Products';
import SupplierDeliveries from '../../pages/supplier/Deliveries/Deliveries';
import SupplierInvoices from '../../pages/supplier/Invoices/Invoices';
import SupplierSettings from '../../pages/supplier/Settings/Settings';

const supplierSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Products', icon: IconPackage },
  { label: 'Deliveries', icon: IconTruck },
  { label: 'Invoices', icon: IconFileInvoice },
  { label: 'Settings', icon: IconSettings },
];

const supplierContentMap = {
  dashboard: <SupplierDashboard />,
  products: <SupplierProducts />,
  deliveries: <SupplierDeliveries />,
  invoices: <SupplierInvoices />,
  settings: <SupplierSettings />,
};

export default function SupplierLayout() {
  return (
    <RoleBasedLayout
      user={{ name: 'Supplier', role: 'Supplier' }}
      sidebarLinks={supplierSidebarLinks}
      contentMap={supplierContentMap}
      showBranchContent
    />
  );
} 