import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, TextField, Button, Typography, Card, CardContent, Alert, CircularProgress, Link, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../i18n';
import { registerUser } from '../../store/slices/authSlice';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'manufacturer',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const userTypes = [
    { value: 'manufacturer', label: t('auth.manufacturer', language) },
    { value: 'supplier', label: t('auth.supplier', language) },
    { value: 'buyer', label: t('auth.buyer', language) },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = t('auth.firstNameRequired', language);
    if (!formData.lastName.trim()) errors.lastName = t('auth.lastNameRequired', language);
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
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('auth.passwordMismatch', language);
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await dispatch(registerUser({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email, password: formData.password, userType: formData.userType })).unwrap();
      if (result) navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
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
              <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>{t('auth.register', language)}</Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>{t('auth.registerSubtitle', language)}</Typography>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField fullWidth label={t('auth.firstName', language)} name="firstName" value={formData.firstName} onChange={handleChange} error={!!validationErrors.firstName} helperText={validationErrors.firstName} margin="normal" disabled={loading} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }} />
              <TextField fullWidth label={t('auth.lastName', language)} name="lastName" value={formData.lastName} onChange={handleChange} error={!!validationErrors.lastName} helperText={validationErrors.lastName} margin="normal" disabled={loading} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }} />
              <TextField fullWidth label={t('auth.email', language)} name="email" type="email" value={formData.email} onChange={handleChange} error={!!validationErrors.email} helperText={validationErrors.email} margin="normal" placeholder="user@example.com" disabled={loading} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }} />
              <FormControl fullWidth margin="normal" disabled={loading}>
                <InputLabel>{t('auth.userType', language)}</InputLabel>
                <Select name="userType" value={formData.userType} onChange={handleChange} label={t('auth.userType', language)} sx={{ backgroundColor: 'white' }}>
                  {userTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField fullWidth label={t('auth.password', language)} name="password" type="password" value={formData.password} onChange={handleChange} error={!!validationErrors.password} helperText={validationErrors.password} margin="normal" placeholder="••••••••" disabled={loading} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }} />
              <TextField fullWidth label={t('auth.confirmPassword', language)} name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={!!validationErrors.confirmPassword} helperText={validationErrors.confirmPassword} margin="normal" placeholder="••••••••" disabled={loading} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }} />
              <Typography component="label" variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3, color: '#666', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: 8 }} required />{t('auth.agreeTerms', language)}
              </Typography>
              <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ backgroundColor: '#1976d2', py: 1.5, fontSize: '1rem', fontWeight: 600, textTransform: 'none', mb: 2, '&:hover': { backgroundColor: '#1565c0' } }}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('auth.signUp', language)}
              </Button>
              <Box sx={{ borderTop: '1px solid #ddd', my: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>{t('auth.alreadyHaveAccount', language)}</Typography>
                <Button fullWidth variant="outlined" component={RouterLink} to="/login" disabled={loading} sx={{ borderColor: '#f57c00', color: '#f57c00', textTransform: 'none', '&:hover': { borderColor: '#e65100', backgroundColor: 'rgba(245, 124, 0, 0.05)' } }}>{t('auth.signIn', language)}</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#999' }}>{t('auth.registerSecure', language)}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
