import React from 'react';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { EventProvider } from './Context/EventContext.js';
import GlobalStyles from '../components/globalStyle';
import Header from '../desktop/pages/Default/Header/Header';
import DefaultLayout from '../desktop/pages/Default/index';
import Home from '../desktop/pages/Home/index.js';
import Following from './pages/Following';
import Message, { LayoutMessage } from './pages/Message';
import DetailVideo, { LayoutDetailVideo } from './pages/Detail-Video';
import DisplayUserInvalidate, { LayoutDisplayUserInvalidate } from './pages/Default/Auth';

const DesktopDesign = () => {
  return (
    <React.StrictMode>
      <EventProvider>
        <Container>
          <GlobalStyles>
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/following" element={<Following />} />
                <Route path="/message" element={<LayoutMessage><Message /></LayoutMessage>} />
                <Route path="/user-id/video/:id-video" element={<DetailVideo />} />
                <Route path="/test" element={<LayoutDisplayUserInvalidate><DisplayUserInvalidate /></LayoutDisplayUserInvalidate>} />
              </Routes>
            </DefaultLayout>
          </GlobalStyles>
        </Container>
      </EventProvider>
    </React.StrictMode>
  );
};

export default DesktopDesign;
