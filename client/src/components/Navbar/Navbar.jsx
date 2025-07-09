import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Box } from '@mui/material';
import { useState } from 'react';

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login")
  }

  const handleSearch = () => {
  }

  const onClearSearch = () => {
    setSearchQuery("");
  }


  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary', color: '#000000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            color='primary.contrastText'
          >
            Scribly
          </Typography>
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <SearchBar 
              value={searchQuery}
              onChange={({target}) => {
                setSearchQuery(target.value);
              }}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </Box>
          <ProfileInfo onLogout={onLogout}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
