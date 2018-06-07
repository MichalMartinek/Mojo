/* @flow */
import * as React from 'react';
import type {Playlist as PlaylistType} from "./types";
import VideoListItem from "./VideoListItem";
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
  playlist: PlaylistType,
  itemClick: (id:string) => void,
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

const SortableItem = SortableElement(({value, itemClick, number}) =>
  <VideoListItem baseClassName="playlistItem" video={value} onClick={()=>itemClick(value.id)}>
    <DragHandle number={number} />
  </VideoListItem>
);

const SortableList = SortableContainer(({playlist, itemClick}) => {
  return (
    <div className="playlist__container">
      {playlist.order.map((value, index) => (
        <SortableItem key={value} index={index} number={index} value={playlist.videos[value]} itemClick={itemClick}/>
      ))}
    </div>
  );
});

class Playlist extends React.Component<Props> {
  handleSort = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
    this.props.changeOrder(arrayMove(this.props.playlist.order, oldIndex, newIndex))
  };
  render() {
    const { playlist, itemClick, totalTime } = this.props
    return (
      <div className="playlist">
        <h2 className="playlist__title">{playlist.title}</h2>
        <h3 className="playlist__stats">
          {Object.keys(playlist.videos).length} items  •  {totalTime.hours} hours {totalTime.minutes} minutes
        </h3>
        <SortableList
          playlist={playlist}
          onSortEnd={this.handleSort}
          itemClick={itemClick}
          useDragHandle={true}
          lockAxis="y"
        />
      </div>
    );
  }
}

export default Playlist