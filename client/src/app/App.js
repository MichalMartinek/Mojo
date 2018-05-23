/* @flow */

import React from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <Menu />
        <Sidebar />
      </div>
    );
  }
}

export default App;
