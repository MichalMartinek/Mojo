/* @flow */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'


type Props = {
  profile: {
    isLoaded?:string,
    isEmpty?:string,
  }
};

class SettingsView extends React.Component<Props> {
  render() {
    console.log(this.props)
    const {profile} = this.props
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
        </div>
      )
  }
}

export default compose(
  withFirebase,
  connect(
    (state) => ({
      profile: state.firebase.profile // load profile
    })
  )
)(SettingsView)
