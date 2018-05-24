/* @flow */

import React from 'react';
import { firebaseConnect,  withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import  search from "youtube-search";

class PlaylistView extends React.Component<{}> {
  state = {
    results: []
  }
  handleAdd = () => {
    var opts = {
      maxResults: 10,
      key: 'AIzaSyCA88Ye6O5jP-4DtQz1Ap5SsJ_Z0orYixc'
    };

    search(this.input.value, opts, (err, results, pageInfo) => {
      if(err) return console.log(err);
      this.setState({results})
      console.log(results);
      console.log(this.state);
      this.input.value = ''
    });
  }
  render() {
    console.log(this.props)
    const {results} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Home</h1>
          <h2>Search</h2>

          <input type='text' ref={ref => { this.input = ref }} />
          <button onClick={this.handleAdd}>
            Search
          </button>
          {
            this.state.results.map((i) => (
             <div key={i.id}>{i.title}</div>
           ))
          }
        </header>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  connect(
    (state) => ({
      playlists: state.firebase.data.playlists,
    })
  )
)(PlaylistView)
