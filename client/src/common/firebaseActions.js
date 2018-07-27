// @flow
import type { Firebase } from './types';
import type { Playlist } from '../playlist/types';
import * as constants from '../playlist/constants';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import type { Profile } from '../profile/types';

export const login = (firebase: Firebase): Promise<Object> => {
  return firebase.login({
    provider: 'google',
    type: 'popup'
    // scopes: ['email'] // not required
  });
};
export const logout = (firebase: Firebase): Promise<Object> => {
  return firebase.logout();
};
export const updateProfile = (
  firebase: Firebase,
  obj: Object
): Promise<Object> => {
  return firebase.updateProfile(obj);
};

export const deletePlaylist = (
  firebase: Firebase,
  id: string,
  playlists: { [string]: Playlist }
) => {
  if (playlists[id]) {
    const newPlaylists = {};
    Object.keys(playlists).forEach((key: string) => {
      if (key !== id) {
        newPlaylists[key] = true;
      }
    });
    return updateProfile(firebase, { playlists: newPlaylists });
  }
  //return new Promise(()=>{})
};
export const addPlaylist = (
  firebase: Firebase,
  title: string,
  profile: Profile
): Promise<Object> => {
  const newOne = {
    title,
    videos: [],
    lastUpdated: firebase.database.ServerValue.TIMESTAMP,
    position: {
      state: constants.PAUSED,
      video: null,
      time: 0
    }
  };
  return firebase.push('/playlists', newOne).then(res => {
    if (isLoaded(profile) && !isEmpty(profile)) {
      const playlists = profile.playlists ? { ...profile.playlists } : {};
      playlists[res.key] = true;
      return updateProfile(firebase, { playlists }).then(() => res);
    }
    return res;
  });
};
