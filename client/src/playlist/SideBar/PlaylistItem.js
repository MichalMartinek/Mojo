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
  number: Number
};

// Helping components for sortable playlist
const DragHandle = SortableHandle(({ number }) => (
  <div className="playlistHandle">
    <span className="playlistHandle__normal">#{number + 1}</span>
    <span className="playlistHandle__hover">
      <FontAwesomeIcon icon="bars" />
    </span>
  </div>
));

const PlaylistItem = ({ video, onClick, number, onDelete }: Props) => {
  const duration = parseDuration(video.duration);
  return (
    <div className="playlistItem" onClick={onClick}>
      <div className="playlistItem__inner">
        <div
          className="playlistItem__children"
          onClick={e => e.stopPropagation()}
        >
          <DragHandle number={number} />
          <button className="no-button playlistItem__delete" onClick={onDelete}>
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
        <div className="playlistItem__info">
          <h4 className="playlistItem__title">{video.title}</h4>
          <h4 className="playlistItem__channel">{video.channelTitle}</h4>
          <h4 className="playlistItem__channel">
            {duration.hours ? `${duration.hours} hours ` : ''}
            {duration.minutes ? `${duration.minutes} minutes ` : ''}
            {duration.seconds ? `${duration.seconds} seconds ` : ''}
          </h4>
        </div>
        <div className="playlistItem__imgContainer">
          <img
            className="playlistItem__thumbnail"
            src={video.thumbnails.medium.url}
            alt={video.title}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
