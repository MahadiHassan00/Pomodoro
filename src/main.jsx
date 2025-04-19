import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

console.log('React is initializing');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React has rendered');
