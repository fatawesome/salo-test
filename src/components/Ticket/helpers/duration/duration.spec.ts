import { getArrivalTime, getDepartureTime, getRouteTime, routeTimeToString } from './index';

const testSegment = {
  "origin": "MOW",
  "destination": "HKT",
  "date": "2021-09-30T00:18:00.000Z",
  "stops": [],
  "duration": 1785
};

describe('Flight duration helpers', () => {
  describe('getDepartureTime', () => {
    test('shows segment departure time', () => {
      expect(getDepartureTime(testSegment)).toBe('05:18');
    });
  });

  describe('getArrivalTime', () => {
    test('shows segment arrival time', () => {
      expect(getArrivalTime(testSegment)).toBe('11:03');
    })
  });

  describe('getRouteTime', () => {
    test('derives correct route time object', () => {
      expect(getRouteTime(testSegment)).toMatchObject({ hours: 29, minutes: 45 })
    })
  });

  describe('routeTimeToString', () => {
    test('shows route time', () => {
      expect(routeTimeToString({ hours: 29, minutes: 45 })).toBe('29ч 45м');
    })
  })
})
