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
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

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

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // If account already exists or custom error from server
      if (response.data && response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: response.data.message,
          confirmButtonColor: '#7743DB',
        });
        return;
      }

      // Successful signup
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);

        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'You can now log in to your account.',
          confirmButtonColor: '#7743DB',
        }).then(() => {
          navigate("/login");
        });
      }

    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: errorMessage,
        confirmButtonColor: '#7743DB',
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <Navbar className="animate-fade-in" />
      <Container
        className="animate-fade-in"
        maxWidth="sm"
        sx={{
          // pt: 8,
          minHeight: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: '#7743DB',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Create Your Scribly Account 🚀
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ mb: 4, color: '#666666' }}
          >
            Sign up and start organizing your notes smarter!
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
                  background: 'linear-gradient(45deg, #7743DB, #9C6FE4)',
                  fontWeight: 700,
                  color: '#fff',
                  px: 5,
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6a38c4, #8e60e4)',
                  },
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
