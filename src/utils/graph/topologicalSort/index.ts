import { RelationEdge } from "~/types/RelationEdge";
import { Task } from "~/types/Task";
import { genAdjacencyMap } from "~/utils/graph/genAdjacencyMap";
import { extractConnectedAdjacencyMap, isDAG } from "~/utils/graph/topologicalSort/prepare";
import { sortTaskIdsTopologically } from "~/utils/graph/topologicalSort/sort";

export const validateAndTopologicalSort = (
  tasks: Task[],
  revAdjacencyMap: Map<string, string[]>,
  rootId: string
): {
  sorted: boolean;
  sortedTasks?: Task[];
} => {
  const connectedAdjacencyMap = extractConnectedAdjacencyMap(revAdjacencyMap, rootId);
  const sortable = isDAG(connectedAdjacencyMap);

  if (!sortable) {
    return { sorted: false };
  }

  const sortedTaskIds = sortTaskIdsTopologically(connectedAdjacencyMap, rootId);
  const sortedTaskIdsSet = new Set(sortedTaskIds);
  const sortedTasks = tasks.filter((task) => sortedTaskIdsSet.has(task.id));

  return { sorted: true, sortedTasks };
};

export const canTopologicallySort = (relationEdges: RelationEdge[], rootId: string): boolean => {
  const adjacencyMap = genAdjacencyMap(relationEdges);
  const connectedAdjacencyMap = extractConnectedAdjacencyMap(adjacencyMap, rootId);
  return isDAG(connectedAdjacencyMap);
};
