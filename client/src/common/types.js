// @flow

import type { Profile } from '../profile/types';
import type { Playlist } from '../playlist/types';

export type Firebase = {
  login: (obj: Object) => Promise<Object>,
  logout: () => Promise<Object>,
  updateProfile: (obj: Object) => Promise<Object>,
  update: (path: string, obj: Object) => Promise<Object>,
  push: (path: string, obj: Object) => Promise<Object>,
  database: {
    ServerValue: {
      TIMESTAMP: string
    }
  },
  ref: () => {
    child: (
      path: string
    ) => {
      remove: () => Promise<Object>
    }
  }
};
export type LoginLogoutAction = () => Promise<Object>;
export type AddPlaylistAction = (
  title: string,
  profile: Profile
) => Promise<Object>;
export type DeletePlaylistAction = (
  id: string,
  playlists: { [string]: Playlist }
) => Promise<Object>;
export type UpdatePlaylistAction = (obj: Object) => Promise<Object>;
