import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Card, CardContent, Typography, Button, Grid, Chip, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FactoryIcon from '@mui/icons-material/Factory';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../i18n';

const mockManufacturers = [
  { id: 1, name: 'Oman Ceramics Industries', industry: 'Ceramics', location: 'Muscat', description: 'Leading ceramics manufacturer specializing in high-quality tiles and pottery.', phone: '+968 2212 3456', email: 'info@omanceramics.om', certifications: ['ISO 9001', 'ISO 14001'], capabilities: ['Manufacturing', 'Design', 'Export'], fullDescription: 'We are a leading ceramics manufacturer in Oman with over 20 years of experience. Our products are exported to countries across the Middle East and beyond.' },
  { id: 2, name: 'Gulf Plastic Solutions', industry: 'Plastics', location: 'Sohar', description: 'Manufacturer of plastic products and packaging solutions.', phone: '+968 2623 5678', email: 'sales@gulfplastic.om', certifications: ['ISO 9001'], capabilities: ['Injection Molding', 'Extrusion', 'Custom Design'], fullDescription: 'Gulf Plastic Solutions specializes in high-quality plastic manufacturing with state-of-the-art equipment and skilled workforce.' },
  { id: 3, name: 'Oman Steel Enterprises', industry: 'Steel', location: 'Salalah', description: 'Specialized in steel fabrication and structural work.', phone: '+968 2370 1234', email: 'enquiries@omasteelent.om', certifications: ['ISO 9001', 'ISO 3834'], capabilities: ['Fabrication', 'Welding', 'Structural Work'], fullDescription: 'Oman Steel Enterprises is committed to delivering high-quality steel products and solutions for construction and industrial projects.' },
  { id: 4, name: 'Muscat Textiles Ltd', industry: 'Textiles', location: 'Muscat', description: 'Premium textile manufacturing and fabric production.', phone: '+968 2411 5678', email: 'textile@muscattex.om', certifications: ['ISO 9001', 'OEKO-TEX'], capabilities: ['Weaving', 'Dyeing', 'Finishing'], fullDescription: 'Muscat Textiles Ltd produces premium fabrics using sustainable and eco-friendly manufacturing processes.' },
];

export default function ManufacturerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const manufacturer = mockManufacturers.find((m) => m.id === parseInt(id));

  if (!manufacturer) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">
          <Alert severity="error">{t('manufacturers.notFound', language)}</Alert>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/manufacturers')} sx={{ mt: 2 }}>
            {t('common.back', language)}
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/manufacturers')} sx={{ mb: 3 }}>
          {t('common.back', language)}
        </Button>

        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 3, mb: 3 }}>
              <Box sx={{ backgroundColor: '#1976d2', color: 'white', borderRadius: '50%', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FactoryIcon sx={{ fontSize: 40 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>
                  {manufacturer.name}
                </Typography>
                <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 600, mb: 2 }}>
                  {manufacturer.industry}
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                  {manufacturer.fullDescription}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <LocationOnIcon sx={{ color: '#1976d2' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999' }}>{t('manufacturers.location', language)}</Typography>
                    <Typography variant="body1">{manufacturer.location}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PhoneIcon sx={{ color: '#1976d2' }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999' }}>{t('manufacturers.phone', language)}</Typography>
                    <Typography variant="body1">{manufacturer.phone}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mb: 4 }}>
              <PhoneIcon sx={{ color: '#1976d2', mr: 1, verticalAlign: 'middle' }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                <strong>{t('manufacturers.email', language)}:</strong> {manufacturer.email}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>{t('manufacturers.certifications', language)}</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {manufacturer.certifications.map((cert) => (
                  <Chip key={cert} label={cert} color="primary" variant="outlined" />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>{t('manufacturers.capabilities', language)}</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {manufacturer.capabilities.map((cap) => (
                  <Chip key={cap} label={cap} sx={{ backgroundColor: '#e8f4f8', color: '#1976d2' }} />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
