import React from 'react';
import { Container} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from '../desktop/pages/Default/Header/Header';

const DesktopDesign = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </Container>
  );
};

export default DesktopDesign;
