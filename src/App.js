import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import Hero from './components/organisms/hero';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: orange,
  },
  status: {
    danger: red,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Hero />
    </MuiThemeProvider>
  );
}

export default App;
