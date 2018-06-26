// @flow
import type {Firebase} from '../common/types'
import type {Playlist} from "../playlist/types";

export const login = (firebase: Firebase): Promise<Object> => {
  return firebase.login({
    provider: 'google',
    type: 'popup',
    // scopes: ['email'] // not required
  })
}
export const logout = (firebase: Firebase): Promise<Object> => {
  return firebase.logout()
}
export const updateProfile = (firebase: Firebase, obj: Object): Promise<Object> => {
  return firebase.updateProfile(obj)
}

export const deletePlaylist = (firebase: Firebase, id:string, playlists: { [string]: Playlist }) => {
  if (playlists[id]) {
    const newPlaylists = { ...playlists }
    delete newPlaylists[id];
    return updateProfile(firebase, { playlists: newPlaylists })
  }
  //return new Promise(()=>{})
}