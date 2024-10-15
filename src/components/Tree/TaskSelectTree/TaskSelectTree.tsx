"use client";

import { buildSelectTreeItems, SelectTreeNode } from "~/components/Tree/TaskSelectTree/TaskSelectTreeNode";
import { Tree } from "~/components/Tree/Tree";
import { ROOT_TASK_ID } from "~/constants/constants";
import { RelationEdge } from "~/types/RelationEdge";
import { Task } from "~/types/Task";
import { genOutgoingAdjacencyMap } from "~/utils/graph/genAdjacencyMap";

export const TaskSelectTree = ({
  sourceId,
  tasks,
  dependencyEdges,
  containmentEdges
}: {
  sourceId: string;
  tasks: Task[];
  dependencyEdges: RelationEdge[];
  containmentEdges: RelationEdge[];
}) => {
  const selectTreeItems = buildSelectTreeItems(sourceId, tasks, dependencyEdges);
  const adjacencyMap = genOutgoingAdjacencyMap(containmentEdges);

  return <Tree rootId={ROOT_TASK_ID} items={selectTreeItems} adjacencyMap={adjacencyMap} renderItem={SelectTreeNode} />;
};
