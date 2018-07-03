/* @flow */

import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Menu from './Menu';
import Home from '../home/HomeView';
import Profile from '../profile/ProfileView';
import Login from '../profile/LoginView';
import history from '../history';
import Playlist from '../playlist/PlaylistView';
import NotFound from '../common/NotFoundView';
import {
  Route,
  Switch,
} from "react-router-dom";

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <div>
            <Menu />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/playlist/:id" component={Playlist}/>
              <Route path="/login" component={Login}/>
              <Route path="/profile" component={Profile}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
