import React, { useState } from 'react';
import './App.css';
import LeafletMap from './leafLet';
import DisplayMap from './drawCustom'

function App() {

  const [showMap, setShowMap] = useState([]);
  const [mapToDisplay, setMapToDisplay] = useState(false);
  
  return (
    <div className="App">
      <h1>{mapToDisplay ? "Indoor Mapping" : "View of the Map"}</h1>
      {
        mapToDisplay ? (<LeafletMap setShowMap={setShowMap} showMap={showMap} setMapToDisplay={setMapToDisplay}/>) 
          : (<DisplayMap setMapToDisplay={setMapToDisplay} showMap={showMap}/>)
      }
      
    </div>
  );
}

export default App;
