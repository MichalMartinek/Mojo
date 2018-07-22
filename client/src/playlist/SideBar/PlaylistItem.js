/* @flow */
import * as React from 'react';
import type { Video } from '../types';
import { SortableHandle } from 'react-sortable-hoc';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { parseDuration } from '../../utils/helpers';

type Props = {
  video: Video,
  onClick: (id: string) => void,
  onDelete: (id: string) => void,
  isPlaying: boolean,
  number: number
};

// Helping components for sortable playlist
const DragHandle = SortableHandle(() => (
  <div className="playlistItem__handle">
    <FontAwesomeIcon icon="bars" />
  </div>
));

const PlaylistItem = ({
  video,
  onClick,
  number,
  onDelete,
  isPlaying
}: Props) => {
  const duration = parseDuration(video.duration);
  let durationMsg = '';

  if (duration.hours) durationMsg = `${duration.hours}:`;
  durationMsg = `${durationMsg}${duration.minutes ? duration.minutes : '0'}:`;
  durationMsg = `${durationMsg}${
    duration.seconds
      ? `${duration.seconds < 10 ? 0 : ''}${duration.seconds}`
      : '00'
  }`;
  return (
    <div
      className={`playlistItem ${isPlaying ? 'playlistItem--playing' : ''}`}
      onClick={onClick}
    >
      <div className="playlistItem__normal">
        <div className="playlistItem__left">
          {isPlaying ? <FontAwesomeIcon icon="play" /> : number + 1}
        </div>

        <div className="playlistItem__info">
          <h4 className="playlistItem__title">{video.title}</h4>
          <h4 className="playlistItem__channel">{video.channelTitle}</h4>
        </div>

        <div className="playlistItem__imgContainer">
          <img
            className="playlistItem__thumbnail"
            src={video.thumbnails.medium.url}
            alt={video.title}
          />
          <span className="playlistItem__duration">{durationMsg}</span>
        </div>
      </div>
      <div className="playlistItem__hover">
        <div className="playlistItem__left">
          <FontAwesomeIcon icon="play" />
        </div>

        <div className="playlistItem__info">
          <h4 className="playlistItem__title">{video.title}</h4>
          <h4 className="playlistItem__channel">{video.channelTitle}</h4>
        </div>

        <div
          className="playlistItem__controls"
          onClick={e => e.stopPropagation()}
        >
          <DragHandle />
          <button className="no-button playlistItem__delete" onClick={onDelete}>
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
