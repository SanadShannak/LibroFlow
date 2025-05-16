import { IconDashboard, IconPackage, IconTruck, IconFileInvoice, IconBook2 } from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import SupplierDashboard from '../../pages/supplier/Dashboard/Dashboard';
import SupplierBooksPage from '../../pages/supplier/Books/Books';
import LibraryBooksPage from '../../pages/supplier/BooksFromUser/Books/Books';
import SupplierDeliveries from '../../pages/supplier/Deliveries/Deliveries';
import SupplierOrders from '../../pages/supplier/Orders/Orders';

const supplierSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Products', icon: IconPackage },
  { label: 'Library Books', icon: IconBook2 },
  { label: 'Deliveries', icon: IconTruck },
  { label: 'Orders', icon: IconFileInvoice },
];

const supplierContentMap = {
  dashboard: <SupplierDashboard />,
  products: <SupplierBooksPage />,
  librarybooks: <LibraryBooksPage />,
  deliveries: <SupplierDeliveries />,
  orders: <SupplierOrders />,
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