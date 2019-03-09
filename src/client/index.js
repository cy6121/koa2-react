/**
 * Created by Raion on 2019/2/19.
 */
import './assets/css/main.pcss';
import React from 'react';
import { hydrate } from 'react-dom';

import App from './App';

hydrate(
  <App />, document.getElementById('app'),
);
