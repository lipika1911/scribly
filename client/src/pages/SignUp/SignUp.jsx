import { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../../components/Navbar/Navbar';
import { validateEmail } from '../../utils/helper';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    let valid = true;
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) return;

    console.log("Signup successful:", name, email, password);

    // SIGNUP API
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
          pt: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Sign Up
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleSignup}
          >
            <FormControl fullWidth>
              <TextField
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                error={!!nameError}
                helperText={nameError}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                helperText={emailError}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  backgroundColor: '#7743DB',
                  fontWeight: 600,
                  alignSelf: 'center',
                  px: 6,
                }}
              >
                Create Account
              </Button>
            </FormControl>
          </Box>

          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Signup;
