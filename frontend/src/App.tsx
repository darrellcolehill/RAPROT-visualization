/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import Node from './Node';
import data from '../public/EXO_FULL.json';

const App = () => {

  type BackendNode = {
    children: number[]
    text: string
    index: number
  }


  function mapLayersToArray(): BackendNode[][] {

    const layers = Object.keys(data).length;

    const layerAcc: BackendNode[][] = [];

    for(let i = 0; i < layers; i++) {
      layerAcc[i] = data['layer_' + i];
    }

    return layerAcc;
  }


  function flatMapLayers(): BackendNode[] {
    let acc: BackendNode[] = [];
    const layers = Object.keys(data).length;

    for(let i = 0; i < layers; i++) {
      acc = [...acc, ...data['layer_' + i]]
    }
    return acc;
  }

  type UINode = {
    children?: UINode[]
    text: string
    index: string
  }


  const flatLayers = flatMapLayers()

  function getNode(id: number): BackendNode | undefined {
    return flatLayers.find((a) => a.index == id)
  }

  function mapData() {
    const arrData = mapLayersToArray()
    for(let i = 0; i < arrData.length; i++) {
      arrData[i].sort((a, b) => ((-1*a.index) - (-1*b.index)));
    }
    console.log(flatLayers)

    const res = []
    for(let i = 0; i < arrData[arrData.length - 1].length; i++) {
      res.push(_mapdata(arrData[arrData.length - 1], arrData[arrData.length - 1][i].index))
    }
    return res;
  }


  let totalNodesProcessed = 0;
  function _mapdata(arrData: BackendNode[], nodeIdx: number): UINode {
    const curNode = getNode(nodeIdx)!!
    if(curNode.children.length === 0 ) {
      const t: UINode = {
        text: curNode.text,
        index: `${curNode.index}`,
        children: []
      }
      totalNodesProcessed++;
      return t;
    }

    const children = []
    for(let i = 0; i < curNode.children.length; i++) {
      const child = _mapdata(arrData, curNode.children[i]);
      children.push(child)
    }

    const t = {
      text: curNode.text,
      index: `${curNode.index}`,
      children: children
    }
    totalNodesProcessed++;
    return t;
  }


  console.log(mapData())
  // TODO NOTE: for some reason, this is 521, and not 520
  console.log(totalNodesProcessed)



  return (
    <div className="App">
          {data["layer_" + (Object.keys(data).length - 1)].map(node => (
            <Node key={node.index} node={node} layers={data} layerIdx={3}/>
          ))}
    </div>
  );
};

export default App;

