import React from 'react';
import {render} from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from './containers/LoginPage.jsx'

class App extends React.Component {
  render () {
    return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <LoginPage />
            </MuiThemeProvider>
            );
  }
}
render(<App/>, document.getElementById('app'));