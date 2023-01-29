import { RouteTypes, ScheduleTypes, TimetableEntity, TimeWithSkippedStops } from '../entities/common';
import stops from './stops';

export const addEmptySkips: (times: string[]) => TimeWithSkippedStops[] = (times) => times.map((x) => ({ [x]: {} }));

export const timetables: TimetableEntity[] = [
  {
    route: RouteTypes.R108,
    schedule: ScheduleTypes.Regular,
    departure: {
      stop: stops.busHubSouth,
      times: addEmptySkips(['7:00', '11:30']),
    },
  },
  {
    route: RouteTypes.R108,
    schedule: ScheduleTypes.Regular,
    departure: {
      stop: stops.healthCombo,
      times: addEmptySkips([
        '6:20',
        '7:40',
        '9:30',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:30',
        '19:30',
        '21:00',
        '22:00',
      ]),
    },
  },
  {
    route: RouteTypes.R108,
    schedule: ScheduleTypes.Regular,
    departure: {
      stop: stops.school,
      times: addEmptySkips([
        '6:20',
        '7:30',
        '9:20',
        '10:00',
        '11:20',
        '12:20',
        '13:20',
        '14:20',
        '15:20',
        '16:00',
        '17:20',
        '18:20',
        '20:00',
        '21:20',
        '22:20',
      ]),
    },
  },
  {
    route: RouteTypes.R108,
    schedule: ScheduleTypes.DayOff,
    departure: {
      stop: stops.school,
      times: addEmptySkips([
        '8:00',
        '9:00',
        '10:00',
        '11:20',
        '12:20',
        '13:20',
        '14:20',
        '15:20',
        '16:20',
        '17:20',
        '18:20',
        '19:20',
        '20:20',
        '21:20',
        '22:00',
      ]),
    },
  },
  {
    route: RouteTypes.R108,
    schedule: ScheduleTypes.DayOff,
    departure: {
      stop: stops.healthCombo,
      times: [
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
      ].map((x) => ({ [x]: { skips: [stops.hospital] } })),
    },
  },
  {
    route: RouteTypes.R106,
    schedule: ScheduleTypes.Regular,
    departure: {
      stop: stops.busHubEast,
      times: [{ '7:00': { skips: [] } }],
    },
  },
  {
    route: RouteTypes.R106,
    schedule: ScheduleTypes.Regular,
    departure: {
      stop: stops.school,
      times: [{ '18:10': { skips: [stops.hospital, stops.zalesny] } }],
    },
  },
];
