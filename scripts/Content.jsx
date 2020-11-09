import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Socket } from './Socket';
import { Navigation } from './Navigation';
import { Home } from './Home';
import { Faq } from './Faq';
import { Articles } from './Articles';
import { NotExist } from './NotExist';
import { Login } from './Login';
import { Stats } from './Stats';

export function Content() {

  return (
    <div>
      <Navigation />

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/faq">
            <Faq />
          </Route>
          <Route exact path="/articles">
            <Articles />
          </Route>
          <Route exact path="/statistics">
            <Stats />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotExist />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}
