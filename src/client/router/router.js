/**
 * Created by Raion on 2019/2/19.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../container/home/home';
import NotFound from '../container/NotFound';

// const routes = [
//   { exact: true, key: 'app', path: '/', component: App },
//   { exact: true, key: '404', path: '/404', component: NotFound },
// ];

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/notFound" component={NotFound} />
  </Switch>
);
