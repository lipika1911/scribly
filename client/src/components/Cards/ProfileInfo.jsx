import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Stack,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <Box ml="auto">
      <IconButton onClick={handleMenuOpen} sx={{ display: 'flex', alignItems: 'center', gap: 1 }} disableRipple>
        <Avatar
          sx={{
            bgcolor: 'primary.contrastText',
            color: 'primary.main',
            fontWeight: 'bold',
            width: 36,
            height: 36,
          }}
        >
          {getInitials(userInfo?.fullName)}
        </Avatar>
        <KeyboardArrowDownIcon sx={{ color: 'primary.contrastText' }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 150,
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="subtitle2" fontWeight={600}>
            {userInfo?.fullName || 'User'}
          </Typography>
        </Box>
        <MenuItem 
          onClick={handleLogout}
          sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'error.main',
                '& svg': {
                  color: 'error.main',
                },
              },
            }}
          >
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileInfo;
