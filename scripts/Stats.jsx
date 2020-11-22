import React, { useState } from 'react';
import {
  BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Socket } from './Socket';

export function Stats() {
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [state, setState] = useState('');
  const [countyNames, setCountyNames] = useState([]);
  const [countyStats, setCountyStats] = useState([]);

  const chartData = [];

  function getStats() {
    React.useEffect(() => {
      Socket.on('stats', (data) => {
        setCases(data.cases);
        setDeaths(data.deaths);
        setRecovered(data.recovered);
        setState(data.state);
        setCountyNames(data.countyNames);
        setCountyStats(data.countyStats);
      });
      return () => Socket.off('stats');
    });
  }

  getStats();
  countyNames.map((item, index) => (chartData.push({ county: item, cases: countyStats[index] })));

  return (
    <div id="stats-div">
      <h1 className="stats-h1">Current Statistics</h1>
      <h2>{state}</h2>
      <h2>
        {`Total cases: ${cases.toLocaleString()}`}
      </h2>
      <h2>
        {`Total number of deaths: ${deaths.toLocaleString()}`}
      </h2>
      <h2>
        {`Total number of recovered: ${recovered.toLocaleString()}`}
      </h2>

      <div id="chart">
        <BarChart
          width={900}
          height={400}
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="county" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="cases" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}
