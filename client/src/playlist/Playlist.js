/* @flow */
import * as React from 'react';
import type {Playlist as PlaylistType} from "./types";
import VideoListItem from "../common/VideoListItem";
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
  playlist: PlaylistType,
  itemOpen: (id:string) => void,
  itemDelete: (id:string) => Promise<any>,
  changeOrder: (Array<string>) => void,
  totalTime: {
    hours: number,
    minutes: number,
  }
};

// Helping components for sortable playlist
const DragHandle = SortableHandle(({number}) =>
  <div className="playlistHandle">
    <span className="playlistHandle__normal">#{number + 1}</span>
    <span className="playlistHandle__hover"><FontAwesomeIcon icon="bars" /></span>
  </div>
);

const SortableItem = SortableElement(({value, itemOpen, itemDelete, number}) =>
  <VideoListItem baseClassName="playlistItem" video={value} onClick ={itemOpen}>
    <DragHandle number={number} />
    <button className="no-button playlistItem__delete" onClick={itemDelete}>
      <FontAwesomeIcon icon="trash-alt" />
    </button>
  </VideoListItem>
);

const SortableList = SortableContainer(({playlist, itemOpen, itemDelete}) => {
  return (
    <div className="playlist__container customScrollbar">
      {playlist.order.map((value, index) => (
        <SortableItem
          key={value}
          index={index}
          number={index}
          value={playlist.videos[value]}
          itemOpen={()=>itemOpen(value)}
          itemDelete={()=>itemDelete(value)}
        />
      ))}
    </div>
  );
});

class Playlist extends React.Component<Props> {
  handleSort = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
    this.props.changeOrder(arrayMove(this.props.playlist.order, oldIndex, newIndex))
  };
  render() {
    const { playlist, totalTime, ...rest } = this.props
    return (
      <div className="playlist">
        <h2 className="playlist__title">{playlist.title}</h2>
        <h3 className="playlist__stats">
          {Object.keys(playlist.videos).length} items  •  {totalTime.hours} hours {totalTime.minutes} minutes
        </h3>
        <SortableList
          playlist={playlist}
          onSortEnd={this.handleSort}
          useDragHandle={true}
          lockAxis="y"
          {...rest}
        />
      </div>
    );
  }
}

export default Playlist