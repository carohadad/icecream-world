import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form';
import DataPrev from './DataPrev';
import Results from './Results';

const App = () => (
  <MuiThemeProvider>
    <div>
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
