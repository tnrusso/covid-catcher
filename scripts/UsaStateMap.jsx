/* eslint-disable no-unused-vars, no-alert */
import * as React from 'react';
import USAMap from 'react-usa-map';
import { Socket } from './Socket';

export function UsaStateMap() {
  const [color, setColor] = React.useState([]);
  const [cases, setCases] = React.useState([]);
  const [active, setActive] = React.useState([]);

  function statesCustomConfig() {
    React.useEffect(() => {
      Socket.on('colors', (data) => {
        setColor(data.colors);
        setCases(data.cases);
        setActive(data.active);
      });
      return () => Socket.off('colors');
    });

    return {
      TX: {
        fill: color[0],
        clickHandler: (event) => alert(`${'Texas\nTotal Cases: '}${cases[0]}\nActive cases: ${active[0]}`),
      },
      CA: {
        fill: color[1],
        clickHandler: (event) => alert(`${'California\nTotal Cases: '}${cases[1]}\nActive cases: ${active[1]}`),
      },
      FL: {
        fill: color[2],
        clickHandler: (event) => alert(`${'Florida\nTotal Cases: '}${cases[2]}\nActive cases: ${active[2]}`),
      },
      IL: {
        fill: color[3],
        clickHandler: (event) => alert(`${'Illinois\nTotal Cases: '}${cases[3]}\nActive cases: ${active[3]}`),
      },
      NY: {
        fill: color[4],
        clickHandler: (event) => alert(`${'New York\nTotal Cases: '}${cases[4]}\nActive cases: ${active[4]}`),
      },
      GA: {
        fill: color[5],
        clickHandler: (event) => alert(`${'Georgia\nTotal Cases: '}${cases[5]}\nActive cases: ${active[5]}`),
      },
      OH: {
        fill: color[6],
        clickHandler: (event) => alert(`${'Ohio\nTotal Cases: '}${cases[6]}\nActive cases: ${active[6]}`),
      },
      WI: {
        fill: color[7],
        clickHandler: (event) => alert(`${'Wisconsin\nTotal Cases: '}${cases[7]}\nActive cases: ${active[7]}`),
      },
      MI: {
        fill: color[8],
        clickHandler: (event) => alert(`${'Michigan\nTotal Cases: '}${cases[8]}\nActive cases: ${active[8]}`),
      },
      TN: {
        fill: color[9],
        clickHandler: (event) => alert(`${'Tennessee\nTotal Cases: '}${cases[9]}\nActive cases: ${active[9]}`),
      },
      PA: {
        fill: color[10],
        clickHandler: (event) => alert(`${'Pennsylvania\nTotal Cases: '}${cases[10]}\nActive cases: ${active[10]}`),
      },
      NC: {
        fill: color[11],
        clickHandler: (event) => alert(`${'North Carolina\nTotal Cases: '}${cases[11]}\nActive cases: ${active[11]}`),
      },
      NJ: {
        fill: color[12],
        clickHandler: (event) => alert(`${'New Jersey\nTotal Cases: '}${cases[12]}\nActive cases: ${active[12]}`),
      },
      IN: {
        fill: color[13],
        clickHandler: (event) => alert(`${'Indiana\nTotal Cases: '}${cases[13]}\nActive cases: ${active[13]}`),
      },
      AZ: {
        fill: color[14],
        clickHandler: (event) => alert(`${'Arizona\nTotal Cases: '}${cases[14]}\nActive cases: ${active[14]}`),
      },
      MN: {
        fill: color[15],
        clickHandler: (event) => alert(`${'Minnesota\nTotal Cases: '}${cases[15]}\nActive cases: ${active[15]}`),
      },
      MO: {
        fill: color[16],
        clickHandler: (event) => alert(`${'Missouri\nTotal Cases: '}${cases[16]}\nActive cases: ${active[16]}`),
      },
      AL: {
        fill: color[17],
        clickHandler: (event) => alert(`${'Alabama\nTotal Cases: '}${cases[17]}\nActive cases: ${active[17]}`),
      },
      LA: {
        fill: color[18],
        clickHandler: (event) => alert(`${'Louisiana\nTotal Cases: '}${cases[18]}\nActive cases: ${active[18]}`),
      },
      VA: {
        fill: color[19],
        clickHandler: (event) => alert(`${'Virgina\nTotal Cases: '}${cases[19]}\nActive cases: ${active[19]}`),
      },
      IA: {
        fill: color[20],
        clickHandler: (event) => alert(`${'Iowa\nTotal Cases: '}${cases[20]}\nActive cases: ${active[20]}`),
      },
      CO: {
        fill: color[21],
        clickHandler: (event) => alert(`${'Colorado\nTotal Cases: '}${cases[21]}\nActive cases: ${active[21]}`),
      },
      MA: {
        fill: color[22],
        clickHandler: (event) => alert(`${'Massachusetts\nTotal Cases: '}${cases[22]}\nActive cases: ${active[22]}`),
      },
      SC: {
        fill: color[23],
        clickHandler: (event) => alert(`${'South Carolina\nTotal Cases: '}${cases[23]}\nActive cases: ${active[23]}`),
      },
      MD: {
        fill: color[24],
        clickHandler: (event) => alert(`${'Maryland\nTotal Cases: '}${cases[24]}\nActive cases: ${active[24]}`),
      },
      OK: {
        fill: color[25],
        clickHandler: (event) => alert(`${'Oklahoma\nTotal Cases: '}${cases[25]}\nActive cases: ${active[25]}`),
      },
      UT: {
        fill: color[26],
        clickHandler: (event) => alert(`${'Utah\nTotal Cases: '}${cases[26]}\nActive cases: ${active[26]}`),
      },
      KY: {
        fill: color[27],
        clickHandler: (event) => alert(`${'Kentucky\nTotal Cases: '}${cases[27]}\nActive cases: ${active[27]}`),
      },
      WA: {
        fill: color[28],
        clickHandler: (event) => alert(`${'Washington\nTotal Cases: '}${cases[28]}\nActive cases: ${active[28]}`),
      },
      AR: {
        fill: color[29],
        clickHandler: (event) => alert(`${'Arkansas\nTotal Cases: '}${cases[29]}\nActive cases: ${active[29]}`),
      },
      KS: {
        fill: color[30],
        clickHandler: (event) => alert(`${'Kanas\nTotal Cases: '}${cases[30]}\nActive cases: ${active[30]}`),
      },
      MS: {
        fill: color[31],
        clickHandler: (event) => alert(`${'Mississippi\nTotal Cases: '}${cases[31]}\nActive cases: ${active[31]}`),
      },
      NV: {
        fill: color[32],
        clickHandler: (event) => alert(`${'Nevada\nTotal Cases: '}${cases[32]}\nActive cases: ${active[32]}`),
      },
      NE: {
        fill: color[33],
        clickHandler: (event) => alert(`${'Nebraska\nTotal Cases: '}${cases[33]}\nActive cases: ${active[33]}`),
      },
      CT: {
        fill: color[34],
        clickHandler: (event) => alert(`${'Connecticut\nTotal Cases: '}${cases[34]}\nActive cases: ${active[34]}`),
      },
      ID: {
        fill: color[35],
        clickHandler: (event) => alert(`${'Idaho\nTotal Cases: '}${cases[35]}\nActive cases: ${active[35]}`),
      },
      NM: {
        fill: color[36],
        clickHandler: (event) => alert(`${'New Mexico\nTotal Cases: '}${cases[36]}\nActive cases: ${active[36]}`),
      },
      ND: {
        fill: color[37],
        clickHandler: (event) => alert(`${'North Dakota\nTotal Cases: '}${cases[37]}\nActive cases: ${active[37]}`),
      },
      SD: {
        fill: color[38],
        clickHandler: (event) => alert(`${'South Dakota\nTotal Cases: '}${cases[38]}\nActive cases: ${active[38]}`),
      },
      OR: {
        fill: color[39],
        clickHandler: (event) => alert(`${'Oregon\nTotal Cases: '}${cases[39]}\nActive cases: ${active[39]}`),
      },
      MT: {
        fill: color[40],
        clickHandler: (event) => alert(`${'Montana\nTotal Cases: '}${cases[40]}\nActive cases: ${active[40]}`),
      },
      RI: {
        fill: color[41],
        clickHandler: (event) => alert(`${'Rhode Island\nTotal Cases: '}${cases[41]}\nActive cases: ${active[41]}`),
      },
      WV: {
        fill: color[42],
        clickHandler: (event) => alert(`${'West Virginia\nTotal Cases: '}${cases[42]}\nActive cases: ${active[42]}`),
      },
      DE: {
        fill: color[43],
        clickHandler: (event) => alert(`${'Delaware\nTotal Cases: '}${cases[43]}\nActive cases: ${active[43]}`),
      },
      WY: {
        fill: color[44],
        clickHandler: (event) => alert(`${'Wyoming\nTotal Cases: '}${cases[44]}\nActive cases: ${active[44]}`),
      },
      AK: {
        fill: color[45],
        clickHandler: (event) => alert(`${'Alaska\nTotal Cases: '}${cases[45]}\nActive cases: ${active[45]}`),
      },
      DC: {
        fill: color[46],
        clickHandler: (event) => alert(`${'Washington DC\nTotal Cases: '}${cases[46]}\nActive cases: ${active[46]}`),
      },
      NH: {
        fill: color[47],
        clickHandler: (event) => alert(`${'New Hampshire\nTotal Cases: '}${cases[47]}\nActive cases: ${active[47]}`),
      },
      HI: {
        fill: color[48],
        clickHandler: (event) => alert(`${'Hawaii\nTotal Cases: '}${cases[48]}\nActive cases: ${active[48]}`),
      },
      ME: {
        fill: color[49],
        clickHandler: (event) => alert(`${'Maine\nTotal Cases: '}${cases[49]}\nActive cases: ${active[49]}`),
      },
      VT: {
        fill: color[50],
        clickHandler: (event) => alert(`${'Vermont\nTotal Cases: '}${cases[50]}\nActive cases: ${active[50]}`),
      },
    };
  }

  statesCustomConfig();

  return (
    <div>
      <h1 className="active-cases">Active Cases Per 100,000 People</h1>
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
    </div>
  );
}
