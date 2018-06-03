/* @flow */
import * as React from 'react';
import type {Playlist as PlaylistType} from "./types";
import PlaylistItem from "./PlaylistItem";

type Props = {
  playlist: PlaylistType,
  itemClick: (id:string) => void,
  totalTime: {
    hours: number,
    minutes: number,
  }
};

const Playlist = ({ playlist, itemClick, totalTime }: Props) => {
  return (
    <div className="playlist">
      <h2 className="playlist__title">{playlist.title}</h2>
      <h3 className="playlist__stats">
        {Object.keys(playlist.videos).length} items  •  {totalTime.hours} hours {totalTime.minutes} minutes
      </h3>
      <div className="playlist__container">
        {
          Object.keys(playlist.videos).map((key) => (
            <PlaylistItem video={playlist.videos[key]} key={key} onClick={()=>itemClick(key)}/>
          ))
        }
      </div>
    </div>
  )
}

export default Playlist