"use client";

import cytoscape, { ElementDefinition } from "cytoscape";
//@ts-expect-error colaはcytoscape.use()にのみ用いるため
import cola from "cytoscape-cola";
import CytoscapeComponent from "react-cytoscapejs";

export const Graph = ({ elements }: { elements: ElementDefinition[] }) => {
  cytoscape.use(cola);
  const stylesheet = [
    {
      selector: "node",
      style: {
        width: 20,
        height: 20,
        "background-color": "#ccc",
        label: "data(label)"
      }
    },
    {
      selector: "node[isRoot='true']",
      style: {
        "background-color": "#f00"
      }
    },
    {
      selector: "edge",
      style: {
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
    }
  ];
  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: "100%", height: "100%" }}
      stylesheet={stylesheet}
      layout={{ name: "cola" }}
    />
  );
};
