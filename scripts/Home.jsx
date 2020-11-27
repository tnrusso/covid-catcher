import * as React from 'react';
import { UsaStateMap } from './UsaStateMap';
import { Menu } from './Menu.jsx';

export function Home() {
  return (
    <div>
      <Menu />
      <img src="static/covid_catcher.png" className="covid-image" alt="covid-catcher" />
      <UsaStateMap />
    </div>
  );
}
