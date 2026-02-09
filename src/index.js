import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="645211699424-i5i2e65luv25i38s655okpqc1qr4afuo.apps.googleusercontent.com">
        <React.StrictMode>
            <App clientId="645211699424-i5i2e65luv25i38s655okpqc1qr4afuo.apps.googleusercontent.com" />
        </React.StrictMode>
    </GoogleOAuthProvider>,
);

reportWebVitals();
