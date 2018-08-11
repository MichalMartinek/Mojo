/* @flow */

import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import HomeView from '../home/HomeView';
import ProfileView from '../profile/ProfileView';
import NewPlaylistView from '../newPlaylist/NewPlaylistView';
import LoginView from '../profile/LoginView';
import history from '../history';
import PlaylistView from '../playlist/PlaylistView';
import NotFound from '../common/NotFoundView';
import PrivacyPolice from '../legal/PrivacyPoliceView';
import TermsService from '../legal/TermsServiceView';
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
              render={() => <HomeView profile={profile} />}
            />
            <Route path={routes.playlist} component={PlaylistView} />
            <Route
              path={routes.login}
              render={() => <LoginView profile={profile} />}
            />
            <Route
              path={routes.profile}
              render={() => <ProfileView profile={profile} />}
            />
            <Route
              path={routes.newPlaylist}
              render={() => <NewPlaylistView profile={profile} />}
            />
            <Route
              path={routes.privacyPolice}
              render={() => <PrivacyPolice profile={profile} />}
            />
            <Route
              path={routes.termsOfService}
              render={() => <TermsService profile={profile} />}
            />
            <Route render={() => <NotFound profile={profile} />} />
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
