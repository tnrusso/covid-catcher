import React, { useState } from 'react';
import {
  BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Menu } from './Menu';
import { Socket } from './Socket';

export function Stats() {
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [state, setState] = useState('');
  const [countyNames, setCountyNames] = useState([]);
  const [countyStats, setCountyStats] = useState([]);
  const [s, setS] = useState('');

  const chartData = [];

  function getState() {
    React.useEffect(() => {
      Socket.on('state', (data) => {
        setS(data.loc);
      });
      return () => Socket.off('state');
    });
  }

  function getStats() {
    React.useEffect(() => {
      if (s !== '') {
        Socket.emit('search loc', { loc: s });
      }
      Socket.on('stats', (data) => {
        setCases(data.cases);
        setDeaths(data.deaths);
        setRecovered(data.recovered);
        setState(data.state);
        setCountyNames(data.countyNames);
        setCountyStats(data.countyStats);
      });
      return () => {
        Socket.off('stats');
        Socket.off('search loc');
      };
    }, []);
  }

  function handleClick() {

  }

  getStats();
  getState();
  countyNames.map((item, index) => (chartData.push({ county: item, cases: countyStats[index] })));

  return (
    <div id="stats-div">
      <Menu />
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
          width={1000}
          height={800}
          data={chartData}
          layout="vertical"
          margin={{
            top: 5, right: 10, left: 50, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="county" type="category" />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine x={0} stroke="#000" />
          <Bar dataKey="cases" fill="#82ca9d" onclick={handleClick} />
        </BarChart>
      </div>
    </div>
  );
}
