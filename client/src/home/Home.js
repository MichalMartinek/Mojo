/* @flow */

import React from 'react';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect }from 'react-redux'

class Home extends React.Component<{}> {
  handleAdd = () => {
    return this.props.firebase.push('/playlists', { title: this.input.value, videos:[] })
      .then(() => {
        this.input.value = ''
      })
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
)(Home)
