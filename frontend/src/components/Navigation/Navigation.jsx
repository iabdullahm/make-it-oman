import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ManufacturingIcon from '@mui/icons-material/Factory';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../i18n';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export default function Navigation() {
  const { language } = useLanguage();

  const navLinks = [
    { label: t('nav.home', language), path: '/' },
    { label: t('nav.manufacturers', language), path: '/manufacturers' },
    { label: t('nav.products', language), path: '/products' },
    { label: t('nav.dashboard', language), path: '/dashboard' },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1565c0' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ManufacturingIcon sx={{ fontSize: 32, color: 'white' }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
              }}
            >
              Make it Oman
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={RouterLink}
                to={link.path}
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}