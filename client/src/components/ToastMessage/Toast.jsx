import React from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTheme } from '@mui/material/styles';

const Toast = ({ isShown, message, type, onClose }) => {
  const theme = useTheme();
  const isDelete = type === 'delete';

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  return (
    <Box sx={{ position: 'fixed', top: 100, right: 24, zIndex: 1400 }}>
      {isShown && (
        <Snackbar
          open={isShown}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: 6 }}
          key={`${type}-${message}`} // 💡 Key forces remount
        >
          <Alert
            onClose={handleClose}
            severity={isDelete ? 'error' : 'success'}
            icon={
              isDelete ? (
                <DeleteOutlineIcon fontSize="inherit" sx={{ color: theme.palette.error.main }} />
              ) : (
                <CheckCircleOutlineIcon fontSize="inherit" sx={{ color: theme.palette.success.main }} />
              )
            }
            variant="standard"
            sx={{
              width: '100%',
              bgcolor: '#ffffff',
              color: isDelete
                ? theme.palette.error.main
                : theme.palette.success.main,
              fontWeight: 500,
              borderLeft: `5px solid ${
                isDelete ? theme.palette.error.main : theme.palette.success.main
              }`,
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
              borderRadius: 2,
              px: 2,
              py: 1.5,
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Toast;
