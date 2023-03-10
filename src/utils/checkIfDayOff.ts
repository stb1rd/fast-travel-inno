// 2023 // https://assistentus.ru/proizvodstvennyj-kalendar-2023/tatarstan/
// Праздничные дни 	Праздник 	                    Дополнительные выходные 	Сокращённые дни
// 1-6, 8 января 	  Новогодние каникулы
// 23 февраля 	    День защитника Отечества 	    24 февраля 	              22 февраля
// 8 марта 	        Международный женский день 		7 марта
// 21 апреля 	      Ураза-байрам 		              20 апреля
// 1 мая 	          Праздник Весны и Труда        00 NOPE
// 9 мая 	          День Победы 	                8 мая
// 12 июня 	        День России                   00 NOPE
// 28 июня 	        Курбан-байрам 		            27 июня
// 30 августа 	    День Республики Татарстан 		29 августа
// 4 ноября 	      День народного единства 	    6 ноября 	                3 ноября
// 6 ноября 	      День Конституции Татарстана   3 ноября

const months = new Map([
  ['февраля', '02'],
  ['марта', '03'],
  ['апреля', '04'],
  ['мая', '05'],
  ['июня', '06'],
  ['августа', '08'],
  ['ноября', '11'],
]);

const dayOffs = [
  '23 февраля',
  '8 марта',
  '21 апреля',
  '1 мая',
  '9 мая',
  '12 июня',
  '28 июня',
  '30 августа',
  '4 ноября',
  '6 ноября',
  '24 февраля',
  '7 марта',
  '20 апреля',
  '8 мая',
  '27 июня',
  '29 августа',
  '6 ноября',
  '3 ноября',
].map((date) => {
  const [dateRaw, monthRaw] = date.split(' ');
  const isoDate = `2023-${months.get(monthRaw)}-${dateRaw.length === 2 ? dateRaw : `0${dateRaw}`}`;
  return new Date(isoDate).toLocaleDateString();
});

export const checkIfDayOff = (date: Date) => {
  if (dayOffs.includes(date.toLocaleDateString())) {
    return true;
  } else {
    return [0, 7].includes(date.getDay());
  }
};
