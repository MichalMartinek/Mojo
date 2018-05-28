/* @flow */
import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default () => (
  <div className="playBar">
    <div className="playBar__preview">

    </div>
    <div className="playBar__main">
      <FontAwesomeIcon icon="backward" className="playBar__icon"/>
      <FontAwesomeIcon icon="play" className="playBar__icon"/>
      <FontAwesomeIcon icon="forward" className="playBar__icon"/>
    </div>
    <div className="playBar__settings">

    </div>
  </div>
)
