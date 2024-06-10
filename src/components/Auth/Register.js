import React, { useState, useMemo } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton, useMediaQuery } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { createUser } from '../api/userService';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Register = () => {
  const navigate = useNavigate(); // Obtiene la función de navegación
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  // Genera el username a partir del fullName
  const generateUsername = (fullName) => {
    const words = fullName.split(' '); // Divide el fullName en palabras
    const username = words.join(''); // Une todas las palabras sin espacios
    return username.toLowerCase(); // Convierte a minúsculas
  };

  // Genera el avatar basado en el username
  const avatar = useMemo(() => {
    const username = generateUsername(fullName);
    return createAvatar(thumbs, {
      seed: username || 'default', // Usar el nombre de usuario para generar el avatar
      size: 128,
    }).toDataUriSync();
  }, [fullName]);

  const handleRegister = async () => {
    try {
      const userData = {
        email: email,
        password: password,
        username: username,
        full_name: fullName,
        profile_picture: avatar, // Usa el avatar generado
        date_joined: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };
      console.log("User Data:", userData); // Agregar este console.log para verificar los datos antes de enviarlos
      await createUser(userData);
      console.log("User created successfully"); // Agregar este console.log para verificar que el usuario se haya creado correctamente
      navigate('/');
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
  
      const userData = {
        email: user.email,
        uuid: user.uid, // Este ID es proporcionado por Firebase
        username: user.displayName,
        full_name: user.displayName || '', // Nombre completo proporcionado por Google
        profile_picture: user.photoURL,
        date_joined: new Date().toISOString(),
        last_login: new Date().toISOString(), // Puedes registrar la última fecha de inicio de sesión aquí
      };
      await createUser(userData);
  
      console.log(user);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <Container maxWidth={isMobile ? 'xs' : 'sm'}>
      <Box sx={{ mt: isMobile ? 4 : 8, textAlign: 'center' }}>
        <Typography variant={isMobile ? 'h2' : 'h2'} gutterBottom>
          Regístrate en TikToc
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Nombre completo"
            variant="outlined"
            margin="normal"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setUsername(generateUsername(e.target.value)); // Actualiza el username al cambiar el fullName
            }}
          />
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
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Nombre de usuario"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img src={avatar} alt="Avatar" />
          </Box>
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
        <Typography variant="body1" sx={{ mt: 3 }}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </Typography>
        <br></br>
      </Box>
    </Container>
  );
};

export default Register;
