import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';
import { Provider } from "react-redux"
import store from "./store"

const app = document.getElementById('app')

ReactDom.render(<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>
</Provider>, app);
