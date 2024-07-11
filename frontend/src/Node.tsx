// src/Node.js
import React, { useState } from 'react';

const Node = ({ node, layers, layerIdx }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleNodeClick = () => {
    console.log("clicked")
    setShowChildren(!showChildren);
  };

  const getNode = (layers, node, childIndex) => {
    console.log(layers)
    console.log(node.index)
    if(layerIdx - 1 < 0) return 
    return layers[`layer_${layerIdx - 1}`].find(n => n.index === childIndex)
  }

  return (
    <div style={{ marginLeft: 50, marginTop: 40, marginBottom: 40, }}>
      <div onClick={handleNodeClick} style={{ cursor: 'pointer'}}>
        {node.text}
      </div>
      {showChildren && node.children.length > 0 && (
        <div style={{ }}>
          {node.children.map(childIndex => (
            <Node node={getNode(layers, node, childIndex)} layers={layers} layerIdx={layerIdx - 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
