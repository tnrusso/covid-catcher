import * as React from 'react';
import USAMap from "react-usa-map";

export function UsaStateMap() {
    
    function statesCustomConfig(){
        return;
    }
    
    statesCustomConfig();
    
    return(
      <div className="state-map">
        <USAMap customize={statesCustomConfig()} />
      </div>
    );
}