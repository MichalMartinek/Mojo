/* @flow */
import * as React from 'react';
import type {Video} from "./types";

type Props = {
  video: Video,
  onClick: (id:string) => void,
};

const PlaylistItem = ({ video, onClick }: Props) => {
  return (
    <div className='playlistItem' onClick={onClick}>
      <div className="playlistItem__info">
        <h4 className="playlistItem__title">{video.title}</h4>
        <h4 className="playlistItem__channel">{video.channelTitle}</h4>
      </div>
      <div className="playlistItem__imgContainer">
        <img className="playlistItem__thumbnail" src={video.thumbnails.medium.url}/>
      </div>
    </div>
  )
}

export default PlaylistItem