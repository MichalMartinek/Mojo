// @flow

import type { Playlist } from '../playlist/types';

export type Profile = {
  isLoaded: string,
  isEmpty: string,
  avatarUrl?: string,
  displayName?: string,
  email?: string,
  playlists: { [string]: boolean }
};

export type PopulateProfile = {
  isLoaded: string,
  isEmpty: string,
  avatarUrl?: string,
  displayName?: string,
  email?: string,
  playlists: { [string]: Playlist }
};
