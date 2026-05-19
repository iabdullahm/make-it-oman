import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Card, CardContent, CardMedia, Typography, Button, Rating, Grid, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../i18n';

const mockProducts = [
  {
    id: 1,
    name: 'Ceramic Wall Tiles',
    manufacturer: 'Oman Ceramics Industries',
    category: 'Building Materials',
    price: 45,
    image: 'https://via.placeholder.com/400x300?text=Ceramic+Tiles',
    description: 'High-quality ceramic tiles for interior decoration.',
    rating: 4.5,
    reviews: 120,
    fullDescription: 'Our ceramic tiles are manufactured using the latest technology and premium raw materials. They are durable, stain-resistant, and available in various designs and colors to suit any interior style.',
    features: ['Stain resistant', 'Durable', 'Easy to clean', 'Eco-friendly'],
  },
  {
    id: 2,
    name: 'Plastic Packaging Box',
    manufacturer: 'Gulf Plastic Solutions',
    category: 'Packaging',
    price: 15,
    image: 'https://via.placeholder.com/400x300?text=Plastic+Box',
    description: 'Durable plastic packaging solution for shipping.',
    rating: 4,
    reviews: 85,
    fullDescription: 'Designed for safe transportation of goods. Our plastic boxes are lightweight, durable, and can be customized to meet your specific requirements.',
    features: ['Lightweight', 'Reusable', 'Customizable', 'Cost-effective'],
  },
  {
    id: 3,
    name: 'Steel I-Beams',
    manufacturer: 'Oman Steel Enterprises',
    category: 'Construction',
    price: 250,
    image: 'https://via.placeholder.com/400x300?text=Steel+Beams',
    description: 'Structural steel beams for construction projects.',
    rating: 5,
    reviews: 45,
    fullDescription: 'High-strength steel I-beams used in construction and structural applications. Manufactured to international standards with precise dimensions.',
    features: ['High strength', 'Precise dimensions', 'Tested quality', 'ISO certified'],
  },
  {
    id: 4,
    name: 'Cotton Fabric Roll',
    manufacturer: 'Muscat Textiles Ltd',
    category: 'Textiles',
    price: 75,
    image: 'https://via.placeholder.com/400x300?text=Cotton+Fabric',
    description: 'Premium cotton fabric for industrial use.',
    rating: 4.5,
    reviews: 62,
    fullDescription: 'Premium quality cotton fabric produced using sustainable methods. Suitable for garment manufacturing and industrial applications.',
    features: ['100% cotton', 'Sustainable', 'High quality', 'Various weights'],
  },
  {
    id: 5,
    name: 'Floor Tiles',
    manufacturer: 'Oman Ceramics Industries',
    category: 'Building Materials',
    price: 35,
    image: 'https://via.placeholder.com/400x300?text=Floor+Tiles',
    description: 'Durable floor tiles resistant to wear.',
    rating: 4.5,
    reviews: 98,
    fullDescription: 'Heavy-duty ceramic floor tiles designed to withstand high traffic areas. Available in different finishes and patterns.',
    features: ['Slip resistant', 'Heavy-duty', 'Easy maintenance', 'Multiple colors'],
  },
  {
    id: 6,
    name: 'Custom Plastic Inserts',
    manufacturer: 'Gulf Plastic Solutions',
    category: 'Packaging',
    price: 20,
    image: 'https://via.placeholder.com/400x300?text=Plastic+Insert',
    description: 'Custom-molded plastic inserts for packaging.',
    rating: 4,
    reviews: 55,
    fullDescription: 'Made-to-order plastic inserts that fit perfectly into your packaging requirements. Our expert team can design and manufacture custom solutions.',
    features: ['Custom design', 'Precision molded', 'Various materials', 'Fast turnaround'],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const product = mockProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">
          <Alert severity="error">{t('products.notFound', language)}</Alert>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/products')} sx={{ mt: 2 }}>
            {t('common.back', language)}
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/products')} sx={{ mb: 3 }}>
          {t('common.back', language)}
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia component="img" image={product.image} alt={product.name} sx={{ height: 400 }} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#999', mb: 2 }}>
                  {t('products.by', language)} {product.manufacturer}
                </Typography>
                <Typography variant="body2" sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', px: 2, py: 1, borderRadius: 1, display: 'inline-block', mb: 3 }}>
                  {product.category}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Rating value={product.rating} readOnly size="large" />
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    {product.rating} ({product.reviews} {t('products.reviews', language)})
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 700, mb: 3 }}>
                  {product.price} {t('products.currency', language)}
                </Typography>

                <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                  {product.fullDescription}
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>{t('products.features', language)}</Typography>
                  {product.features.map((feature, idx) => (
                    <Typography key={idx} variant="body2" sx={{ color: '#666', mb: 1 }}>
                      • {feature}
                    </Typography>
                  ))}
                </Box>

                <Button fullWidth variant="contained" size="large" startIcon={<ShoppingCartIcon />} sx={{ backgroundColor: '#f57c00', py: 2 }}>
                  {t('products.addToCart', language)}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
