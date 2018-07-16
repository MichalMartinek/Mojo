// @flow
import type {Duration} from '../playlist/types'

export const functionHandler = (func: any): ((e: any)=>void) => {
  return typeof func === "function" ? func : () => {}
}

export const convertDurationToSeconds = (value: string): number => {
  const {hours, minutes, seconds} = parseDuration(value)
  return hours * 3600 + minutes * 60 + seconds;
}

export const parseDuration = (value: string): Duration => {
  const match = value.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const res = Array.isArray(match) ? match.slice(1).map(function(x) {
    if (x != null) {
      return x.replace(/\D/, '');
    }
    return '0'
  }) : [0, 0, 0];

  const hours = (parseInt(res[0], 10) || 0);
  const minutes = (parseInt(res[1], 10) || 0);
  const seconds = (parseInt(res[2], 10) || 0);

  return {hours, minutes, seconds};
}

export const sumOfDurations = (values: Array<Duration>): Duration => {
  const sum = values.reduce(
    (a, b) => ({hours: a.hours + b.hours, minutes: a.minutes + b.minutes, seconds: a.seconds + b.seconds}),
    {hours: 0, minutes:0, seconds: 0}
  )
  const seconds = sum.seconds % 60;
  const allMinutes = sum.minutes + Math.floor(sum.seconds / 60)
  const minutes = allMinutes % 60
  const hours = sum.hours + Math.floor(allMinutes / 60)

  return {hours, minutes, seconds};
}