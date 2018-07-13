/* @flow */
import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { functionHandler } from '../utils/helpers'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'


type Props = {
  paused: boolean,
  shuffle: boolean,
  loop: boolean,
  author: string,
  title: string,
  volume: number,
  className: string,
  preview: any,
  mainButtonClick?: () => void,
  previousButtonClick?: () => void,
  nextButtonClick?: () => void,
  changeVolume?: (volume: number) => void,
};

const PlayBar = (props: Props) => {
  return (
    <div className={`playBar ${props.className}`}>
      <div className="playBar__info">
        <h2 className="playBar__title">{props.title}</h2>
        <h3 className="playBar__author">{props.author}</h3>
      </div>
      <div className="playBar__main">
        <button className="no-button playBar__iconButton">
          <FontAwesomeIcon icon="random"
                           className={`playBar__icon playBar__icon--small ${props.shuffle ? 'playBar__icon--checked' :''}`}
          />
        </button>
        <button className="no-button"  onClick={functionHandler(props.previousButtonClick)}>
          <FontAwesomeIcon icon="backward" className="playBar__icon"/>
        </button>
        <button className="no-button playBar__mainButton" onClick={functionHandler(props.mainButtonClick)}>
          <FontAwesomeIcon icon={props.paused ? 'play' : 'pause'} className="playBar__icon playBar__icon--main"/>
        </button>
        <button className="no-button" onClick={functionHandler(props.nextButtonClick)}>
          <FontAwesomeIcon icon="forward" className="playBar__icon"/>
        </button>
        <button className="no-button">
          <FontAwesomeIcon icon="circle-notch"
                           className={`playBar__icon playBar__icon--small ${props.loop ? 'playBar__icon--checked' :''}`}
          />
        </button>
      </div>
      <div className="playBar__volume">
        <button className="no-button">
          <FontAwesomeIcon icon="volume-up" className="playBar__icon"/>
        </button>
        <InputRange
          maxValue={100}
          minValue={0}
          value={props.volume}
          onChange={props.changeVolume}
        />
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