import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

import '@mantine/core/styles.css'; // ✅ Mantine v7 global styles
import './index.css'; // Your own styles if needed


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ primaryColor: 'blue' }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
