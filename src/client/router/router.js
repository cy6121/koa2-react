/**
 * Created by Raion on 2019/2/19.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../container/home/home';
import NotFound from '../container/NotFound';

export const routes = [
  { exact: true, key: 'home', path: '/', component: Home },
  { exact: true, key: '404', path: '/404', component: NotFound },
];

export default () => (
  <Switch>
    {routes.map(route => (<Route {...route} />))}
  </Switch>
);
