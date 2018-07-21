import {
  functionHandler,
  convertDurationToSeconds,
  parseDuration,
  sumOfDurations
} from './helpers';

describe('functionHandler', () => {
  test('always returns function', () => {
    expect(typeof functionHandler(undefined)).toBe('function');
  });
  test('returns passed function', () => {
    const mockFunction = jest.fn();
    functionHandler(mockFunction)();
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
describe('convertDurationToSeconds', () => {
  test('returns correct values', () => {
    expect(convertDurationToSeconds('PT1H17M41S')).toBe(4661);
    expect(convertDurationToSeconds('PT4M30S')).toBe(270);
    expect(convertDurationToSeconds('PT35S')).toBe(35);
    expect(convertDurationToSeconds('')).toBe(0);
  });
});
describe('parseDuration', () => {
  test('returns correct values', () => {
    const sample1 = parseDuration('PT10H17M41S');
    expect(sample1).toEqual({
      hours: 10,
      minutes: 17,
      seconds: 41
    });
    const sample2 = parseDuration('PT27S');
    expect(sample2).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 27
    });
  });
});
describe('sumOfDurations', () => {
  test('returns correct values', () => {
    const sum = sumOfDurations([
      { hours: 10, minutes: 15, seconds: 41 },
      { hours: 10, minutes: 45, seconds: 25 },
      { hours: 3, minutes: 61, seconds: 15 }
    ]);
    expect(sum).toEqual({
      hours: 25,
      minutes: 2,
      seconds: 21
    });
  });
});
