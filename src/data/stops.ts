import { AreaTypes, StopsEntity } from '../entities/common';

const stops: StopsEntity = {
  school: {
    title: 'Школа',
    location: { area: AreaTypes.Innopolis },
  },
  sport: {
    title: 'Улица Спортивная',
    location: { area: AreaTypes.Innopolis },
  },
  hospital: {
    title: 'Медцентр',
    location: { area: AreaTypes.Innopolis },
  },
  healthCombo: {
    title: 'Комбинат Здоровье',
    location: { area: AreaTypes.Kazan },
  },
  busHubSouth: {
    title: 'Автовокзал Южный',
    location: { area: AreaTypes.Kazan },
  },
  busHubEast: {
    title: 'Автовокзал "Восточный"',
    location: { area: AreaTypes.Kazan },
  },
  zalesny: {
    title: 'Залесный',
  },
};

export default stops;
