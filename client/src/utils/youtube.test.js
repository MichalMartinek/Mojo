import { videoInfo } from './youtube';

describe('youtube', () => {
  test('bind single function', () => {
    /* Global config is not included in repository for security reasons
    const id = 'QHDRRxKlimY'; // it is specific youtube video https://www.youtube.com/watch?v=QHDRRxKlimY
    return videoInfo(id).then(res => {
      expect(res.pageInfo.totalResults).toBe(1);
      const info = res.items[0].contentDetails;
      expect(info.duration).toBe('PT1H55M40S');

    });
    */
  });
});
