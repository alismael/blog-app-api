import * as React from "react"
import * as ReactDOM from "react-dom"
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from "react-redux"
import store from "./store"

import DashboardPage from "./dashboard/containers/DashboardPage"

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <DashboardPage />
    </MuiThemeProvider>
  </Provider>,
  app
);