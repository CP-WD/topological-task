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

  const connectedNode = connectedComponents.connectedNodes.union(revConnectedComponents.connectedNodes);
  const connectedEdge = connectedComponents.connectedEdges.union(revConnectedComponents.connectedEdges);

  const nodes: ElementDefinition[] = Array.from(connectedNode).map((node) => {
    return {
      data: {
        id: node.id,
        label: node.name,
        isRoot: node.id === rootId ? "true" : "false"
      }
    };
  });

  const edges: ElementDefinition[] = Array.from(connectedEdge).map((edge) => {
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
