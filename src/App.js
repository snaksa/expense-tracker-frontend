import React from 'react';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Register from './components/organisms/register';


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

const client = new ApolloClient({
  uri: 'http://localhost:8080',
});



function App() {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <Register />
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
