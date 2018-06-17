import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";

import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";
import DistanceView from "./DistanceView";
import ResultsView from "./ResultsView";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={QuestionList} />
      <Route path="/distance" component={DistanceView} />
      <Route path="/add-own" component={AddQuestion} />
      <Route path="/result" component={ResultsView} />
    </Switch>
  </Router>
);

export default Routes;
