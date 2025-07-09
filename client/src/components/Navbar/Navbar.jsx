import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login")
  }

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
          <ProfileInfo onLogout={onLogout}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
