import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7743DB', 
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFBF5',  
      paper: 'F7EFE5',    
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666', 
    },
    success: {
      main: '#28a745',
    },
    error: {
      main: '#dc3545',
    },
    warning: {
      main: '#ffc107',
    },
    info: {
      main: '#17a2b8',
    },
  },
});

export default theme;
