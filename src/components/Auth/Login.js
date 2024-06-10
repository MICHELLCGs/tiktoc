import React, { useState } from 'react';
import { Modal, Container, Box, Typography, TextField, Button, Divider, IconButton, useMediaQuery } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { loginUser, createUser } from '../api/userService';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      console.log('Login successful:', response);
      // Redirigir a la página de inicio o donde necesites
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Correo electrónico o contraseña incorrectos');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        email: user.email,
        uuid: user.uid,
        username: user.displayName,
        full_name: user.displayName || '',
        profile_picture: user.photoURL,
        date_joined: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      try {
        await createUser(userData);
        console.log('Usuario creado exitosamente:', user);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log('El usuario ya existe, iniciando sesión:', user);
        } else {
          //throw error; // Si el error no es 400, lanzar el error
          setShowModal(true);
          navigate('/register');
        }
      }

      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container maxWidth={isMobile ? 'xs' : 'sm'}>
      <Box sx={{ mt: isMobile ? 4 : 8, textAlign: 'center' }}>
        <Typography variant={isMobile ? 'h2' : 'h2'} gutterBottom>
          Iniciar sesión en TikToc
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>
        </Box>
        <Divider sx={{ my: 3 }}>o</Divider>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton color="primary" onClick={handleGoogleSignIn}>
            <Google />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mt: 3 }}>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </Typography>
      </Box>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ p: 3, backgroundColor: 'white', margin: 'auto', mt: '10%', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Error
          </Typography>
          <Typography variant="body1">
            Se requiere registrarse para continuar.
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Login;


