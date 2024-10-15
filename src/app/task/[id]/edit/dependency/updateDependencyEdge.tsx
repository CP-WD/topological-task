"use server";

import { randomUUID } from "crypto";
import { RelationEdge } from "~/types/RelationEdge";
import { Task } from "~/types/Task";
import { deleteRelationEdge, insertRelationEdge } from "~/utils/db/server/relationEdge";
import { getUserId } from "~/utils/db/supabase/auth/getUserId";

const extractDependencyIds = (formData: FormData, taskIds: string[]) => {
  return taskIds.filter((id) => formData.get(id) === "on");
};

const updateDB = async (
  sourceId: string,
  newDependencyIds: string[],
  dependencyEdges: RelationEdge[],
  userId: string
) => {
  const outgoingDependencyEdgeMap = new Map<string, string>();
  dependencyEdges.forEach((edge) => {
    if (edge.sourceId === sourceId) {
      outgoingDependencyEdgeMap.set(edge.targetId, edge.id);
    }
  });

  // 新しい依存関係を追加
  newDependencyIds.forEach((id) => {
    const edgeId = outgoingDependencyEdgeMap.get(id);
    if (!edgeId) {
      const newEdge: RelationEdge = {
        id: randomUUID(),
        sourceId,
        targetId: id,
        owner: userId
      };
      insertRelationEdge(newEdge, "dependency");
    }
  });

  // 既存の依存関係を削除
  outgoingDependencyEdgeMap.forEach((edgeId, id) => {
    if (!newDependencyIds.includes(id)) {
      deleteRelationEdge(edgeId, "dependency");
    }
  });
};

export const updateDependency = async (
  formData: FormData,
  sourceId: string,
  tasks: Task[],
  dependencyEdges: RelationEdge[]
) => {
  const userId = await getUserId();
  const taskIds = tasks.map((task) => task.id);
  const newDependencyIds = extractDependencyIds(formData, taskIds);
  await updateDB(sourceId, newDependencyIds, dependencyEdges, userId);
};
