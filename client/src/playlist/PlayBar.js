/* @flow */
import * as React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
  paused?: boolean,
  shuffle?: boolean,
  loop?: boolean,
  author?: string,
  title?: string,
  className?: string,
  preview: React.ComponentType<{className: string}>,
};

const PlayBar = (props: Props) => {
  const Preview  = props.preview;
  return (
    <div className={`playBar ${props.className}`}>
      <div className="playBar__info">
        <Preview className="playBar__preview" />
        <div className="playBar__name">
          <h2 className="playBar__title">{props.title}</h2>
          <h3 className="playBar__author">{props.author}</h3>
        </div>
      </div>
      <div className="playBar__main">
        <FontAwesomeIcon icon="backward" className="playBar__icon"/>
        <FontAwesomeIcon icon={props.paused ? 'play' : 'pause'} className="playBar__icon playBar__icon--big"/>
        <FontAwesomeIcon icon="forward" className="playBar__icon"/>
      </div>
      <div className="playBar__settings">
        <FontAwesomeIcon icon="share" className="playBar__icon"/>
        <FontAwesomeIcon icon="sliders-h" className="playBar__icon"/>
      </div>
    </div>
  )
}

PlayBar.defaultProps = {
  paused: false,
  shuffle: false,
  loop: false,
  className: '',
};
export default PlayBar;