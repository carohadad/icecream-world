import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form';
import DataPrev from './DataPrev';
import Results from './Results';
import AppBar from 'material-ui/AppBar';

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="Ice Cream World"
        showMenuIconButton={false}
      />
      <DataPrev />
      <Form />
      <Results />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
