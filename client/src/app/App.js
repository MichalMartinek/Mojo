/* @flow */

import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Menu from './Menu';
import HomeView from '../home/HomeView';
import ProfileView from '../profile/ProfileView';
import LoginView from '../profile/LoginView';
import history from '../history';
import PlaylistView from '../playlist/PlaylistView';
import NotFound from '../common/NotFoundView';
import {
  Route,
  Switch,
} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {withFirebase, isLoaded, isEmpty} from "react-redux-firebase";
import type { Profile } from "../profile/types";
import routes from './routes'

class App extends React.Component<{profile: Profile}> {
  render() {
    const { profile } = this.props
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <div>
            <Menu loading={!isLoaded(profile)} isAuthenticated={!isEmpty(profile)}/>
            <Switch>
              <Route exact path={routes.root} component={HomeView}/>
              <Route path={routes.playlist} component={PlaylistView}/>
              <Route path={routes.login} component={LoginView}/>
              <Route path={routes.profile} component={ProfileView}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}
export default compose(
  withFirebase,
  connect(
    (state) => ({
      profile: state.firebase.profile
    })
  )
)(App)
