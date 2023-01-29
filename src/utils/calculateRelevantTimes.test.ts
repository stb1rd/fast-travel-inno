import { addEmptySkips } from '../data/timetables';
import { TimeWithSkippedStops } from '../entities/common';
import { calculateRelevantTimes } from './calculateRelevantTimes';

const times = addEmptySkips([
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
]);

test('фильтрация в середине', () => {
  const currentTime = new Date('2021-01-28T17:33');
  const result: TimeWithSkippedStops[] = [
    { '7:00': {} },
    { '8:00': {} },
    { '9:00': {} },
    { '10:00': {} },
    { '11:00': {} },
    { '12:00': {} },
    { '13:00': {} },
    { '14:00': {} },
    { '15:00': {} },
    { '16:00': {} },
    { '17:00': { isRelevant: true } },
    { '18:00': { isRelevant: true } },
    { '19:00': { isRelevant: true } },
    { '20:00': {} },
    { '21:00': {} },
  ];

  expect(calculateRelevantTimes(currentTime, times)).toEqual(result);
});

test('фильтрация перед началом', () => {
  const currentTime = new Date('2021-01-28T06:33');
  const result: TimeWithSkippedStops[] = [
    { '7:00': { isRelevant: true } },
    { '8:00': { isRelevant: true } },
    { '9:00': {} },
    { '10:00': {} },
    { '11:00': {} },
    { '12:00': {} },
    { '13:00': {} },
    { '14:00': {} },
    { '15:00': {} },
    { '16:00': {} },
    { '17:00': {} },
    { '18:00': {} },
    { '19:00': {} },
    { '20:00': {} },
    { '21:00': {} },
  ];

  expect(calculateRelevantTimes(currentTime, times)).toEqual(result);
});

test('фильтрация к концу', () => {
  const currentTime = new Date('2021-01-28T20:33');
  const result: TimeWithSkippedStops[] = [
    { '7:00': {} },
    { '8:00': {} },
    { '9:00': {} },
    { '10:00': {} },
    { '11:00': {} },
    { '12:00': {} },
    { '13:00': {} },
    { '14:00': {} },
    { '15:00': {} },
    { '16:00': {} },
    { '17:00': {} },
    { '18:00': {} },
    { '19:00': {} },
    { '20:00': { isRelevant: true } },
    { '21:00': { isRelevant: true } },
  ];

  expect(calculateRelevantTimes(currentTime, times)).toEqual(result);
});

test('фильтрация после конца', () => {
  const currentTime = new Date('2021-01-28T21:33');
  const result: TimeWithSkippedStops[] = [
    { '7:00': {} },
    { '8:00': {} },
    { '9:00': {} },
    { '10:00': {} },
    { '11:00': {} },
    { '12:00': {} },
    { '13:00': {} },
    { '14:00': {} },
    { '15:00': {} },
    { '16:00': {} },
    { '17:00': {} },
    { '18:00': {} },
    { '19:00': {} },
    { '20:00': {} },
    { '21:00': { isRelevant: true } },
  ];

  expect(calculateRelevantTimes(currentTime, times)).toEqual(result);
});

test('пусто', () => {
  const currentTime = new Date('2021-01-28T21:33');

  expect(calculateRelevantTimes(currentTime, addEmptySkips([]))).toEqual(addEmptySkips([]));
});
