import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary', color: '#000000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{flexGrow: 1 }}
            color='primary.contrastText'
          >
            Scribly
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
