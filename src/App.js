import React from 'react';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core/styles';
import { pink, red } from '@material-ui/core/colors';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import AuthDataProvider from "./services/auth-provider";
import NotificationProvider from "./services/notification-provider";
import SharedDataProvider from "./services/shared-data-provider";
import UpdateDetectionProvider from "./services/update-detection-provider";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ExpensesTracker from './components/pages/App';


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

const App = () => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
    request: (operation) => {
      if (operation.operationName !== 'Login' && operation.operationName !== 'Register') {
        operation.setContext({
          headers: {
            Authorization: localStorage.getItem('token') ?? '',
          },
        });
      }
    },
    onError: (error) => {
      if (error.networkError?.statusCode === 403) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
  });

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <AuthDataProvider>
            <NotificationProvider>
              <SharedDataProvider>
                <UpdateDetectionProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ExpensesTracker />
                  </MuiPickersUtilsProvider>
                </UpdateDetectionProvider>
              </SharedDataProvider>
            </NotificationProvider>
          </AuthDataProvider>
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;
