import React, { useState } from 'react';
import { Socket } from './Socket';

export function Stats(){
  const [cases, setCases] = useState(0); 
  const [deaths, setDeaths] = useState(0); 
  const [recovered, setRecovered] = useState(0); 
    
    
  function getStats(){
    React.useEffect(() => {
      Socket.on('stats', (data) => {
        setCases(data['cases']);
        setDeaths(data['deaths']);
        setRecovered(data['recovered']);
      });
    return() => Socket.off('stats');
    });   
  }
    
  getStats();

  return (
    <div>
      <h1>Statistics</h1>
      <h2>Current active cases: {cases}</h2>
      <h2>Total number of deaths: {deaths}</h2>
      <h2>Total number of recovered: {recovered}</h2>
    </div>
  );
}