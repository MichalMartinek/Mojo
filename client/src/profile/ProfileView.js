/* @flow */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import Playlists from './Playlists';
import About from './About';
import type { Firebase } from '../common/types';
import * as actions from '../common/firebaseActions';
import type { Profile } from './types';
import routes from '../app/routes';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

type Props = {
  profile: Profile,
  push: (path: string) => void,
  firebase: Firebase,
  auth: {
    uid: string
  }
};

class ProfileView extends React.Component<Props> {
  render() {
    const { profile, auth, firebase } = this.props;
    if (!isLoaded(profile)) {
      return <div>Loading...</div>;
    }
    if (isEmpty(profile)) {
      this.props.push(routes.login);
    }
    return (
      <div className="profile">
        <About profile={profile} logout={() => actions.logout(firebase)} />
        <Playlists id={auth.uid} />
      </div>
    );
  }
}

export default compose(
  withFirebase,
  connect(
    state => ({
      profile: state.firebase.profile,
      auth: state.firebase.auth
    }),
    dispatch => ({
      push: bindActionCreators(push, dispatch)
    })
  )
)(ProfileView);
