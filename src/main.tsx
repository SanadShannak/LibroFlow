import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{}} // Optional: you can add your custom theme here
      defaultColorScheme="light"
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
