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

export default function Navigation() {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Manufacturers', path: '/manufacturers' },
    { label: 'Products', path: '/products' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1565c0' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <ManufacturingIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.5rem',
            }}
          >
            Make it Oman
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}