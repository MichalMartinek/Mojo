/* @flow */

import React from 'react';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect }from 'react-redux'
import * as constants from '../playlist/constants'

class PlaylistsView extends React.Component<{}> {
  handleAdd = (e) => {
    e.persist()
    e.target.disabled = true
    const newOne = {
      title: this.input.value,
      videos:[],
      lastUpdated: this.props.firebase.database.ServerValue.TIMESTAMP,
      position: {
        state: constants.PAUSED,
        video: null,
        time: 0,
      }
    }
    return this.props.firebase.push('/playlists', newOne)
      .then(() => {
        e.target.disabled = false
        this.input.value = ''
      })
  }
  delete = (id) => {
    return this.props.firebase.ref().child(`playlists/${id}`).remove()
  }
  render() {
    console.log(this.props)
    const {playlists} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Home</h1>
          <h2>Add</h2>
          <input type='text' ref={ref => { this.input = ref }} />
          <button onClick={this.handleAdd}>
            Add
          </button>
          <h4>Playlists</h4>
          {
            !isLoaded(playlists)
              ? 'Loading'
              : isEmpty(playlists)
                ? 'Playlists are empty'
                : Object.keys(playlists).map((key) => (
                  playlists[key] ?
                  <div key={key} id={key}>
                    <Link to={`/playlist/${key}`}>{playlists[key].title}</Link>

                    <button onClick={() => this.delete(key)}>
                      Delete
                    </button>
                  </div>
                  : null
                ))
          }
        </header>
      </div>
    );
  }
}

export default compose(
  firebaseConnect((props) => [
    { path: 'playlists' }
  ]),
  connect(
    (state) => ({
      playlists: state.firebase.data.playlists,
    })
  )
)(PlaylistsView)
