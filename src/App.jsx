import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";

import AuthLayout from './layouts/authlayout'
import MainLayout from './layouts/mainLayout'

import Login from './pages/auth/Login'
import SetNewPassword from './pages/auth/SetNewPassword';
import VerifyPassword from './pages/auth/VerifyPassword';
import Analytics from './pages/dashboard/Analytics';
import UserManagement from './pages/dashboard/UserManagement';
import Commission from './pages/dashboard/Commission';
import CoinAdmin from './pages/dashboard/Coin-Admin';
import Requests from './pages/dashboard/Requests';
import Notifications from './pages/dashboard/Notifications';
import Settings from './pages/dashboard/Settings';
import Gifts from './pages/dashboard/Gifts';

import { useCheckAuth } from './utils/useApis/useAuthApis/useCheckAuth';
import { useAuthStore } from './utils/api/store/useAuthStore';

import LoadingSpinner from './components/LoadingSpinner'

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

const PermissionRoute = ({ children, requiredPermission }) => {
  const admin = useAuthStore((state) => state.admin);

  if (!admin) return <Navigate to="/login" replace />;

  if (!admin.permissions?.includes(requiredPermission)) {
    toast.error('Unauthorized route - You are not allowed to access this route')
    return <Navigate to="/settings" replace />;
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
          <Route path="/login/set-new-password" element={<RedirectAuthenticatedUser><SetNewPassword /></RedirectAuthenticatedUser>} />
          <Route path="/login/verify-password" element={<RedirectAuthenticatedUser><VerifyPassword /></RedirectAuthenticatedUser>} />
        </Route>

        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/" element={<PermissionRoute requiredPermission={'analytics'}><Analytics /></PermissionRoute >} />
          <Route path="/users" element={<PermissionRoute requiredPermission={'user-management'}><UserManagement /></PermissionRoute >} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/requests" element={<PermissionRoute requiredPermission={'dispute'}><Requests /></PermissionRoute >} />
          <Route path="/gifts" element={<PermissionRoute requiredPermission={'withdrawal-request'}><Gifts /></PermissionRoute >} />
          <Route path="/coin-admin" element={<PermissionRoute requiredPermission={'coin-deposits'}><CoinAdmin /></PermissionRoute >} />
          <Route path="/notifications" element={<PermissionRoute requiredPermission={'notification-creation'}><Notifications /></PermissionRoute >} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </>
  )
}

export default App