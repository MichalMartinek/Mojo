// @flow

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
