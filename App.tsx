
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import SuppliersPage from './pages/SuppliersPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { AuthProvider, useAuth } from './auth/Auth';
import SupplierDashboardLayout from './pages/supplier/SupplierDashboardLayout';
import SupplierProfilePage from './pages/buyer/SupplierProfilePage';
import SupplierProductsPage from './pages/supplier/SupplierProductsPage';
import SupplierOrdersPage from './pages/supplier/SupplierOrdersPage';
import SupplierAnalyticsPage from './pages/supplier/SupplierAnalyticsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BuyerDashboardLayout from './pages/buyer/BuyerDashboardLayout';
import BuyerDashboardPage from './pages/buyer/BuyerDashboardPage';
import BuyerOrdersPage from './pages/buyer/BuyerOrdersPage';
import BuyerQuotesPage from './pages/buyer/BuyerQuotesPage';
import BuyerSavedProductsPage from './pages/buyer/BuyerSavedProductsPage';
import MessagesPage from './pages/MessagesPage';

const ProtectedRoute: React.FC<{ children: React.ReactElement; role?: 'supplier' | 'buyer' }> = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="browse" element={<BrowsePage />} />
            <Route path="browse/:productId" element={<ProductDetailPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route 
              path="messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            
            {/* Supplier Dashboard Routes */}
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute role="supplier">
                  <SupplierDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="profile" element={<SupplierProfilePage />} />
              <Route path="products" element={<SupplierProductsPage />} />
              <Route path="orders" element={<SupplierOrdersPage />} />
              <Route path="analytics" element={<SupplierAnalyticsPage />} />
            </Route>

            {/* Buyer Dashboard Routes */}
            <Route 
              path="buyer-dashboard"
              element={
                <ProtectedRoute role="buyer">
                  <BuyerDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BuyerDashboardPage />} />
              <Route path="orders" element={<BuyerOrdersPage />} />
              <Route path="quotes" element={<BuyerQuotesPage />} />
              <Route path="saved-products" element={<BuyerSavedProductsPage />} />
            </Route>

          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
