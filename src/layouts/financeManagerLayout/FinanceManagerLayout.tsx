import {
  IconDashboard,
  IconCash,
  IconReportMoney,
  IconChartBar,
  IconReceipt,
} from '@tabler/icons-react';
import RoleBasedLayout from '../../components/layouts/RoleBasedLayout/RoleBasedLayout';
import FinanceManagerDashboard from '../../pages/financeManager/Dashboard/Dashboard';
import FinanceManagerTransactions from '../../pages/financeManager/Transactions/Transactions';
import FinanceManagerReports from '../../pages/financeManager/Reports/Reports';
import FinanceManagerBudget from '../../pages/financeManager/Budget/Budget';
import FinanceManagerInvoices from '../../pages/financeManager/Orders/Orders';

const financeManagerSidebarLinks = [
  { label: 'Dashboard', icon: IconDashboard },
  { label: 'Transactions', icon: IconCash },
  { label: 'Reports', icon: IconReportMoney },
  { label: 'Budget', icon: IconChartBar },
  { label: 'Orders', icon: IconReceipt },
];

const financeManagerContentMap = {
  dashboard: <FinanceManagerDashboard />,
  transactions: <FinanceManagerTransactions />,
  reports: <FinanceManagerReports />,
  budget: <FinanceManagerBudget />,
  orders: <FinanceManagerInvoices />,
};

export default function FinanceManagerLayout() {
  return (
    <RoleBasedLayout
      user={{ name: 'Finance Manager', role: 'Finance Manager' }}
      sidebarLinks={financeManagerSidebarLinks}
      contentMap={financeManagerContentMap}
      showBranchContent
    />
  );
} 