import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import AdminDashboardPage from './pages/admin/Dashboard/Dashboard';
import AdminBooksPage from './pages/admin/Books/BooksPage';
import DepartmentManagerLayout from './layouts/departmentManagerLayout/DepartmentManagerLayout';
import FinanceManagerLayout from './layouts/financeManagerLayout/FinanceManagerLayout';
import SupplierLayout from './layouts/supplierLayout/SupplierLayout';
import UserLayout from './layouts/userLayout/UserLayout';
import { AnimatePresence } from 'framer-motion';
import { BorrowedBooksProvider } from './context/BorrowedBooksContext';
import Dashboard from './pages/user/Dashboard';
import MembershipPage from './pages/user/Membership';

function App() {
  const location = useLocation();
  
  return (
    <BorrowedBooksProvider>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin Layout for /admin routes */}
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="books" element={<AdminBooksPage books={[]} />} />

          {/* Department Manager routes */}
          <Route path="/department-manager/*" element={<DepartmentManagerLayout />} />

          {/* Finance Manager routes */}
          <Route path="/finance-manager/*" element={<FinanceManagerLayout />} />

          {/* Supplier routes */}
          <Route path="/supplier/*" element={<SupplierLayout />} />

          {/* User routes */}
          <Route path="/user/*" element={<UserLayout />} />

          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/membership" element={<MembershipPage />} />

          {/* Fallback */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AnimatePresence>
    </BorrowedBooksProvider>
  );
}

export default App;