// @flow

export type Firebase = {
  login: (obj: Object) => Promise<Object>,
  logout: () => Promise<Object>,
  updateProfile: (obj: Object) => Promise<Object>,
  push: (address: string, obj: Object) => Promise<Object>,
  database: {
    ServerValue: {
      TIMESTAMP: string
    },
  },
}
