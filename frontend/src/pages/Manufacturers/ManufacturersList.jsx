import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Grid, Card, CardContent, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../i18n';

const mockManufacturers = [
  { id: 1, name: 'Oman Ceramics Industries', industry: 'Ceramics', location: 'Muscat', description: 'Leading ceramics manufacturer specializing in high-quality tiles and pottery.', phone: '+968 2212 3456', email: 'info@omanceramics.om', certifications: ['ISO 9001', 'ISO 14001'], capabilities: ['Manufacturing', 'Design', 'Export'] },
  { id: 2, name: 'Gulf Plastic Solutions', industry: 'Plastics', location: 'Sohar', description: 'Manufacturer of plastic products and packaging solutions.', phone: '+968 2623 5678', email: 'sales@gulfplastic.om', certifications: ['ISO 9001'], capabilities: ['Injection Molding', 'Extrusion', 'Custom Design'] },
  { id: 3, name: 'Oman Steel Enterprises', industry: 'Steel', location: 'Salalah', description: 'Specialized in steel fabrication and structural work.', phone: '+968 2370 1234', email: 'enquiries@omasteelent.om', certifications: ['ISO 9001', 'ISO 3834'], capabilities: ['Fabrication', 'Welding', 'Structural Work'] },
  { id: 4, name: 'Muscat Textiles Ltd', industry: 'Textiles', location: 'Muscat', description: 'Premium textile manufacturing and fabric production.', phone: '+968 2411 5678', email: 'textile@muscattex.om', certifications: ['ISO 9001', 'OEKO-TEX'], capabilities: ['Weaving', 'Dyeing', 'Finishing'] },
];

const industries = ['All', 'Ceramics', 'Plastics', 'Steel', 'Textiles'];
const locations = ['All', 'Muscat', 'Sohar', 'Salalah', 'Nizwa', 'Sur'];

export default function ManufacturersList() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredManufacturers = mockManufacturers.filter((mfg) => {
    const matchesSearch = mfg.name.toLowerCase().includes(searchTerm.toLowerCase()) || mfg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || mfg.industry === selectedIndustry;
    const matchesLocation = selectedLocation === 'All' || mfg.location === selectedLocation;
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>{t('manufacturers.title', language)}</Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>{t('manufacturers.subtitle', language)}</Typography>
        </Box>

        <Card sx={{ mb: 4, p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
            <TextField fullWidth placeholder={t('manufacturers.search', language)} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: '#999' }} /></InputAdornment>) }} sx={{ flex: 1 }} />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>{t('manufacturers.industry', language)}</InputLabel>
              <Select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} label={t('manufacturers.industry', language)}>
                {industries.map((ind) => (<MenuItem key={ind} value={ind}>{ind === 'All' ? t('common.all', language) : ind}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>{t('manufacturers.location', language)}</InputLabel>
              <Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} label={t('manufacturers.location', language)}>
                {locations.map((loc) => (<MenuItem key={loc} value={loc}>{loc === 'All' ? t('common.all', language) : loc}</MenuItem>))}
              </Select>
            </FormControl>
          </Box>
        </Card>

        {filteredManufacturers.length > 0 ? (
          <>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>{filteredManufacturers.length} {t('manufacturers.resultsFound', language)}</Typography>
            <Grid container spacing={3}>
              {filteredManufacturers.map((mfg) => (
                <Grid item xs={12} sm={6} md={6} key={mfg.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transform: 'translateY(-4px)', transition: 'all 0.3s ease' } }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2, mb: 2 }}>
                        <Box sx={{ backgroundColor: '#1976d2', color: 'white', borderRadius: '50%', p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FactoryIcon /></Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{mfg.name}</Typography>
                          <Typography variant="caption" sx={{ color: '#f57c00', fontWeight: 600 }}>{mfg.industry}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>{mfg.description}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#666' }}><LocationOnIcon sx={{ fontSize: 18 }} /><Typography variant="body2">{mfg.location}</Typography></Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#666' }}><PhoneIcon sx={{ fontSize: 18 }} /><Typography variant="body2">{mfg.phone}</Typography></Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#666' }}><EmailIcon sx={{ fontSize: 18 }} /><Typography variant="body2">{mfg.email}</Typography></Box>
                      {mfg.certifications.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5 }}>{t('manufacturers.certifications', language)}</Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {mfg.certifications.map((cert) => (<Typography key={cert} variant="caption" sx={{ backgroundColor: '#e8f4f8', color: '#1976d2', px: 1, py: 0.5, borderRadius: 1 }}>{cert}</Typography>))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                    <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
                      <Button fullWidth variant="contained" sx={{ backgroundColor: '#1976d2' }} onClick={() => navigate(`/manufacturers/${mfg.id}`)}>{t('manufacturers.viewDetails', language)}</Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <FactoryIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>{t('manufacturers.noResults', language)}</Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>{t('manufacturers.tryAdjusting', language)}</Typography>
          </Card>
        )}
      </Container>
    </Box>
  );
}
