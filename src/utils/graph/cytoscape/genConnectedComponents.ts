import { ROOT_TASK_ID } from "~/constants/constants";
import { RelationEdge } from "~/types/RelationEdge";
import { Task } from "~/types/Task";

const mapTasksById = (tasks: Task[]) => {
  const taskById = new Map<string, Task>();
  tasks.forEach((task) => taskById.set(task.id, task));
  return taskById;
};

const mapEdgesById = (relationEdges: RelationEdge[], getSourceId: (edge: RelationEdge) => string) => {
  const edgesById = new Map<string, RelationEdge[]>();
  relationEdges.forEach((edge) => {
    const sourceId = getSourceId(edge);
    if (!edgesById.has(sourceId)) {
      edgesById.set(sourceId, []);
    }
    edgesById.get(sourceId)!.push(edge);
  });
  return edgesById;
};

const findConnectedComponents = (
  sourceId: string,
  edgeMap: Map<string, RelationEdge[]>,
  getTargetId: (edge: RelationEdge) => string
) => {
  const connectedNodeIds = new Set([sourceId]);
  const connectedEdges = new Set<RelationEdge>();
  const stack = [sourceId];

  while (stack.length !== 0) {
    const currentId = stack.pop()!;
    const edges = edgeMap.get(currentId);
    if (edges) {
      edges.forEach((edge) => {
        const targetId = getTargetId(edge);
        if (!connectedNodeIds.has(targetId)) {
          stack.push(targetId);
        }
        connectedNodeIds.add(targetId);
        connectedEdges.add(edge);
      });
    }
  }

  return { connectedNodeIds, connectedEdges };
};

const genConnectedComponents = (
  sourceId: string,
  tasks: Task[],
  relationEdges: RelationEdge[],
  reverse: boolean = false
) => {
  const taskMap = mapTasksById(tasks);

  const getSourceId = reverse ? (edge: RelationEdge) => edge.targetId : (edge: RelationEdge) => edge.sourceId;
  const edgeMap = mapEdgesById(relationEdges, getSourceId);

  const getTargetId = reverse ? (edge: RelationEdge) => edge.sourceId : (edge: RelationEdge) => edge.targetId;
  const { connectedNodeIds, connectedEdges } = findConnectedComponents(sourceId, edgeMap, getTargetId);

  return {
    connectedNodes: Array.from(connectedNodeIds)
      .filter((id) => id != ROOT_TASK_ID)
      .map((nodeId) => taskMap.get(nodeId)!),
    connectedEdges: Array.from(connectedEdges).filter(
      (edge) => edge.sourceId !== ROOT_TASK_ID && edge.targetId !== ROOT_TASK_ID
    )
  };
};

export const genForwardConnectedComponents = (sourceId: string, tasks: Task[], relationEdges: RelationEdge[]) => {
  return genConnectedComponents(sourceId, tasks, relationEdges, false);
};

export const genReverseConnectedComponents = (sourceId: string, tasks: Task[], relationEdges: RelationEdge[]) => {
  return genConnectedComponents(sourceId, tasks, relationEdges, true);
};
