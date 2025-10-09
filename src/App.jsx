import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

import AuthLayout from './layouts/authlayout'
import MainLayout from './layouts/mainLayout'

import Login from './pages/auth/Login'

import Home from './pages/dashboard/home';
import Categories from './pages/dashboard/categories';
import CreateCategory from './pages/dashboard/createCategory';

import { useCheckAuth } from './utils/useApis/useAuthApis/useCheckAuth';
import { useAuthStore } from './utils/api/store/useAuthStore';

import LoadingSpinner from './components/LoadingSpinner'
import Listings from './pages/dashboard/listings';

const ProtectedRoute = ({ children }) => {
  const admin = useAuthStore((state) => state.admin);
  return admin ? children : <Navigate to="/login" replace/>;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isLoading } = useCheckAuth(); 

  if (isLoading) return <LoadingSpinner/>;
  return (
    <>
      <Toaster />
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        </Route>

        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/listings" element={<ProtectedRoute><Listings/></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories/></ProtectedRoute>} />
          <Route path="/categories/create" element={<ProtectedRoute><CreateCategory/></ProtectedRoute>} />
        </Route>

      </Routes>
    </>
  )
}

export default App