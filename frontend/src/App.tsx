import React, { useEffect, useState } from 'react';
import data from '../public/EXO_FULL.json';

import './App.css';

function App() {
  const [layerData, setLayerData] = useState([]);
  const [expandedLayers, setExpandedLayers] = useState({});

  // Fetch and set all layer data on component mount
  useEffect(() => {
    const allLayers = [];
    for (let i = 0; i <= 3; i++) {
      if (data[`layer_${i}`]) {
        const sortedItems = data[`layer_${i}`].sort((a, b) => a.index - b.index);
        allLayers.push({
          layerIndex: i,
          items: sortedItems
        });
        // Initialize expanded state for each layer
        setExpandedLayers(prevState => ({
          ...prevState,
          [i]: false  // Initially collapsed
        }));
      }
    }
    setLayerData(allLayers);
  }, []);

  // Function to toggle collapse/expand for a layer
  const toggleLayer = (layerIndex) => {
    setExpandedLayers(prevState => ({
      ...prevState,
      [layerIndex]: !prevState[layerIndex]
    }));
  };

  const handleItemClick = (layerIndex, itemIndex) => {
    // Handle click on item if needed
    // For now, it just toggles expand/collapse of the layer
    toggleLayer(layerIndex);
  };

  const getChildText = (childIndex) => {
    // Loop through all layers to find the item with matching index
    for (let i = 0; i < layerData.length; i++) {
      const layer = layerData[i];
      const item = layer.items.find(item => item.index === childIndex);
      if (item) {
        return item.text;
      }
    }
    return ''; // Return empty string if no matching item found
  };

  return (
    <div>
      <h2>Layer Text Dropdowns</h2>

      {layerData.map((layer, layerIndex) => (
        <div key={layerIndex} style={{ marginBottom: '20px' }}>
          <h3>
            <button
              onClick={() => toggleLayer(layerIndex)}
              style={{ textDecoration: 'underline', cursor: 'pointer', outline: 'none', border: 'none', background: 'none' }}
            >
              Layer {layerIndex} {expandedLayers[layerIndex] ? '▼' : '▶'}
            </button>
          </h3>
          {expandedLayers[layerIndex] && (
            <div>
              {layer.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <button onClick={() => handleItemClick(layerIndex, itemIndex)}>
                    {item.text}
                  </button>

                  {
                    <div style={{ marginLeft: '60px', marginRight:"60px" }}>
                      {item.children.map((child, childIndex) => (
                        <div style={{ marginTop: '60px'}}>
                          {/* <button onClick={() => handleItemClick(layerIndex, childIndex)}> */}
                            {getChildText(child)}
                          {/* </button> */}
                        </div>
                      ))}
                    </div>
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

    </div>
  );
}

export default App;
