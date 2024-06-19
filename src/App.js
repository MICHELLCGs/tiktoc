import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import Home from '../src/pages/Feed/video';
import HomeDesktop from './pages/Feed/HomeDesktop';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { lightTheme, darkTheme } from './theme';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const selectedTheme = prefersDarkMode ? darkTheme : lightTheme;
  const isDesktop = useMediaQuery('(min-width: 480px)');

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {isDesktop ? <HomeDesktop /> : <Home />}
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
