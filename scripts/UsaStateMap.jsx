import * as React from 'react';
import USAMap from 'react-usa-map';
import { Socket } from './Socket';

export function UsaStateMap() {
  const [color, setColor] = React.useState([]);

  function statesCustomConfig() {
    React.useEffect(() => {
      Socket.on('colors', (data) => {
        setColor(data.colors);
      });
      return () => Socket.off('colors');
    });

    return {
      TX: {
        fill: color[0],
      },
      CA: {
        fill: color[1],
      },
      FL: {
        fill: color[2],
      },
      IL: {
        fill: color[3],
      },
      NY: {
        fill: color[4],
      },
      GA: {
        fill: color[5],
      },
      OH: {
        fill: color[6],
      },
      WI: {
        fill: color[7],
      },
      MI: {
        fill: color[8],
      },
      TN: {
        fill: color[9],
      },
      PA: {
        fill: color[10],
      },
      NC: {
        fill: color[11],
      },
      NJ: {
        fill: color[12],
      },
      IN: {
        fill: color[13],
      },
      AZ: {
        fill: color[14],
      },
      MO: {
        fill: color[15],
      },
      MN: {
        fill: color[16],
      },
      AL: {
        fill: color[17],
      },
      LA: {
        fill: color[18],
      },
      VA: {
        fill: color[19],
      },
      IA: {
        fill: color[20],
      },
      CO: {
        fill: color[21],
      },
      MA: {
        fill: color[22],
      },
      SC: {
        fill: color[23],
      },
      MD: {
        fill: color[24],
      },
      OK: {
        fill: color[25],
      },
      UT: {
        fill: color[26],
      },
      KY: {
        fill: color[27],
      },
      WA: {
        fill: color[28],
      },
      AR: {
        fill: color[29],
      },
      KS: {
        fill: color[30],
      },
      MS: {
        fill: color[31],
      },
      NV: {
        fill: color[32],
      },
      NE: {
        fill: color[33],
      },
      CT: {
        fill: color[34],
      },
      ID: {
        fill: color[35],
      },
      NM: {
        fill: color[36],
      },
      ND: {
        fill: color[37],
      },
      SD: {
        fill: color[38],
      },
      OR: {
        fill: color[39],
      },
      MT: {
        fill: color[40],
      },
      RI: {
        fill: color[41],
      },
      WV: {
        fill: color[42],
      },
      DE: {
        fill: color[43],
      },
      WY: {
        fill: color[44],
      },
      AK: {
        fill: color[45],
      },
      DC: {
        fill: color[46],
      },
      NH: {
        fill: color[47],
      },
      HI: {
        fill: color[48],
      },
      ME: {
        fill: color[49],
      },
      VT: {
        fill: color[50],
      },
    };
  }

  statesCustomConfig();

  return (
    <div className="map">
      <div className="state-map">
        <USAMap customize={statesCustomConfig()} />
      </div>
      <div className="map-legend">
        <p className="map-legend-color">
          <span className="color-4000">▬</span>
          {' '}
          4000 +
        </p>
        <p className="map-legend-color">
          <span className="color-3500">▬</span>
          {' '}
          3500 - 3999
        </p>
        <p className="map-legend-color">
          <span className="color-3000">▬</span>
          {' '}
          3000 - 3499
        </p>
        <p className="map-legend-color">
          <span className="color-2500">▬</span>
          {' '}
          2500 - 2999
        </p>
        <p className="map-legend-color">
          <span className="color-2000">▬</span>
          {' '}
          2000 - 2499
        </p>
        <p className="map-legend-color">
          <span className="color-1500">▬</span>
          {' '}
          1500 - 1999
        </p>
        <p className="map-legend-color">
          <span className="color-1000">▬</span>
          {' '}
          1000 - 1499
        </p>
        <p className="map-legend-color">
          <span className="color-500">▬</span>
          {' '}
          500 - 999
        </p>
        <p className="map-legend-color">
          <span className="color-100">▬</span>
          {' '}
          100 - 499
        </p>
        <p className="map-legend-color">
          <span className="color-0">▬</span>
          {' '}
          0 - 99
        </p>
      </div>
    </div>
  );
}
