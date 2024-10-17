import { ElementDefinition } from "cytoscape";
import { RelationEdge } from "~/types/RelationEdge";
import { Task } from "~/types/Task";
import {
  genForwardConnectedComponents,
  genReverseConnectedComponents
} from "~/utils/graph/cytoscape/genConnectedComponents";

export const genGraphDefinition = (rootId: string, tasks: Task[], relationEdges: RelationEdge[]) => {
  const connectedComponents = genForwardConnectedComponents(rootId, tasks, relationEdges);
  const revConnectedComponents = genReverseConnectedComponents(rootId, tasks, relationEdges);

  const connectedNodes = new Set([...connectedComponents.connectedNodes, ...revConnectedComponents.connectedNodes]);
  const connectedEdges = new Set([...connectedComponents.connectedEdges, ...revConnectedComponents.connectedEdges]);

  const nodes: ElementDefinition[] = Array.from(connectedNodes).map((node) => {
    return {
      data: {
        id: node.id,
        label: node.name,
        isRoot: node.id === rootId ? "true" : "false"
      }
    };
  });

  const edges: ElementDefinition[] = Array.from(connectedEdges).map((edge) => {
    return {
      data: {
        id: edge.id,
        source: edge.sourceId,
        target: edge.targetId
      }
    };
  });

  return [...nodes, ...edges];
};
