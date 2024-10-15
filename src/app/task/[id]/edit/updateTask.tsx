"use server";

import { Task } from "~/types/Task";
import { updateTask } from "~/utils/db/server/task";
import { getUserId } from "~/utils/db/supabase/auth/getUserId";
import { parseTaskFormData } from "~/utils/form/parseTaskFromData";

export const handleUpdateTask = async (formData: FormData, taskId: string) => {
  const userId = await getUserId();
  const { name, description, completed } = parseTaskFormData(formData);

  const newTask: Task = {
    name: name,
    description: description,
    completed: completed,
    owner: userId,
    id: taskId
  };

  await updateTask(newTask);
};
