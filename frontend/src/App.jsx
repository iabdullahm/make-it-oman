import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createOmanTheme } from './theme/rtlTheme';
import { useLanguage } from './hooks/useLanguage';

// Redux
import { checkAuth } from './store/slices/authSlice';

// Components
import Navigation from './components/Navigation/Navigation';

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

function AppContent() {
  const dispatch = useDispatch();
  const { language } = useLanguage();

  // Create theme with dynamic direction based on language
  const theme = createOmanTheme(language === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/manufacturers" element={<ManufacturersPage />} />
          <Route path="/manufacturers/:id" element={<ManufacturerDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;