import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/components/App';
import Home from './app/components/Home';
import LoginPage from './auth/containers/LoginPage';
import DashboardPage from './dashboard/containers/DashboardPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='login' component={LoginPage} />
    <Route path='dashboard' component={DashboardPage} />
    <Route path='*' component={Home} />
  </Route>
);