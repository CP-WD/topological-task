"use client";

import { TaskTreeNode } from "~/components/Tree/TaskTree/TaskTreeNode";
import { Tree } from "~/components/Tree/Tree";
import { Task } from "~/types/Task";

export const TaskTree = ({
  rootId,
  tasks,
  adjacencyMap
}: {
  rootId: string;
  tasks: Task[];
  adjacencyMap: Map<string, string[]>;
}) => {
  return <Tree rootId={rootId} items={tasks} adjacencyMap={adjacencyMap} renderItem={TaskTreeNode} />;
};
