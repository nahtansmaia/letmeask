import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from "react-hot-toast";
import { HashRouter } from 'react-router-dom';
import App from './App';
import './services/firebase';
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
      <Toaster position="top-right" />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);