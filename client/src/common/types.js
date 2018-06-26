// @flow

export type Firebase = {
  login: (obj: Object) => Promise<Object>,
  logout: () => Promise<Object>,
  updateProfile: (obj: Object) => Promise<Object>,
}
