import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={10}
      width="100%"
    >
      <Box
        component="img"
        src={imgSrc}
        alt="No Notes"
        sx={{
          width: '100%',
          maxWidth: 400,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          mt: 3,
          width: '50%',
          fontSize: '1.2rem',
          fontWeight: 500,
          textAlign: 'center',
          color: 'text.secondary',
          lineHeight: 1.8,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyCard;
