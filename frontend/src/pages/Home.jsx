import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FactoryIcon from '@mui/icons-material/Factory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function HomePage() {
  const features = [
    {
      icon: <FactoryIcon sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'Manufacturer Registry',
      description: 'Connect with certified Omani manufacturers and suppliers.',
    },
    {
      icon: <StorefrontIcon sx={{ fontSize: 48, color: '#f57c00' }} />,
      title: 'Product Catalog',
      description: 'Browse and discover a wide range of local products.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: '#4caf50' }} />,
      title: 'Market Insights',
      description: 'Access analytics and trends in Omani manufacturing.',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            py: 6,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h1" sx={{ color: '#1565c0', mb: 2 }}>
            Welcome to Make it Oman
          </Typography>
          <Typography variant="h5" sx={{ color: '#666', mb: 4 }}>
            Supporting Omani Manufacturing & Entrepreneurship
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/manufacturers"
            sx={{ mr: 2, backgroundColor: '#1976d2' }}
          >
            Explore Manufacturers
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/products"
            sx={{ borderColor: '#f57c00', color: '#f57c00' }}
          >
            Browse Products
          </Button>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8, py: 6, backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#333' }}>
            Ready to grow your business?
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: '#f57c00', padding: '12px 32px' }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
}