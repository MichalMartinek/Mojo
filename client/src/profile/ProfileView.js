/* @flow */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import Playlists from './Playlists';
import About from './About';
import type { LoginLogoutAction } from '../common/types';
import type { Profile } from './types';
import routes from '../app/routes';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import withLayout from '../common/withLayout';
import { bindFirebaseActions } from '../utils/bindFirebaseActions';
import * as firebaseActions from '../common/firebaseActions';

type Props = {
  profile: Profile,
  push: (path: string) => void,
  firebaseActions: {
    logout: LoginLogoutAction
  },
  auth: {
    uid: string
  }
};

class ProfileView extends React.Component<Props> {
  componentDidUpdate() {
    this.secure();
  }
  componentDidMount() {
    this.secure();
  }
  secure = () => {
    const { profile } = this.props;
    if (isLoaded(profile) && isEmpty(profile)) {
      this.props.push(routes.login);
    }
  };
  render() {
    const { profile, auth, firebaseActions } = this.props;
    if (!isLoaded(profile) || !isEmpty(profile)) {
      return (
        <div className="profile">
          <About
            profile={profile}
            logout={firebaseActions.logout}
            loading={!isLoaded(profile)}
          />
          <Playlists id={auth.uid} />
        </div>
      );
    }
    return <div>Loading</div>;
  }
}

export default withLayout(
  compose(
    withFirebase,
    connect(
      state => ({
        profile: state.firebase.profile,
        auth: state.firebase.auth
      }),
      dispatch => ({
        push: bindActionCreators(push, dispatch)
      }),
      (stateProps, dispatchProps, ownProps) => {
        const boundFirebaseActions = bindFirebaseActions(
          ownProps.firebase,
          firebaseActions
        );
        return Object.assign({}, ownProps, stateProps, dispatchProps, {
          firebaseActions: boundFirebaseActions
        });
      }
    )
  )(ProfileView)
);
