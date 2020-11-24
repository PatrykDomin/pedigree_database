import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './styles/theme';
import { BrowserRouter } from 'react-router-dom';

const MainComponent: React.FC = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.render(<MainComponent />, document.getElementById('root'));
