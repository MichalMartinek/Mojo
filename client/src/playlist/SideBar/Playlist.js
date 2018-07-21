/* @flow */
import * as React from 'react';
import type { Playlist as PlaylistType } from '../types';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';
import PlaylistItem from './PlaylistItem';
import { parseDuration, sumOfDurations } from '../../utils/helpers';

type Props = {
  playlist: PlaylistType,
  itemOpen: (id: string) => void,
  handleTitleChange: (title: string) => void,
  itemDelete: (id: string) => void,
  changeOrder: (Array<string>) => void
};
type State = {
  title: string
};

const SortableItem = SortableElement(
  ({ value, itemOpen, itemDelete, number }) => (
    <PlaylistItem
      number={number}
      video={value}
      onClick={itemOpen}
      onDelete={itemDelete}
    />
  )
);

const SortableList = SortableContainer(({ playlist, itemOpen, itemDelete }) => {
  return (
    <div className="playlist__container customScrollbar">
      {playlist.order.map((value, index) => (
        <SortableItem
          key={value}
          index={index}
          number={index}
          value={playlist.videos[value]}
          itemOpen={() => itemOpen(value)}
          itemDelete={() => itemDelete(value)}
        />
      ))}
    </div>
  );
});

class Playlist extends React.Component<Props, State> {
  state = {
    title: ''
  };
  handleSort = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number,
    newIndex: number
  }) => {
    this.props.changeOrder(
      arrayMove(this.props.playlist.order, oldIndex, newIndex)
    );
  };
  componentDidMount() {
    this.setState({ title: this.props.playlist.title });
  }
  handleTitleChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    this.setState({ title: value });
    this.props.handleTitleChange(value);
  };
  render() {
    const { playlist, ...rest } = this.props;
    const durations = playlist.order.map(x =>
      parseDuration(playlist.videos[x].duration)
    );
    const totalTime = sumOfDurations(durations);
    const { title } = this.state;
    return (
      <div className="playlist">
        <input
          className="playlist__title"
          onChange={this.handleTitleChange}
          value={title}
        />
        <h3 className="playlist__stats">
          {Object.keys(playlist.videos).length} items • {totalTime.hours} hours{' '}
          {totalTime.minutes} minutes
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

export default Playlist;
