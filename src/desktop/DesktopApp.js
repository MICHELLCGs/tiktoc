import React from 'react';
import { Container} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Feed from '../desktop/Feed/Feed';

const DesktopDesign = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </Container>
  );
};

export default DesktopDesign;
