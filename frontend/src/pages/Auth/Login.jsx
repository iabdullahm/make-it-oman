import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, TextField, Button, Typography, Card, CardContent, Alert, CircularProgress, Link } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../i18n';
import { loginUser } from '../../store/slices/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = t('auth.emailRequired', language);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('auth.invalidEmail', language);
    }
    if (!formData.password) {
      errors.password = t('auth.passwordRequired', language);
    } else if (formData.password.length < 6) {
      errors.password = t('auth.passwordMinLength', language);
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
      if (result) navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                <FactoryIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1565c0' }}>Make it Oman</Typography>
              </Box>
              <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>{t('auth.login', language)}</Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>{t('auth.loginSubtitle', language)}</Typography>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField fullWidth label={t('auth.email', language)} name="email" type="email" value={formData.email} onChange={handleChange} error={!!validationErrors.email} helperText={validationErrors.email} margin="normal" placeholder="user@example.com" disabled={loading} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }} />
              <TextField fullWidth label={t('auth.password', language)} name="password" type="password" value={formData.password} onChange={handleChange} error={!!validationErrors.password} helperText={validationErrors.password} margin="normal" placeholder="••••••••" disabled={loading} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }} />
              <Typography component="label" variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3, color: '#666', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: 8 }} />{t('auth.rememberMe', language)}
              </Typography>
              <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ backgroundColor: '#1976d2', py: 1.5, fontSize: '1rem', fontWeight: 600, textTransform: 'none', mb: 2, '&:hover': { backgroundColor: '#1565c0' } }}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('auth.signIn', language)}
              </Button>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Link component={RouterLink} to="/forgot-password" sx={{ color: '#1976d2', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>{t('auth.forgotPassword', language)}</Link>
              </Box>
              <Box sx={{ borderTop: '1px solid #ddd', my: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>{t('auth.noAccount', language)}</Typography>
                <Button fullWidth variant="outlined" component={RouterLink} to="/register" disabled={loading} sx={{ borderColor: '#f57c00', color: '#f57c00', textTransform: 'none', '&:hover': { borderColor: '#e65100', backgroundColor: 'rgba(245, 124, 0, 0.05)' } }}>{t('auth.createAccount', language)}</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#999' }}>{t('auth.loginSecure', language)}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
