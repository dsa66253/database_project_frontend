import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProfileProvider } from './Hooks/useProfile';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProfileProvider>
      <App/>
    </ProfileProvider>
);


reportWebVitals();
