// @flow
import type {
  AddPlaylistAction,
  DeletePlaylistAction,
  Firebase,
  LoginLogoutAction,
  UpdatePlaylistAction
} from './types';
import type { Playlist } from '../playlist/types';
import * as constants from '../playlist/constants';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import type { Profile } from '../profile/types';

export const loginWithGoogle = (firebase: Firebase): LoginLogoutAction => {
  return () =>
    firebase.login({
      provider: 'google',
      type: 'popup'
    });
};
export const loginWithFacebook = (firebase: Firebase): LoginLogoutAction => {
  return () =>
    firebase.login({
      provider: 'facebook',
      type: 'popup'
    });
};
export const loginWithGithub = (firebase: Firebase): LoginLogoutAction => {
  return () =>
    firebase
      .login({
        provider: 'github',
        type: 'popup',
        scope: ['user:email'] // not required
      })
      .then((res: { additionalUserInfo: { username: string } }) =>
        updateProfile(firebase)({
          displayName: res.additionalUserInfo.username
        })
      );
};
export const logout = (firebase: Firebase): LoginLogoutAction => () =>
  firebase.logout();
export const updateProfile = (firebase: Firebase): UpdatePlaylistAction => (
  obj: Object
) => firebase.updateProfile(obj);

export const deletePlaylist = (firebase: Firebase): DeletePlaylistAction => (
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
    return updateProfile(firebase)({ playlists: newPlaylists });
  }
  return new Promise(() => {});
};
export const addPlaylist = (firebase: Firebase): AddPlaylistAction => (
  title: string,
  profile: Profile
) => {
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
      return updateProfile(firebase)({ playlists }).then(() => res);
    }
    return res;
  });
};
