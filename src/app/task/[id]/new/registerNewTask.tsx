"use server";

import { randomUUID } from "crypto";
import { Task } from "~/types/Task";
import { insertRelationEdge } from "~/utils/db/server/relationEdge";
import { insertTask } from "~/utils/db/server/task";
import { getUserId } from "~/utils/db/supabase/auth/getUserId";
import { parseTaskFormData } from "~/utils/form/parseTaskFromData";

export const registerNewTask = async (formData: FormData, parentId: string) => {
  const userId = await getUserId();

  const { name, description, completed } = parseTaskFormData(formData);
  const newTaskId = randomUUID();

  const newTask: Task = {
    id: newTaskId,
    name,
    description,
    completed,
    owner: userId
  };
  const newContainmentEdge = {
    id: randomUUID(),
    sourceId: newTaskId,
    targetId: parentId,
    owner: userId
  };

  insertTask(newTask);
  insertRelationEdge(newContainmentEdge, "containment");
};
