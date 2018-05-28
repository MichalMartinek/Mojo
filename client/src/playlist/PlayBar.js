/* @flow */
import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
  paused?: boolean,
};

const PlayBar = (props: Props) => (
  <div className="playBar">
    <div className="playBar__preview">

    </div>
    <div className="playBar__main">
      <FontAwesomeIcon icon="backward" className="playBar__icon"/>
      <FontAwesomeIcon icon={props.paused ? 'play' : 'pause'} className="playBar__icon playBar__icon--main"/>
      <FontAwesomeIcon icon="forward" className="playBar__icon"/>
    </div>
    <div className="playBar__settings">

    </div>
  </div>
)

PlayBar.defaultProps = {
  paused: false,
};
export default PlayBar;