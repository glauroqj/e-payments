import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as firebase from 'firebase';
import {config} from './auth.js'

/* css */
import './assets/vendor/normalize.css';
import './assets/vendor/template.css';
import './assets/vendor/animate.css';
import './assets/main.css';

console.log(process.env)
if(process.env === 'development') {
  firebase.initializeApp(config);
} else {
  firebase.initializeApp(`$AUTH`);
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);
