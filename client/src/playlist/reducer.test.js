import reducer, { initialState } from './reducer';
import * as types from './constants';

describe('playlist reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });
  it('should handle SET_NAME_FIELD', () => {
    expect(
      reducer({}, {
        type: types.SET_NAME_FIELD,
        value: 'Testing'
      })
    ).toEqual(
      {
        name: 'Testing',
      }
    );
  })
  it('should handle SET_VOLUME', () => {
    expect(
      reducer({}, {
        type: types.SET_VOLUME,
        value: 57
      })
    ).toEqual(
      {
        volume: 57
      }
    );
  })
});
