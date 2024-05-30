import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './DesktopApp.js'; 
import reportWebVitals from './reportWebVital'; 
import GlobalStyles from './components/globalStyle';
import { EventProvider } from './Context/EventContext.js';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventProvider>
      <Router>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </Router>
    </EventProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
