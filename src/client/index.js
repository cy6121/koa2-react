/* eslint-disable no-undef */
import './assets/css/main.pcss';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './router';

const renderDom = (Component) => {
  hydrate(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.getElementById('app'),
  );
};

renderDom(Routes);

if (__DEV__ && module.hot) {
  module.hot.accept('./router', () => {
    const App = require('./router').default;
    renderDom(App);
  });
}
