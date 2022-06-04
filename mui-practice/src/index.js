import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignUp from './Components/SignUp';
import Button from '@mui/material/Button'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Button>Hi</Button>
    <SignUp>1</SignUp>
  </React.StrictMode>
);
