import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form';

const App = () => (
  <MuiThemeProvider>
    <Form />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
