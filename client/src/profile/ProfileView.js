/* @flow */

import React from 'react';
import {compose} from 'redux';
import {connect }from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import Playlists from './Playlists'
import type {Firebase} from '../common/types'
import PlaylistForm from '../common/PlaylistForm'
import * as actions from './firebaseActions'
import type {Profile} from "./types";

type Props = {
  profile: Profile,
  firebase: Firebase,
  auth: {
    uid: string,
  }
};

class ProfileView extends React.Component<Props> {
  handleSubmit = (e: string) => {
    console.log(e)
    actions.addPlaylist(this.props.firebase, e, this.props.profile)
  }
  render() {
    console.log(this.props)
    const {profile, auth, firebase} = this.props
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
        <img src={profile.avatarUrl} alt={profile.displayName}/>
        <h2>{profile.email}</h2>
        <button onClick={() => actions.logout(firebase)}>Logout</button>
        <PlaylistForm handleForm={this.handleSubmit} />
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
