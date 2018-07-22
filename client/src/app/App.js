/* @flow */

import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import withLayout from './withLayout';
import HomeView from '../home/HomeView';
import ProfileView from '../profile/ProfileView';
import NewPlaylistView from '../newPlaylist/NewPlaylistView';
import LoginView from '../profile/LoginView';
import history from '../history';
import PlaylistView from '../playlist/PlaylistView';
import NotFound from '../common/NotFoundView';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import type { Profile } from '../profile/types';
import routes from './routes';

class App extends React.Component<{ profile: Profile }> {
  render() {
    const { profile } = this.props;
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              exact
              path={routes.root}
              component={withLayout(HomeView, profile)}
            />
            <Route path={routes.playlist} component={PlaylistView} />
            <Route
              path={routes.login}
              component={withLayout(LoginView, profile)}
            />
            <Route
              path={routes.profile}
              component={withLayout(ProfileView, profile)}
            />
            <Route
              path={routes.newPlaylist}
              component={withLayout(NewPlaylistView, profile)}
            />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}
export default compose(
  withFirebase,
  connect(state => ({
    profile: state.firebase.profile
  }))
)(App);
