import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import 'popper.js/dist/popper';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
