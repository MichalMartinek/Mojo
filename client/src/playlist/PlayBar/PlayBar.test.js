import React from 'react';
import { mount } from 'enzyme';
import PlayBar from './PlayBar';

describe('PlayBar', () => {
  let props;
  let mountedLockScreen;

  const playBar = () => {
    if (!mountedLockScreen) {
      mountedLockScreen = mount(<PlayBar {...props} />);
    }
    return mountedLockScreen;
  };

  beforeEach(() => {
    props = {
      title: 'Title',
      author: 'Author/Channel',
      changeVolume: jest.fn(),
      volume: 50
    };
    mountedLockScreen = undefined;
  });

  it('always renders a div with passed className', () => {
    props.className = 'testingClass';
    const divs = playBar().find('div');
    expect(divs.length).toBeGreaterThan(0);
    expect(divs.at(0).props().className).toBe('playBar testingClass');
  });
  it('always renders passed title', () => {
    const title = playBar()
      .find('.playBar__title')
      .text();
    expect(title).toBe(props.title);
  });
  it('always renders passed author name', () => {
    const author = playBar()
      .find('.playBar__author')
      .text();
    expect(author).toBe(props.author);
  });
  it('renders Play icon when paused', () => {
    const bigButton = playBar().find('FontAwesomeIcon.playBar__icon--main');
    expect(bigButton.props().icon).toBe('pause');
  });
  it('renders Pause icon when playing', () => {
    props.paused = true;
    const bigButton = playBar().find('FontAwesomeIcon.playBar__icon--main');
    expect(bigButton.props().icon).toBe('play');
  });
  it('renders checked icon when shuffle passed', () => {
    props.shuffle = true;
    const smallButtons = playBar().find('FontAwesomeIcon.playBar__icon--small');
    expect(smallButtons.at(0).props().className).toMatch(
      /playBar__icon--checked/
    );
  });
  it('renders checked icon when loop passed', () => {
    props.loop = true;
    const smallButtons = playBar().find('FontAwesomeIcon.playBar__icon--small');
    expect(smallButtons.at(1).props().className).toMatch(
      /playBar__icon--checked/
    );
  });
});
