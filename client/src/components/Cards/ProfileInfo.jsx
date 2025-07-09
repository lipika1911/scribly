import React from 'react';
import { Avatar, Typography, Button, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({onLogout}) => {
  const userName = 'Lipika Arya';

  return (
    <Stack direction="row" spacing={2} alignItems="center" ml="auto">
      <Avatar
        sx={{
          bgcolor: 'primary.contrastText',
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        {getInitials(userName)}
      </Avatar>

      <Stack direction="column" spacing={0.5} alignItems='center'>
        <Typography
          variant="subtitle2"
          sx={{ color: 'primary.contrastText', fontWeight: 600 }}
        >
          {userName}
        </Typography>

        <Button
          onClick={onLogout}
          variant="text"
          size="small"
          startIcon={<LogoutIcon fontSize="small" />}
          sx={{
            color: 'primary.contrastText',
            fontSize: '0.75rem',
            textTransform: 'none',
            paddingX: 1.5,
            paddingY: 0.5,
            fontWeight: 600,
            width: 'fit-content',
            alignSelf: 'flex-start',
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#7743DB',
            },
          }}
        >
          Logout
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfileInfo;
