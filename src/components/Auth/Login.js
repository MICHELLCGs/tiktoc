import React from 'react';
import { Container, Box, Typography, TextField, Button, Divider, IconButton, useMediaQuery } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth={isMobile ? 'xs' : 'sm'}>
      <Box sx={{ mt: isMobile ? 4 : 8, textAlign: 'center' }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
          Iniciar sesión en TikTok
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Correo electrónico o nombre de usuario"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </Box>
        <Divider sx={{ my: 3 }}>o</Divider>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton color="primary">
            <Facebook />
          </IconButton>
          <IconButton color="secondary">
            <Google />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 3 }}>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
