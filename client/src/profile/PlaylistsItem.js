/* @flow */
import * as React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import { get } from 'lodash-es';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import type { Playlist } from '../playlist/types';
import { parseDuration, sumOfDurations } from '../utils/helpers';

type Props = {
  playlist: Playlist,
  onDelete: () => void,
  id: string
};
const dummyVideo = {
  thumbnails: {
    medium: {
      url: '/images/defaultVideo.jpg'
    }
  },
  title: 'Unknown video'
};

const PlaylistsItem = ({ playlist, onDelete, id }: Props) => {
  const videoId = get(playlist, 'order[0]');
  const video = get(playlist, `videos[${videoId}]`) || dummyVideo;
  const durations = videoId
    ? playlist.order.map(x => parseDuration(playlist.videos[x].duration))
    : [];
  const length = durations.length ? durations.length : 0;
  const totalTime = sumOfDurations(durations);
  return (
    <Link to={`/playlist/${id}`} className="playlistsItem">
      <div className="playlistsItem__imgContainer">
        <img
          className="playlistsItem__thumbnail"
          src={video.thumbnails.medium.url}
          alt={video.title}
        />
      </div>
      <div className="playlistsItem__info">
        <h4 className="playlistsItem__title">
          <LinesEllipsis
            text={playlist.title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
          <button
            className="no-button playlistsItem__delete"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
          >
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </h4>
        <h4 className="playlistsItem__stats">
          {length} items • {totalTime.hours > 0 && `${totalTime.hours} hours `}
          {totalTime.minutes} minutes
        </h4>
      </div>
    </Link>
  );
};

export default PlaylistsItem;
