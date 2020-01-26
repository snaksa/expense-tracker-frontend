import React from 'react';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';

let theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: orange,
  },
  status: {
    danger: red,
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <HomePage />
    </MuiThemeProvider>
  );
}

export default App;
