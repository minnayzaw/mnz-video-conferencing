import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {googleClientId} from './config/Constants';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
        <React.StrictMode>
            <App clientId={googleClientId} />
        </React.StrictMode>
    </GoogleOAuthProvider>,
);

reportWebVitals();
