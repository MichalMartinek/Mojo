import * as actions from './actions';
import * as types from './constants';

describe('playlist actions', () => {
  it('setVolume should send SetVolumeAction', () => {
    expect(actions.setVolume(57)).toEqual({
      type: types.SET_VOLUME,
      value: 57
    });
  });
  it('setNameField should send SetNameFieldAction', () => {
    expect(actions.setNameField('Testing')).toEqual({
      type: types.SET_NAME_FIELD,
      value: 'Testing'
    });
  });
});
