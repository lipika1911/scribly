import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, Fade } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const texts = [
  "Capture your thoughts effortlessly and keep them organized in one secure space.",
  "Stay on top of your day with smart note organization tailored just for you.",
  "Turn fleeting ideas into structured tasks and never lose track of what matters most.",
];

const Landing = () => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentSentence = texts[textIndex];
    if (charIndex < currentSentence.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + currentSentence.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText('');
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex]);

  return (
    <Box
      className="animate-fade-in"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-around',
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 0 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: 600,
        }}
      >
        <Fade in timeout={1000}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <HistoryEduIcon sx={{ fontSize: { xs: 40, md: 55 }, color: '#7743DB' }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: '#7743DB',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Scribly{' '}
              <span
                style={{
                  fontWeight: 500,
                  color: '#1A1A1A',
                  fontSize: '60%',
                }}
              >
                — Note Taking App
              </span>
            </Typography>
          </Stack>
        </Fade>

        <Typography
          variant="h5"
          sx={{
            color: '#1A1A1A',
            minHeight: '80px',
            fontWeight: 500,
          }}
        >
          {currentText}
          <span style={{ color: '#7743DB' }}>|</span>
        </Typography>

        <Stack direction="row" spacing={3} mt={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            href="/login"
            sx={{
              background: 'linear-gradient(45deg, #7743DB, #9C6FE4)',
              color: '#fff',
              boxShadow: '0px 4px 20px rgba(119, 67, 219, 0.4)',
              fontWeight: 600,
              px: 4,
              '&:hover': {
                background: 'linear-gradient(45deg, #6a38c4, #8e60e4)',
              },
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<HowToRegIcon />}
            href="/signup"
            sx={{
              borderColor: '#7743DB',
              color: '#7743DB',
              fontWeight: 600,
              px: 4,
              '&:hover': {
                backgroundColor: '#f3edff',
                borderColor: '#6a38c4',
              },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>

      {/* Right GIF */}
      <Box
        component="img"
        src="/landing.gif"
        alt="Landing gif"
        sx={{
          flex: 1,
          maxWidth: 500,
          width: '100%',
          borderRadius: 8,
          boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
          mt: { xs: 4, md: 0 },
        }}
      />
    </Box>
  );
};

export default Landing;
