import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './services/firebase';
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);