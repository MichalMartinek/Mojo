/* @flow */
import * as React from 'react';
import type { Playlist as PlaylistType } from '../types';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';
import PlaylistItem from './PlaylistItem';

type Props = {
  playlist: PlaylistType,
  itemOpen: (id: string) => void,
  itemDelete: (id: string) => void,
  changeOrder: (Array<string>) => void
};

const SortableItem = SortableElement(props => <PlaylistItem {...props} />);

const SortableList = SortableContainer(({ playlist, itemOpen, itemDelete }) => {
  return (
    <div className="sidebar__playlist playlistScrollbar">
      {playlist.order.map((value, index) => (
        <SortableItem
          key={value}
          index={index}
          number={index}
          video={playlist.videos[value]}
          isPlaying={playlist.position.video === value}
          onClick={() => itemOpen(value)}
          onDelete={() => itemDelete(value)}
        />
      ))}
    </div>
  );
});

class PlaylistVideos extends React.Component<Props> {
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
  render() {
    const { playlist, ...rest } = this.props;
    return (
      <SortableList
        playlist={playlist}
        onSortEnd={this.handleSort}
        useDragHandle={true}
        lockAxis="y"
        {...rest}
      />
    );
  }
}

export default PlaylistVideos;
