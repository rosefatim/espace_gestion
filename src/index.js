import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Composant from './Composant';
import Stack from "@mui/material/Stack";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode > 
    <Stack direction="row" spacing={2}  justifyContent="space-evenly"  alignItems="center">
      <App />
      <Stack>
        <Composant />
      </Stack>
    </Stack>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
