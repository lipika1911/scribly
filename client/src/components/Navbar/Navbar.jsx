import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Box } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/dashboard';

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        onSearchNote(searchQuery);
      } else {
        handleClearSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, onSearchNote, handleClearSearch]);

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#7743DB', color: '#ffffff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box 
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                navigate('/dashboard');
              } else {
                navigate('/');
              }
            }}
          >
            <HistoryEduIcon sx={{ fontSize: 38, color: '#ffffff' }} />
            <Typography
              variant="h4"
              noWrap
              component="div"
              color="inherit"
              sx={{ fontWeight: 600 }}
            >
              Scribly
            </Typography>
          </Box>
          {isHomePage && (
            <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </Box>
          )}

          {isHomePage && (
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
