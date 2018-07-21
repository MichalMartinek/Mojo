// @flow

import type { Firebase } from '../common/types';

type InputFunction = (firebase: Firebase) => OutputFunction;
type OutputFunction = Function;
type Input = InputFunction | { [string]: InputFunction };
type Output = OutputFunction | { [string]: OutputFunction };

const mapFirebase = (firebase: Firebase, func: InputFunction) => func(firebase);

export const bindFirebaseActions = (
  firebase: Firebase,
  actions: Input
): Output => {
  if (typeof actions === 'function') {
    return mapFirebase(firebase, actions);
  } else if (typeof actions === 'object') {
    return Object.keys(actions).reduce(function(previous, current) {
      previous[current] = mapFirebase(firebase, actions[current]);
      return previous;
    }, {});
  }
  throw Error(
    'Invalid input, passed actions is not function nor object full of functions'
  );
};
