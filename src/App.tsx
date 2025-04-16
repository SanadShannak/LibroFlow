import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPassword from './pages/auth/ForgotPassword';
<<<<<<< HEAD

=======
import AdminDashboard from './pages/dashboard/AdminDashboard';  
>>>>>>> 81a725117f8c33a882eae870c28762976f473a68

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<<<<<<< HEAD
      

      
=======

      {/* Admin Dashboard Route */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

>>>>>>> 81a725117f8c33a882eae870c28762976f473a68
      {/* Fallback Route */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;