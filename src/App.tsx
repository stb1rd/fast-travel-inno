import { useState } from 'react';
import { AreaTypes, RouteTypes, ScheduleTypes } from './entities/common';
import { TimeList } from './components/Times/TimeList';
import { checkIfDayOff } from './utils/checkIfDayOff';

import './App.css';

function App() {
  const [inputAreaType, setInputAreaType] = useState(AreaTypes.Innopolis);
  const [inputRoute, setInputRoute] = useState(RouteTypes.R108);
  const [inputSchedule, setInputSchedule] = useState(checkIfDayOff(new Date()) ? ScheduleTypes.DayOff : ScheduleTypes.Regular);

  return (
    <main>
      <TimeList inputAreaType={inputAreaType} inputRoute={inputRoute} inputSchedule={inputSchedule} />
      <form>
        <section>
          <p>Шаттл{'\u00A0'}</p>
          <button onClick={() => setInputRoute(inputRoute !== RouteTypes.R108 ? RouteTypes.R108 : RouteTypes.R106)} type="button">
            {inputRoute}
          </button>
        </section>
        <section>
          <p>
            {'\u00A0'}дни{'\u00A0'}
          </p>
          <button
            onClick={() => setInputSchedule(inputSchedule !== ScheduleTypes.Regular ? ScheduleTypes.Regular : ScheduleTypes.DayOff)}
            type="button"
          >
            {inputSchedule}
          </button>
        </section>
        <section>
          <p>
            {'\u00A0'}выезд{'\u00A0'}
          </p>
          <button
            onClick={() => setInputAreaType(inputAreaType !== AreaTypes.Innopolis ? AreaTypes.Innopolis : AreaTypes.Kazan)}
            type="button"
          >
            {inputAreaType}
          </button>
        </section>
      </form>
    </main>
  );
}

export default App;
