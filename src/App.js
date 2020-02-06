import React from 'react';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core/styles';
import { pink, red } from '@material-ui/core/colors';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import HomePages from './components/pages/UserPages';
import AdminPages from './components/pages/AdminPages';
import AuthDataProvider from "./services/auth-provider";
import NotificationProvider from "./services/notification-provider";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


let theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      main: '#29303e'
    },
  },
  status: {
    danger: red,
  },
  spacing: 4,
});

theme = responsiveFontSizes(theme);

const client = new ApolloClient({
  uri: 'http://localhost:8080',
  cache: new InMemoryCache(),
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: localStorage.getItem('token') ?? '',
      },
    });
  },
  onError: (error) => {
    if (error.networkError?.statusCode === 403) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  }
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <AuthDataProvider>
            <NotificationProvider>
              <Switch>
                <Route path="/admin">
                  <AdminPages />
                </Route>
                <Route path="/">
                  <HomePages />
                </Route>
              </Switch>
            </NotificationProvider>
          </AuthDataProvider>
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
