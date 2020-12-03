import React, { useState } from 'react';
import {
  BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Menu } from './Menu';
import { Socket } from './Socket';
import ReactDOM from 'react-dom';

export function Stats() {
  const [cases, setCases] = useState([]);
  const [newCases,setNewCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [newDeaths, setNewDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [state, setState] = useState('');
  const [countyNames, setCountyNames] = useState([]);
  const [countyCases, setCountyCases] = useState([]);
  const [countyDeaths, setCountyDeaths] = useState([]);
  const [s, setS] = useState('');
  
  const[chartKey, setChartKey]=useState('cases');
  var chartData=getChartData();
  var chartColor = '#2E607D';
  
  function getChartData(){
    var data=[];
    if(chartKey==='cases') {
      countyNames.map((item, index) => (data.push({ county: item, cases: countyCases[index] })));
      chartColor ='#2E607D';
    } else if(chartKey==='deaths') {
      countyNames.map((item, index) => (data.push({ county: item, deaths: countyDeaths[index] })));
      chartColor ='#D61A3C';
    }
    return data;
  }

  function getStats() {
    React.useEffect(() => {
      if (s !== '') {
        Socket.emit('search loc', { loc: s });
      }
      Socket.on('stats', (data) => {
        setState(data.state);
        setCases(data.cases);
        setNewCases(data.new_cases);
        setDeaths(data.deaths);
        setNewDeaths(data.new_deaths);
        setRecovered(data.recovered);
        setState(data.state);
        setCountyNames(data.countyNames);
        setCountyCases(data.countyCases);
        setCountyDeaths(data.countyDeaths);
      });
      return () => {
        Socket.off('stats');
        Socket.off('search loc');
      };
    }, []);
  }
  
  function handleChange(e) {
    setChartKey(e.target.value);
    document.getElementById('chart-menu').value=e.target.value;
    chartData=getChartData();
  } 

  getStats();
  chartData=getChartData();
  
  return (
    <div className="stats-content">
      <h1 className="stats-h1">COVID-19 Statistics</h1>
      <div className='stats-menu-div'>
        <Menu className='stats-state-menu'/>
      </div>
      
      <h2 className="stats-h2">State Statistics</h2>
      <div className="state-stats">
        <div className="state-stat-div">
          <p className="stat-label">Cases</p>
          <div className="stat-circle">
            <p className="stat-total">{cases.toLocaleString()}</p>
            <p className="stat-new">+{newCases.toLocaleString()}</p>
          </div>
        </div>
        <div className="state-stat-div">
          <p className="stat-label">Deaths</p>
          <div className="stat-circle">
            <p className="stat-total">{deaths.toLocaleString()}</p>
            <p className="stat-new">+{newDeaths.toLocaleString()}</p>
          </div>
        </div>
        <div className="state-stat-div">
          <p className="stat-label">Recovered</p>
          <div className="stat-circle">
            <p className="stat-total">{recovered.toLocaleString()}</p>
            <p className="stat-new">+????</p>
          </div>
        </div>
      </div>
      
      <h2 className="stats-h2">County Statistics</h2>
      
      <form className="chart-menu">
        <label htmlFor="chart-menu">Statistic: </label>
        <select id="chart-menu" name="chart-menu" value={chartKey} onChange={handleChange}>
          <option value="cases">cases</option>
          <option value="deaths">deaths</option>
        </select>
      </form>
      
      <div id="chart">
        <BarChart
          width={1000}
          height={chartData.length * 35}
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
          <Bar dataKey={chartKey} fill={chartColor} />
        </BarChart>
      </div>
    </div>
  );
}
