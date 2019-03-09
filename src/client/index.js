/* eslint-disable */
/**
 * Created by Raion on 2019/2/19.
 */
import './assets/css/main.pcss';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store/store';

const store = configureStore(window.__INITIAL_STATE__);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'),
);
