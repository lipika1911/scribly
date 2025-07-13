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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;
    setEmailError("");
    setPasswordError("");

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
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
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
            Login
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleLogin}
          >
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
                Login
              </Button>
            </FormControl>
          </Box>

          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Not a member yet?{' '}
            <Link href="/signup" underline="hover">
              Create an Account
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
