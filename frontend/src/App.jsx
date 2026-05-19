import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux
import { checkAuth } from './store/slices/authSlice';

// Layouts
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import ManufacturersPage from './pages/Manufacturers/ManufacturersList';
import ManufacturerDetailPage from './pages/Manufacturers/ManufacturerDetail';
import ProductsPage from './pages/Products/ProductsList';
import ProductDetailPage from './pages/Products/ProductDetail';
import DashboardPage from './pages/Dashboard';
import NotFoundPage from './pages/NotFound';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/manufacturers' element={<ManufacturersPage />} />
          <Route path='/manufacturers/:id' element={<ManufacturerDetailPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<ProductDetailPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;