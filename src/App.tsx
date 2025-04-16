import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/dashboard/AdminDashboard';  

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Dashboard Route */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Fallback Route */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;