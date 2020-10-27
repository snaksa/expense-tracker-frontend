import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import AdminPages from './AdminPages';
import AnonPages from './UserPages';


const ExpensesTracker = () => {

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
