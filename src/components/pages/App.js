import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import AdminPages from './AdminPages';
import AnonPages from './UserPages';
import { useCurrentUserQuery } from 'api';
import SplashScreen from './SplashScreen/splash-screen';


const ExpensesTracker = () => {

  const { loading } = useCurrentUserQuery();
  if (loading) {
    return <SplashScreen />
  }

  return (
    <Switch>
      <Route path="/admin">
        <AdminPages />
      </Route>
      <Route path="/">
        <AnonPages />
      </Route>
    </Switch>
  );
}

export default ExpensesTracker;
