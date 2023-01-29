export enum RouteTypes {
  'R108' = '108',
  'R106' = '106',
}

export enum AreaTypes {
  Kazan = 'из Казани',
  Innopolis = 'из Инно',
}

export enum ScheduleTypes {
  Regular = 'пн-пт',
  DayOff = 'сб-вс',
}

export interface StopEntity {
  title: string;
  location?: {
    area: AreaTypes;
  };
}

export interface StopsEntity {
  [key: string]: StopEntity;
}

export interface TimeWithSkippedStops {
  [key: string]: {
    skips?: StopEntity[];
    isRelevant?: boolean;
  };
}

export interface TimetableEntity {
  route: RouteTypes;
  schedule: ScheduleTypes;
  departure: {
    stop: StopEntity;
    times: TimeWithSkippedStops[];
  };
}
