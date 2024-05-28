import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton, useMediaQuery } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost/v1/register', {
        email,
        password,
        birthDate,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      console.log(user);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={isMobile ? 'xs' : 'sm'}>
      <Box sx={{ mt: isMobile ? 4 : 8, textAlign: 'center' }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
          Regístrate en TikTok
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Correo electrónico"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Nombre de usuario"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Fecha de nacimiento (mes/dia/año)"
            type="text"
            variant="outlined"
            margin="normal"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleRegister}
          >
            Regístrate
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <IconButton color="primary" onClick={handleGoogleSignIn}>
            <Google />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 3 }}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
