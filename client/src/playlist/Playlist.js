/* @flow */
import * as React from 'react';
import type {Playlist as PlaylistType} from "./types";
import VideoListItem from "../common/VideoListItem";
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

type Props = {
  playlist: PlaylistType,
  itemOpen: (id:string) => void,
  handleTitleChange: (title:string) => void,
  itemDelete: (id:string) => Promise<any>,
  changeOrder: (Array<string>) => void,
  totalTime: {
    hours: number,
    minutes: number,
  }
};
type State = {
  title: string,
}

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

class Playlist extends React.Component<Props, State> {
  state = {
    title: '',
  }
  handleSort = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
    this.props.changeOrder(arrayMove(this.props.playlist.order, oldIndex, newIndex))
  };
  componentDidMount() {
    this.setState({title: this.props.playlist.title})
  }
  handleTitleChange = (e: {target: {value: string}}) => {
    const value = e.target.value
    this.setState({title: value})
    this.props.handleTitleChange(value)
  }
  render() {
    const { playlist, totalTime, ...rest } = this.props
    const { title } = this.state
    return (
      <div className="playlist">
        <input className="playlist__title" onChange={this.handleTitleChange} value={title}/>
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