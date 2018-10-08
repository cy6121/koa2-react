/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../component/AsyncComponent';

const Home = require('../container/home').default;
const About = __CLIENT__ ? asyncComponent(() => import('../container/about')) : require('../container/about').default;

export const routes = [
  { key: 'home', path: '/', component: Home, exact: true },
  { key: 'about', path: '/about', component: About, exact: true },
];

export default function Routes() {
  return (
    <Switch>
      {routes.map(route => <Route {...route} />)}
    </Switch>
  );
}
