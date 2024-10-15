import { RelationEdge } from "~/types/RelationEdge";

export const genOutgoingNeighbors = (sourceId: string, relationEdges: RelationEdge[]): string[] => {
  return relationEdges.filter((edge) => edge.sourceId === sourceId).map((edge) => edge.targetId);
};

export const genIncomingNeighbors = (targetId: string, relationEdges: RelationEdge[]): string[] => {
  return relationEdges.filter((edge) => edge.targetId === targetId).map((edge) => edge.sourceId);
};
