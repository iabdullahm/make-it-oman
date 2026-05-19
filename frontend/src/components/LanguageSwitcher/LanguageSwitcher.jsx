import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        sx={{
          color: '#1976d2',
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
        }}
      >
        {language === 'ar' ? 'العربية' : 'English'}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => handleLanguageChange('en')}
          selected={language === 'en'}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('ar')}
          selected={language === 'ar'}
        >
          العربية
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
