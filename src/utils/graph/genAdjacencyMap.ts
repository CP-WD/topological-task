import { RelationEdge } from "~/types/RelationEdge";

export const genAdjacencyMap = (edges: RelationEdge[]) => {
  const map = new Map<string, string[]>();

  edges.forEach((edge) => {
    const source = edge.sourceId;
    const target = edge.targetId;
    if (map.has(source)) {
      map.get(source)?.push(target);
    } else {
      map.set(source, [target]);
    }
  });

  return map;
};

export const genOutgoingAdjacencyMap = (edges: RelationEdge[]) => {
  const map = new Map<string, string[]>();

  edges.forEach((edge) => {
    const source = edge.sourceId;
    const target = edge.targetId;
    if (map.has(target)) {
      map.get(target)?.push(source);
    } else {
      map.set(target, [source]);
    }
  });

  return map;
};
