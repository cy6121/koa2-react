/**
 * Created by Raion on 2019/2/19.
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './router/router';

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}