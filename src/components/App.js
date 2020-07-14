import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SurveyControl from './SurveyControl'
import Header from "./Header"
import Signin from './Signin'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/">
          <SurveyControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
