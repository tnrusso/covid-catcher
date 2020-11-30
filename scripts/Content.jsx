import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Home } from './Home';
import { Faq } from './Faq';
import { Articles } from './Articles';
import { NotExist } from './NotExist';
import { Stats } from './Stats';
import { Quest } from './Quest';
import { Socket } from './Socket';
import { InfoMap } from './InfoMap';

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
          <Route exact path="/statistics/:state">
            <Stats />
          </Route>
          <Route exact path="/questionnaire">
            <Quest />
          </Route>
          <Route exact path="/map">
            <InfoMap />
          </Route>
          <Route path="*">
            <NotExist />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}
