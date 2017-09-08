import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='contact' component={Contact} />
    <Route path='*' component={Home} />
  </Route>
);