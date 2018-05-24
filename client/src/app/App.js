/* @flow */

import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Home from '../home/Home';
import SettingsView from '../settings/SettingsView';
import Login from '../Login';
import history from '../history';
import PlaylistView from '../playlist/PlaylistView';
import NotFound from '../common/NotFound';
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
              <Route path="/login" component={Login}/>
              <Route path="/settings" component={SettingsView}/>
              <Route path="/playlist" component={PlaylistView}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
