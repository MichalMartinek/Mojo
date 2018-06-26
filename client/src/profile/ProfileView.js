/* @flow */

import React from 'react';
import {compose} from 'redux';
import {connect }from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import Playlists from './Playlists'

type Props = {
  profile: {
    isLoaded: string,
    isEmpty: string,
    avatarUrl?: string,
    displayName?: string,
    email?: string,
  },
  auth: {
    uid: string,
  }
};

class ProfileView extends React.Component<Props> {
  render() {
    console.log(this.props)
    const {profile, auth} = this.props
    if (!isLoaded(profile)) {
        return <div>Loading...</div>
      }
      if (isEmpty(profile)) {
        return <div>Profile Is Empty</div>
      }
      return (
        <div>
          <h1>Profile</h1>
          <h1>{profile.displayName}</h1>
          <img src={profile.avatarUrl} />
          <h1>{profile.email}</h1>
          <Playlists id={auth.uid}/>
        </div>
      )
  }
}

export default compose(
  withFirebase,
  connect(
    (state) => ({
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    })
  )
)(ProfileView)
