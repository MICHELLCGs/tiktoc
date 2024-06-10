import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MobileDesign from './mobile/MobileApp';
import DesktopDesign from './desktop/DesktopApp';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MobilProfile from './mobile/Profile/Profile';

function App() {
  // const prefersDesktop = useMediaQuery('(min-width:600px)');
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={/* prefersDesktop ? <DesktopDesign /> : */ <MobileDesign />}
          />
          <Route path="/perfil" element={<MobilProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
