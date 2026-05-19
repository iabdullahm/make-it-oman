import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Grid, Card, CardContent, CardMedia, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
    image: 'https://via.placeholder.com/300x200?text=Ceramic+Tiles',
    description: 'High-quality ceramic tiles for interior decoration.',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: 'Plastic Packaging Box',
    manufacturer: 'Gulf Plastic Solutions',
    category: 'Packaging',
    price: 15,
    image: 'https://via.placeholder.com/300x200?text=Plastic+Box',
    description: 'Durable plastic packaging solution for shipping.',
    rating: 4,
    reviews: 85,
  },
  {
    id: 3,
    name: 'Steel I-Beams',
    manufacturer: 'Oman Steel Enterprises',
    category: 'Construction',
    price: 250,
    image: 'https://via.placeholder.com/300x200?text=Steel+Beams',
    description: 'Structural steel beams for construction projects.',
    rating: 5,
    reviews: 45,
  },
  {
    id: 4,
    name: 'Cotton Fabric Roll',
    manufacturer: 'Muscat Textiles Ltd',
    category: 'Textiles',
    price: 75,
    image: 'https://via.placeholder.com/300x200?text=Cotton+Fabric',
    description: 'Premium cotton fabric for industrial use.',
    rating: 4.5,
    reviews: 62,
  },
  {
    id: 5,
    name: 'Floor Tiles',
    manufacturer: 'Oman Ceramics Industries',
    category: 'Building Materials',
    price: 35,
    image: 'https://via.placeholder.com/300x200?text=Floor+Tiles',
    description: 'Durable floor tiles resistant to wear.',
    rating: 4.5,
    reviews: 98,
  },
  {
    id: 6,
    name: 'Custom Plastic Inserts',
    manufacturer: 'Gulf Plastic Solutions',
    category: 'Packaging',
    price: 20,
    image: 'https://via.placeholder.com/300x200?text=Plastic+Insert',
    description: 'Custom-molded plastic inserts for packaging.',
    rating: 4,
    reviews: 55,
  },
];

const categories = ['All', 'Building Materials', 'Packaging', 'Construction', 'Textiles'];
const priceRanges = ['All', '$0-50', '$50-100', '$100-200', '$200+'];

export default function ProductsList() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  const getPriceRange = (price) => {
    if (price <= 50) return '$0-50';
    if (price <= 100) return '$50-100';
    if (price <= 200) return '$100-200';
    return '$200+';
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPriceRange = selectedPriceRange === 'All' || getPriceRange(product.price) === selectedPriceRange;
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>
            {t('products.title', language)}
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>{t('products.subtitle', language)}</Typography>
        </Box>

        <Card sx={{ mb: 4, p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder={t('products.search', language)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>{t('products.category', language)}</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label={t('products.category', language)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat === 'All' ? t('common.all', language) : cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>{t('products.priceRange', language)}</InputLabel>
              <Select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                label={t('products.priceRange', language)}
              >
                {priceRanges.map((range) => (
                  <MenuItem key={range} value={range}>
                    {range === 'All' ? t('common.all', language) : range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Card>

        {filteredProducts.length > 0 ? (
          <>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              {filteredProducts.length} {t('products.resultsFound', language)}
            </Typography>
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{ backgroundColor: '#eee' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5 }}>
                        {t('products.by', language)} {product.manufacturer}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          display: 'inline-block',
                          mb: 1,
                        }}
                      >
                        {product.category}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Rating value={product.rating} readOnly size="small" />
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          ({product.reviews} {t('products.reviews', language)})
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 700 }}>
                        {product.price} {t('products.currency', language)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        sx={{ backgroundColor: '#f57c00' }}
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        {t('products.viewDetails', language)}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
              {t('products.noResults', language)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              {t('products.tryAdjusting', language)}
            </Typography>
          </Card>
        )}
      </Container>
    </Box>
  );
}
