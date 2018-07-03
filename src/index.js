import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as firebase from 'firebase';
import {config} from './auth.js'

/* css */
import './assets/normalize.css';
import './assets/template.css';
import './assets/main.css';

firebase.initializeApp(config);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);
