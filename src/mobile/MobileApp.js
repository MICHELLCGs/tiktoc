import React from 'react';
import { Container} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Feed from '../mobile/Feed/video';


const MobileDesign = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
    </Container>
  );
};

export default MobileDesign;
