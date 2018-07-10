/* @flow */

import React from 'react';
import { firebaseConnect, populate, isLoaded, isEmpty} from 'react-redux-firebase'
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect }from 'react-redux'
import * as actions from '../common/firebaseActions'
import type {PopulateProfile} from "./types";
import type {Firebase} from '../common/types'

type Props = {
  profile: PopulateProfile,
  id: string,
  firebase: Firebase,
};

class Playlists extends React.Component<Props> {
  render() {

    const { profile } = this.props
    if (!isLoaded(profile)) {
      return <div>Loading...</div>
    }
    if (isEmpty(profile) || !profile.playlists) {
      return <div>Profile Is Empty</div>
    }
    const { playlists } = profile
    console.log(playlists)
    return (
      <div className="profile__playlists">
        <h4>Playlists</h4>
        {
          Object.keys(playlists).map((key: string) => (
            playlists[key] ?
              <div key={key} id={key}>
                <Link to={`/playlist/${key}`}>{playlists[key].title}</Link>

                <button onClick={() => actions.deletePlaylist(this.props.firebase, key, playlists)}>
                  Delete
                </button>
              </div>
              : null
          ))
        }
      </div>
    );
  }
}
const populates = [{ child: 'playlists', root: 'playlists' }]

export default compose(
  firebaseConnect((props) => {
    return [
      { path: `users/${props.id}`, populates }
    ]
  }),
  connect((state, props) => ({
    profile: populate(state.firebase, `users/${props.id}`, populates)
  }))
)(Playlists)
