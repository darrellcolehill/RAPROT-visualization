// src/App.js
import React from 'react';
import Node from './Node';
import data from '../public/EXO_FULL.json';

const App = () => {
  return (
    <div className="App">
      {/* <h1>JSON Nested Display</h1> */}
          {data["layer_" + (Object.keys(data).length - 1)].map(node => (
            <Node key={node.index} node={node} layers={data} layerIdx={3}/>
          ))}
    </div>
  );
};

export default App;

