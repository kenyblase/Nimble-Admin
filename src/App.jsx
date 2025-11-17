import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

import AuthLayout from './layouts/authlayout'
import MainLayout from './layouts/mainLayout'

import Login from './pages/auth/Login'

import Home from './pages/dashboard/home';
import Listings from './pages/dashboard/listings';
import Listing from './pages/dashboard/listing';
import Orders from './pages/dashboard/orders';
import Order from './pages/dashboard/order';
import Users from './pages/dashboard/users';
import User from './pages/dashboard/user';
import EditUser from './pages/dashboard/editUser';
import Transactions from './pages/dashboard/transactions';
import Payouts from './pages/dashboard/payouts';
import Categories from './pages/dashboard/categories';
import Category from './pages/dashboard/category';
import CreateCategory from './pages/dashboard/createCategory';
import EditCategory from './pages/dashboard/editCategory';
import Admin from './pages/dashboard/admin';
import Settings from './pages/dashboard/settings';

import { useCheckAuth } from './utils/useApis/useAuthApis/useCheckAuth';
import { useAuthStore } from './utils/api/store/useAuthStore';

import LoadingSpinner from './components/LoadingSpinner'
import Appeals from './pages/dashboard/appeals';
import Appeal from './pages/dashboard/appeal';
import Payout from './pages/dashboard/payout';

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
          <Route path="/listings/:id" element={<ProtectedRoute><Listing/></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><Order/></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
          <Route path="/users/:id" element={<ProtectedRoute><User/></ProtectedRoute>} />
          <Route path="/users/:id/edit" element={<ProtectedRoute><EditUser/></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions/></ProtectedRoute>} />
          <Route path="/payouts" element={<ProtectedRoute><Payouts/></ProtectedRoute>} />
          <Route path="/payouts/:id" element={<ProtectedRoute><Payout/></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories/></ProtectedRoute>} />
          <Route path="/categories/:id" element={<ProtectedRoute><Category/></ProtectedRoute>} />
          <Route path="/categories/create" element={<ProtectedRoute><CreateCategory/></ProtectedRoute>} />
          <Route path="/categories/:id/edit" element={<ProtectedRoute><EditCategory/></ProtectedRoute>} />
          <Route path="/admins" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
          <Route path="/appeals" element={<ProtectedRoute><Appeals/></ProtectedRoute>} />
          <Route path="/appeals/:id" element={<ProtectedRoute><Appeal/></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
        </Route>

      </Routes>
    </>
  )
}

export default App