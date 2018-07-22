/* @flow */
import * as React from 'react';
import type { Playlist as PlaylistType } from '../types';
import { parseDuration, sumOfDurations } from '../../utils/helpers';

type Props = {
  playlist: PlaylistType,
  title: string,
  handleTitleChange: (title: string) => void
};

class SideBarHeader extends React.Component<Props> {
  render() {
    const { playlist, title, handleTitleChange } = this.props;
    const durations = playlist.order.map(x =>
      parseDuration(playlist.videos[x].duration)
    );
    const totalTime = sumOfDurations(durations);
    return (
      <div className="sidebar__header">
        <input
          className="sidebar__title"
          onChange={(e: { target: { value: string } }) => {
            handleTitleChange(e.target.value);
          }}
          value={title}
        />
        <h3 className="sidebar__stats">
          {Object.keys(playlist.videos).length} items • {totalTime.hours} hours{' '}
          {totalTime.minutes} minutes
        </h3>
      </div>
    );
  }
}

export default SideBarHeader;
