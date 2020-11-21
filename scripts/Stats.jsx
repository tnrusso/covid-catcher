import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Socket } from './Socket';

export function Stats() {
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [state, setState] = useState('');
  const [countyNames, setCountyNames] = useState([]);
  const [countyStats, setCountyStats] = useState([]);

  const chartData = [];

  function randomColor() {
    const num = Math.floor(Math.random() * 16777215).toString(16);
    return `#${num.toString()}`;
  }

  function getStats() {
    React.useEffect(() => {
      Socket.on('stats', (data) => {
        setCases(data.cases);
        setDeaths(data.deaths);
        setRecovered(data.recovered);
        setState(data.state); // GET NAME OF STATE
        setCountyNames(data.countyNames); // GET ARRAY OF COUNTY NAMES
        setCountyStats(data.countyStats); // GET ARRAY OF # IN COUNTY
      });
      return () => Socket.off('stats');
    });
  }

  getStats();
  countyNames.map((item, index) => (chartData.push({ title: `${item} ${countyStats[index]}`, value: countyStats[index], color: randomColor() })));

  return (
    <div id="stats-div">
      <h1 className="stats-h1">Current Statistics</h1>
      <h2>{state}</h2>
      <h2>
        Total cases:
        {cases.toLocaleString()}
      </h2>
      <h2>
        Total number of deaths:
        {deaths.toLocaleString()}
      </h2>
      <h2>
        Total number of recovered:
        {recovered.toLocaleString()}
      </h2>

      <div id="pie-chart">
        <PieChart
          data={chartData}
          animate
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={{ fontSize: '2' }}
          labelPosition={90}
          radius={45}
        />
      </div>
    </div>
  );
}
